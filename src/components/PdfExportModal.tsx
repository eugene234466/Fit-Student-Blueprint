import React, { useState, useRef, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import { PageRenderer } from './PageRenderer';
import { BOOK_PAGES, PART_INFO } from '../data/bookData';
import { capturePageCanvas, exportElementToPdf, savePdfDocument, PdfQuality } from '../utils/pdfExport';
import { useWorkbook } from '../context/WorkbookContext';
import {
  Download,
  FileText,
  X,
  CheckCircle,
  Loader2,
  AlertCircle,
  Printer,
  Sparkles,
  Lock,
} from 'lucide-react';

interface PdfExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: number;
  onOpenCheckout?: (tier?: 'starter' | 'complete' | 'mastery') => void;
}

export type ExportScope = 'current' | 'section' | 'full' | 'challenge';

export const PdfExportModal: React.FC<PdfExportModalProps> = ({
  isOpen,
  onClose,
  currentPage,
  onOpenCheckout,
}) => {
  const { isUnlocked, FREE_SAMPLE_MAX_PAGE } = useWorkbook();
  const [scope, setScope] = useState<ExportScope>('current');
  const [quality, setQuality] = useState<PdfQuality>('ultra');
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 1, percent: 0, statusText: '' });
  const [exportComplete, setExportComplete] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Hidden stage page number for offscreen multi-page rendering
  const [stagePageNumber, setStagePageNumber] = useState<number | null>(null);

  // Abort controller flag
  const isCancelledRef = useRef(false);

  const currentPageMeta = BOOK_PAGES.find((p) => p.pageNumber === currentPage);
  const currentPart = PART_INFO.find(
    (p) => currentPage >= p.pageStart && currentPage <= p.pageEnd
  );

  useEffect(() => {
    if (!isOpen) {
      setIsExporting(false);
      setExportComplete(false);
      setErrorMessage(null);
      setStagePageNumber(null);
      isCancelledRef.current = false;
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Helper to wait for DOM updates, fonts, and images to decode
  const waitStageReady = async (stageEl: HTMLElement) => {
    if (document.fonts && document.fonts.ready) {
      try {
        await document.fonts.ready;
      } catch {
        // ignore
      }
    }
    await new Promise((r) => requestAnimationFrame(() => setTimeout(r, 100)));
    const images = Array.from(stageEl.querySelectorAll('img'));
    await Promise.all(
      images.map((img) => {
        if (img.complete && img.naturalHeight !== 0) {
          if ('decode' in img && typeof img.decode === 'function') {
            return img.decode().catch(() => {});
          }
          return Promise.resolve();
        }
        return new Promise((resolve) => {
          img.onload = () => {
            if ('decode' in img && typeof img.decode === 'function') {
              img.decode().catch(() => {}).then(resolve);
            } else {
              resolve(null);
            }
          };
          img.onerror = resolve;
          setTimeout(resolve, 2500); // safety fallback timeout
        });
      })
    );
  };

  const handleStartExport = async () => {
    setIsExporting(true);
    setExportComplete(false);
    setErrorMessage(null);
    isCancelledRef.current = false;

    try {
      if (scope === 'current') {
        // Fast export directly from active DOM page with ultra sharpness
        setProgress({
          current: 1,
          total: 1,
          percent: 50,
          statusText: `Capturing Page ${currentPage}: ${currentPageMeta?.title || ''}`,
        });

        const activePageEl =
          document.getElementById(`page-${currentPage}`) ||
          (document.querySelector('.workbook-page') as HTMLElement);

        if (!activePageEl) {
          throw new Error('Current page element could not be found.');
        }

        const isDark =
          activePageEl.classList.contains('bg-[#14213D]') ||
          [1, 6, 16, 28, 40, 51, 63].includes(currentPage);

        const safeTitle = (currentPageMeta?.title || 'Page')
          .replace(/[^a-zA-Z0-9]/g, '-')
          .toLowerCase();
        const filename = `Fit-Student-Blueprint-Page-${currentPage}-${safeTitle}.pdf`;

        await exportElementToPdf(activePageEl, filename, {
          isDark,
          quality,
          usePng: quality === 'ultra',
        });

        setProgress({ current: 1, total: 1, percent: 100, statusText: 'Export Complete!' });
        setExportComplete(true);
        setIsExporting(false);
        return;
      }

      // Multi-page export: Determine page numbers to export
      const pagesToExport: number[] = [];
      let exportFilename = 'The-Fit-Student-Blueprint.pdf';

      if (scope === 'section' && currentPart) {
        for (let i = currentPart.pageStart; i <= currentPart.pageEnd; i++) {
          pagesToExport.push(i);
        }
        exportFilename = `Fit-Student-Blueprint-${currentPart.title.replace(/\s+/g, '-')}.pdf`;
      } else if (scope === 'challenge') {
        for (let i = 51; i <= 62; i++) {
          pagesToExport.push(i);
        }
        exportFilename = 'Fit-Student-Blueprint-30-Day-Challenge.pdf';
      } else {
        // Full 68-page workbook
        for (let i = 1; i <= 68; i++) {
          pagesToExport.push(i);
        }
        exportFilename = 'The-Fit-Student-Blueprint-Complete-Workbook.pdf';
      }

      const total = pagesToExport.length;
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      const stageEl = document.getElementById('pdf-export-hidden-stage');
      if (!stageEl) {
        throw new Error('Offscreen export stage container not found.');
      }

      for (let idx = 0; idx < pagesToExport.length; idx++) {
        if (isCancelledRef.current) {
          setIsExporting(false);
          setProgress({ current: 0, total, percent: 0, statusText: 'Export cancelled.' });
          setStagePageNumber(null);
          return;
        }

        const pageNum = pagesToExport[idx];
        const pageMeta = BOOK_PAGES.find((p) => p.pageNumber === pageNum);
        const percent = Math.round(((idx + 1) / total) * 100);

        setProgress({
          current: idx + 1,
          total,
          percent,
          statusText: `Rendering page ${pageNum} of ${total}: ${pageMeta?.title || ''}`,
        });

        // Update offscreen stage page
        setStagePageNumber(pageNum);
        await waitStageReady(stageEl);

        const targetPageEl =
          stageEl.querySelector(`#page-${pageNum}`) ||
          (stageEl.querySelector('.workbook-page') as HTMLElement);

        if (!targetPageEl) {
          continue;
        }

        const isDark =
          targetPageEl.classList.contains('bg-[#14213D]') ||
          [1, 6, 16, 28, 40, 51, 63].includes(pageNum);

        const canvas = await capturePageCanvas(targetPageEl as HTMLElement, {
          isDark,
          quality,
        });

        // Calculate exact proportional dimensions for A4 (210 x 297 mm)
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const fitHeight = Math.abs(imgHeight - 297) < 5 ? 297 : imgHeight;
        const offsetY = fitHeight === 297 ? 0 : Math.max(0, (297 - fitHeight) / 2);

        // Quality 0.98 JPEG gives clean edges and sharp typography without compression blur
        const imgData = canvas.toDataURL('image/jpeg', quality === 'ultra' ? 0.98 : 0.94);

        if (idx > 0) {
          pdf.addPage('a4', 'portrait');
        }

        pdf.addImage(imgData, 'JPEG', 0, offsetY, imgWidth, fitHeight, undefined, 'FAST');
      }

      if (isCancelledRef.current) return;

      setProgress({
        current: total,
        total,
        percent: 100,
        statusText: 'Saving PDF file...',
      });

      savePdfDocument(pdf, exportFilename);
      setExportComplete(true);
      setIsExporting(false);
      setStagePageNumber(null);
    } catch (err: unknown) {
      console.error('PDF export error:', err);
      setErrorMessage(err instanceof Error ? err.message : 'An error occurred during PDF export.');
      setIsExporting(false);
      setStagePageNumber(null);
    }
  };

  const handleCancel = () => {
    isCancelledRef.current = true;
    setIsExporting(false);
    setStagePageNumber(null);
  };

  return (
    <>
      {/* Modal Dialog */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity no-print">
        <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="bg-[#14213D] text-white p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#38B66B]/20 border border-[#38B66B]/40 flex items-center justify-center text-[#38B66B]">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white font-heading">
                  Download Workbook as PDF
                </h3>
                <p className="text-xs text-[#F4C95D]">
                  High-Definition Print Export (A4 300 DPI)
                </p>
              </div>
            </div>

            {!isExporting && (
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Body */}
          <div className="p-6 space-y-5 text-[#252525]">
            {!isExporting && !exportComplete && (
              <>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Choose your desired PDF export scope and print quality. Your filled notes, checklists, and habit logs
                  will be included, while interactive navigation controls are automatically omitted to
                  match clean print standards.
                </p>

                {/* Scope Options */}
                <div className="space-y-2.5">
                  <label
                    className={`flex items-start gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                      scope === 'current'
                        ? 'border-[#38B66B] bg-[#38B66B]/5 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="exportScope"
                      checked={scope === 'current'}
                      onChange={() => setScope('current')}
                      className="mt-1 accent-[#38B66B]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-[#14213D]">
                          Current Page Only (Page {currentPage})
                        </span>
                        <span className="text-[10px] font-bold bg-[#38B66B]/15 text-[#38B66B] px-2 py-0.5 rounded">
                          Instant
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5 truncate">
                        {currentPageMeta?.title}
                      </p>
                    </div>
                  </label>

                  {currentPart && (
                    <label
                      className={`flex items-start gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                        scope === 'section'
                          ? 'border-[#38B66B] bg-[#38B66B]/5 shadow-sm'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="exportScope"
                        checked={scope === 'section'}
                        onChange={() => setScope('section')}
                        className="mt-1 accent-[#38B66B]"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-[#14213D] flex items-center gap-1.5">
                            {!isUnlocked && currentPart.pageEnd > FREE_SAMPLE_MAX_PAGE && (
                              <Lock className="w-3.5 h-3.5 text-amber-500" />
                            )}
                            <span>Current Section ({currentPart.title})</span>
                          </span>
                          <span className="text-[10px] font-mono text-gray-500">
                            Pages {currentPart.pageStart}–{currentPart.pageEnd} (
                            {currentPart.pageEnd - currentPart.pageStart + 1} pages)
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Exports all worksheets in this specific part
                        </p>
                      </div>
                    </label>
                  )}

                  <label
                    className={`flex items-start gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                      scope === 'challenge'
                        ? 'border-[#38B66B] bg-[#38B66B]/5 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="exportScope"
                      checked={scope === 'challenge'}
                      onChange={() => setScope('challenge')}
                      className="mt-1 accent-[#38B66B]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-[#14213D] flex items-center gap-1.5">
                          {!isUnlocked && <Lock className="w-3.5 h-3.5 text-amber-500" />}
                          <span>The 30-Day Challenge Pack</span>
                        </span>
                        <span className="text-[10px] font-mono text-gray-500">
                          Pages 51–62 (12 pages)
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Rules, calendar, weekly focus guides & scorecards
                      </p>
                    </div>
                  </label>

                  <label
                    className={`flex items-start gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                      scope === 'full'
                        ? 'border-[#38B66B] bg-[#38B66B]/5 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="exportScope"
                      checked={scope === 'full'}
                      onChange={() => setScope('full')}
                      className="mt-1 accent-[#38B66B]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-[#14213D] flex items-center gap-1.5">
                          {!isUnlocked && <Lock className="w-3.5 h-3.5 text-amber-500" />}
                          <span>Complete Workbook (All 68 Pages)</span>
                        </span>
                        <span className="text-[10px] font-bold bg-[#F4C95D]/20 text-[#B88716] px-2 py-0.5 rounded">
                          {!isUnlocked ? 'GH₵ 79 To Unlock' : 'Full Edition'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Cover to certificate stitched into a single comprehensive PDF document
                      </p>
                    </div>
                  </label>
                </div>

                {/* Print Quality Selector */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#14213D] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#38B66B]" />
                      <span>Print Quality & Resolution</span>
                    </span>
                    <span className="text-[10px] font-semibold text-[#38B66B] bg-[#38B66B]/10 px-2 py-0.5 rounded-full">
                      {quality === 'ultra' ? '300 DPI Ultra Sharp' : '200 DPI Standard'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setQuality('ultra')}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        quality === 'ultra'
                          ? 'border-[#38B66B] bg-[#38B66B]/10 ring-1 ring-[#38B66B]'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#14213D]">Ultra HD</span>
                        <span className="text-[9px] font-bold bg-[#38B66B] text-white px-1.5 py-0.5 rounded">
                          300 DPI
                        </span>
                      </div>
                      <p className="text-[10px] text-gray-500 mt-1 leading-snug">
                        Razor-sharp typography, antialiased vectors, zero blur
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setQuality('standard')}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        quality === 'standard'
                          ? 'border-[#38B66B] bg-[#38B66B]/10 ring-1 ring-[#38B66B]'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#14213D]">Standard</span>
                        <span className="text-[9px] font-bold bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded">
                          200 DPI
                        </span>
                      </div>
                      <p className="text-[10px] text-gray-500 mt-1 leading-snug">
                        Smaller file size and faster processing for quick sharing
                      </p>
                    </button>
                  </div>
                </div>

                {!isUnlocked && (scope !== 'current' || currentPage > FREE_SAMPLE_MAX_PAGE) && (
                  <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-2">
                    <div className="flex items-start gap-2">
                      <Lock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <strong>Free Sample Notice:</strong> The free preview allows single-page export for foundation pages 1–8. Multi-page & complete 68-page PDF downloads require the unlocked edition.
                      </div>
                    </div>
                    {onOpenCheckout && (
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onOpenCheckout('complete');
                        }}
                        className="w-full py-2 px-3 bg-[#38B66B] hover:bg-[#2fa35e] text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#F4C95D]" />
                        <span>Unlock Complete 68-Page PDF — Only GH₵ 79</span>
                      </button>
                    )}
                  </div>
                )}

                {/* Print Spec Details */}
                <div className="p-3 bg-[#F7F8F3] border border-[#ECEEE7] rounded-xl flex items-center gap-2.5 text-xs text-gray-600">
                  <Sparkles className="w-4 h-4 text-[#38B66B] shrink-0" />
                  <span>
                    Format: <strong>Standard ISO A4 (210×297mm)</strong> with subpixel text antialiasing, 
                    geometric precision, and clean print margins.
                  </span>
                </div>
              </>
            )}

            {/* Export Progress View */}
            {isExporting && (
              <div className="py-6 space-y-4 text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-[#38B66B]/10 flex items-center justify-center text-[#38B66B]">
                  <Loader2 className="w-6 h-6 animate-spin" />
                </div>

                <div>
                  <h4 className="text-sm font-bold text-[#14213D] font-heading">
                    Exporting PDF in {quality === 'ultra' ? '300 DPI Ultra HD' : '200 DPI Standard'}...
                  </h4>
                  <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto truncate">
                    {progress.statusText}
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden border border-gray-200">
                  <div
                    className="bg-[#38B66B] h-full transition-all duration-300 rounded-full"
                    style={{ width: `${progress.percent}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-gray-500 font-mono">
                  <span>
                    Page {progress.current} / {progress.total}
                  </span>
                  <span>{progress.percent}%</span>
                </div>
              </div>
            )}

            {/* Export Complete View */}
            {exportComplete && (
              <div className="py-6 space-y-3 text-center animate-in fade-in zoom-in-95 duration-200">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center text-emerald-600 shadow-sm">
                  <CheckCircle className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#14213D] font-heading">
                    PDF Successfully Generated!
                  </h4>
                  <p className="text-xs text-gray-600 mt-1">
                    Your high-definition PDF file has been compiled and downloaded directly to your device.
                  </p>
                </div>
              </div>
            )}

            {/* Error View */}
            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2 text-xs text-red-700">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div className="flex-1">{errorMessage}</div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex items-center justify-between">
            {!isExporting && !exportComplete ? (
              <>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 rounded-lg transition-colors"
                >
                  Cancel
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      window.print();
                    }}
                    className="px-3.5 py-2 text-xs font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-xl transition-colors flex items-center gap-1.5"
                    title="Open browser native print dialog for selectable vector PDF"
                  >
                    <Printer className="w-3.5 h-3.5 text-gray-500" />
                    <span>Print Dialog</span>
                  </button>

                  {(!isUnlocked && (scope !== 'current' || currentPage > FREE_SAMPLE_MAX_PAGE)) ? (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenCheckout?.('complete');
                      }}
                      className="px-5 py-2 text-xs font-bold text-white bg-[#38B66B] hover:bg-[#2fa35e] rounded-xl shadow-md transition-colors flex items-center gap-1.5"
                    >
                      <Lock className="w-4 h-4 text-[#F4C95D]" />
                      <span>Unlock to Download</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleStartExport}
                      className="px-5 py-2 text-xs font-bold text-white bg-[#38B66B] hover:bg-[#2fa35e] rounded-xl shadow-md transition-colors flex items-center gap-1.5"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download PDF ({quality === 'ultra' ? '300 DPI' : '200 DPI'})</span>
                    </button>
                  )}
                </div>
              </>
            ) : isExporting ? (
              <button
                type="button"
                onClick={handleCancel}
                className="w-full py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors"
              >
                Cancel Export
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 text-xs font-bold text-white bg-[#14213D] hover:bg-[#1a2d54] rounded-xl transition-colors"
              >
                Done
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Offscreen Staging Container for Multi-Page PDF Generation with Exact A4 Proportions */}
      {stagePageNumber !== null && (
        <div
          id="pdf-export-hidden-stage"
          style={{
            position: 'fixed',
            left: '-99999px',
            top: '0',
            width: '850px',
            minHeight: '1202px',
            boxSizing: 'border-box',
            zIndex: -9999,
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        >
          <PageRenderer pageNumber={stagePageNumber} />
        </div>
      )}
    </>
  );
};
