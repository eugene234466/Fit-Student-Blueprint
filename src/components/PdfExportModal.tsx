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
  RotateCcw,
  Briefcase,
  Building2,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';

interface PdfExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: number;
  onOpenCheckout?: (tier?: 'starter' | 'complete' | 'mastery') => void;
}

export type ExportScope = 'current' | 'section' | 'challenge' | 'partner_deck' | 'custom' | 'full';

export const PdfExportModal: React.FC<PdfExportModalProps> = ({
  isOpen,
  onClose,
  currentPage,
  onOpenCheckout,
}) => {
  const {
    isUnlocked,
    isPartnerReview,
    activatePartnerReviewPass,
    deactivatePartnerReviewPass,
    FREE_SAMPLE_MAX_PAGE,
    totalPages,
  } = useWorkbook();
  const [scope, setScope] = useState<ExportScope>('current');
  const [quality, setQuality] = useState<PdfQuality>('ultra');
  const [partnerFormat, setPartnerFormat] = useState<'clean' | 'review_copy'>('clean');
  const [customStart, setCustomStart] = useState<number>(1);
  const [customEnd, setCustomEnd] = useState<number>(Math.min(currentPage > 8 ? currentPage : 8, totalPages));
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 1, percent: 0, statusText: '' });
  const [exportComplete, setExportComplete] = useState(false);
  const [exportedFilename, setExportedFilename] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Hidden stage page number for offscreen multi-page rendering
  const [stagePageNumber, setStagePageNumber] = useState<number | null>(null);

  // Abort controller flag
  const isCancelledRef = useRef(false);

  const currentPageMeta = BOOK_PAGES.find((p) => p.pageNumber === currentPage);
  const currentPart = PART_INFO.find(
    (p) => currentPage >= p.pageStart && currentPage <= p.pageEnd
  );

  // Reset state when modal opens or closes
  useEffect(() => {
    if (!isOpen) {
      setIsExporting(false);
      setExportComplete(false);
      setErrorMessage(null);
      setStagePageNumber(null);
      isCancelledRef.current = false;
      return;
    }

    // Default custom range based on current page
    setCustomStart(Math.max(1, currentPage));
    setCustomEnd(Math.min(currentPage + 4, totalPages));

    // Handle Escape key to close
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isExporting) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, currentPage, totalPages, isExporting, onClose]);

  // Determine if current selection is locked by the free preview gate
  const isScopeLocked = (() => {
    if (isUnlocked || isPartnerReview) return false;
    if (scope === 'partner_deck') return false; // Executive pitch sample is always accessible
    if (scope === 'current') {
      return currentPage > FREE_SAMPLE_MAX_PAGE;
    }
    if (scope === 'section') {
      return currentPart ? currentPart.pageEnd > FREE_SAMPLE_MAX_PAGE : true;
    }
    if (scope === 'challenge') {
      return true; // Pages 51-62
    }
    if (scope === 'custom') {
      return customEnd > FREE_SAMPLE_MAX_PAGE;
    }
    if (scope === 'full') {
      return true;
    }
    return false;
  })();

  if (!isOpen) return null;

  // Helper to wait for DOM updates, fonts, and images to decode in stage
  const waitStageReady = async (containerEl: HTMLElement) => {
    if (document.fonts && document.fonts.ready) {
      try {
        await document.fonts.ready;
      } catch {
        // ignore font loading failure
      }
    }
    await new Promise((r) => requestAnimationFrame(() => setTimeout(r, 80)));
    const images = Array.from(containerEl.querySelectorAll('img'));
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
          setTimeout(resolve, 2000); // safety fallback timeout
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
      const stageEl = document.getElementById('pdf-export-hidden-stage');
      if (!stageEl) {
        throw new Error('Export staging container is initializing. Please try again.');
      }

      // 1. Single Page Export
      if (scope === 'current') {
        setProgress({
          current: 1,
          total: 1,
          percent: 30,
          statusText: `Capturing Page ${currentPage}: ${currentPageMeta?.title || ''}`,
        });

        // Check if active page in DOM is wide enough (desktop resolution >= 700px)
        const activePageEl =
          document.getElementById(`page-${currentPage}`) ||
          (document.querySelector('.workbook-page') as HTMLElement);

        let targetEl: HTMLElement;

        if (activePageEl && activePageEl.offsetWidth >= 700) {
          targetEl = activePageEl;
        } else {
          // On mobile or narrow viewports, render offscreen at exact 850px desktop A4 width
          setStagePageNumber(currentPage);
          let stagedEl: HTMLElement | null = null;
          for (let attempt = 0; attempt < 25; attempt++) {
            await new Promise((r) => setTimeout(r, 40));
            stagedEl =
              stageEl.querySelector<HTMLElement>(`#page-${currentPage}`) ||
              stageEl.querySelector<HTMLElement>('.workbook-page');
            if (stagedEl) break;
          }
          targetEl = stagedEl || activePageEl;
        }

        if (!targetEl) {
          throw new Error('Page element could not be found for export.');
        }

        const isDark =
          targetEl.classList.contains('bg-[#14213D]') ||
          [1, 6, 16, 28, 40, 51, 63].includes(currentPage);

        const safeTitle = (currentPageMeta?.title || 'Page')
          .replace(/[^a-zA-Z0-9]/g, '-')
          .toLowerCase();
        const filename = `Fit-Student-Blueprint-Page-${currentPage}-${safeTitle}.pdf`;

        setProgress({
          current: 1,
          total: 1,
          percent: 75,
          statusText: 'Rendering 300 DPI vector bitmap...',
        });

        await exportElementToPdf(targetEl, filename, {
          isDark,
          quality,
          usePng: quality === 'ultra',
        });

        setExportedFilename(filename);
        setProgress({ current: 1, total: 1, percent: 100, statusText: 'Export Complete!' });
        setExportComplete(true);
        setIsExporting(false);
        setStagePageNumber(null);
        return;
      }

      // 2. Multi-Page Export
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
      } else if (scope === 'partner_deck') {
        // 16 curated showcase pages representing the whole system from start to finish
        pagesToExport.push(1, 2, 3, 4, 6, 11, 16, 23, 28, 31, 40, 45, 51, 53, 63, 68);
        exportFilename = partnerFormat === 'review_copy'
          ? 'Fit-Student-Blueprint-Executive-Partner-Review-16-Pages.pdf'
          : 'Fit-Student-Blueprint-Executive-Pitch-Deck-16-Pages.pdf';
      } else if (scope === 'custom') {
        const start = Math.max(1, Math.min(customStart, customEnd));
        const end = Math.min(totalPages, Math.max(customStart, customEnd));
        for (let i = start; i <= end; i++) {
          pagesToExport.push(i);
        }
        exportFilename = `Fit-Student-Blueprint-Pages-${start}-to-${end}.pdf`;
      } else {
        // Full 68-page workbook
        for (let i = 1; i <= totalPages; i++) {
          pagesToExport.push(i);
        }
        exportFilename = partnerFormat === 'review_copy'
          ? 'The-Fit-Student-Blueprint-Complete-68-Pages-Partner-Review.pdf'
          : 'The-Fit-Student-Blueprint-Complete-68-Pages.pdf';
      }

      const total = pagesToExport.length;
      if (total === 0) {
        throw new Error('No pages selected for export.');
      }

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      for (let idx = 0; idx < pagesToExport.length; idx++) {
        if (isCancelledRef.current) {
          setIsExporting(false);
          setProgress({ current: 0, total, percent: 0, statusText: 'Export cancelled.' });
          setStagePageNumber(null);
          return;
        }

        const pageNum = pagesToExport[idx];
        const pageMeta = BOOK_PAGES.find((p) => p.pageNumber === pageNum);
        const percent = Math.round(((idx) / total) * 100);

        setProgress({
          current: idx + 1,
          total,
          percent,
          statusText: `Rendering page ${pageNum} (${idx + 1} of ${total}): ${pageMeta?.title || ''}`,
        });

        // Mount page in offscreen stage
        setStagePageNumber(pageNum);

        // Wait for React to mount the component into the stage
        let targetPageEl: HTMLElement | null = null;
        for (let attempt = 0; attempt < 30; attempt++) {
          await new Promise((r) => setTimeout(r, 35));
          targetPageEl =
            stageEl.querySelector<HTMLElement>(`#page-${pageNum}`) ||
            stageEl.querySelector<HTMLElement>('.workbook-page');
          if (targetPageEl) break;
        }

        if (!targetPageEl) {
          console.warn(`Could not find stage element for page ${pageNum}, skipping`);
          continue;
        }

        await waitStageReady(targetPageEl);

        const isDark =
          targetPageEl.classList.contains('bg-[#14213D]') ||
          [1, 6, 16, 28, 40, 51, 63].includes(pageNum);

        const canvas = await capturePageCanvas(targetPageEl, {
          isDark,
          quality,
        });

        // Calculate safe proportional dimensions for standard ISO A4 (210 x 297 mm)
        const cWidth = Number.isFinite(canvas.width) && canvas.width > 0 ? canvas.width : 850;
        const cHeight = Number.isFinite(canvas.height) && canvas.height > 0 ? canvas.height : 1202;
        const imgWidth = 210;
        const rawImgHeight = (cHeight * imgWidth) / cWidth;
        const imgHeight = Number.isFinite(rawImgHeight) && rawImgHeight > 0 ? rawImgHeight : 297;
        const fitHeight = Math.abs(imgHeight - 297) < 5 ? 297 : imgHeight;
        const rawOffset = (297 - fitHeight) / 2;
        const offsetY = fitHeight >= 297 || !Number.isFinite(rawOffset) ? 0 : Math.max(0, rawOffset);

        const safeX = 0;
        const safeY = Number.isFinite(offsetY) ? Number(offsetY.toFixed(2)) : 0;
        const safeW = Number.isFinite(imgWidth) && imgWidth > 0 ? Number(imgWidth.toFixed(2)) : 210;
        const safeH = Number.isFinite(fitHeight) && fitHeight > 0 ? Number(fitHeight.toFixed(2)) : 297;

        // Clean high-fidelity JPEG compression (0.97 for ultra, 0.93 for standard)
        const imgQuality = quality === 'ultra' ? 0.97 : 0.93;
        const imgData = canvas.toDataURL('image/jpeg', imgQuality);

        if (idx > 0) {
          pdf.addPage('a4', 'portrait');
        }

        pdf.addImage(imgData, 'JPEG', safeX, safeY, safeW, safeH, undefined, 'FAST');

        // Stamp discrete partner review watermark if requested
        if (partnerFormat === 'review_copy' && pageNum !== 1) {
          try {
            pdf.setFontSize(7);
            pdf.setTextColor(150, 150, 150);
            pdf.text('CONFIDENTIAL PARTNER REVIEW COPY • PREPARED FOR BUSINESS EVALUATION & PARTNERSHIP DISCUSSIONS', 105, 294, { align: 'center' });
          } catch {
            // ignore watermark failure
          }
        }

        // Clean up canvas GPU buffer to prevent browser tab memory exhaustion
        canvas.width = 0;
        canvas.height = 0;

        // Brief yield for UI responsiveness
        await new Promise((r) => setTimeout(r, 40));
      }

      if (isCancelledRef.current) return;

      setProgress({
        current: total,
        total,
        percent: 100,
        statusText: 'Packaging & downloading PDF file...',
      });

      savePdfDocument(pdf, exportFilename);
      setExportedFilename(exportFilename);
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
      {/* Modal Dialog Backdrop */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm transition-opacity no-print"
        onClick={(e) => {
          if (e.target === e.currentTarget && !isExporting) {
            onClose();
          }
        }}
      >
        <div
          className="relative w-full max-w-lg max-h-[92vh] sm:max-h-[88vh] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
          role="dialog"
          aria-modal="true"
        >
          {/* Header */}
          <div className="shrink-0 bg-[#14213D] text-white px-5 py-4 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#38B66B]/20 border border-[#38B66B]/40 flex items-center justify-center text-[#38B66B] shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white font-heading">
                  Download Workbook as PDF
                </h3>
                <p className="text-xs text-[#F4C95D]">
                  High-Definition Print Export (ISO A4 300 DPI)
                </p>
              </div>
            </div>

            {!isExporting && (
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Body with Independent Smooth Scrolling */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 text-[#252525]">
            {!isExporting && !exportComplete && (
              <>
                {/* Business Partner Review Pass Notice / Activation */}
                {isPartnerReview ? (
                  <div className="p-3 bg-blue-50/90 border border-blue-200 rounded-xl flex items-center justify-between gap-3 text-xs text-blue-950 animate-in fade-in duration-150">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-600/20 flex items-center justify-center text-blue-700 shrink-0">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold flex items-center gap-1.5">
                          <span>Business Partner Review Pass Active</span>
                          <span className="text-[10px] bg-blue-200 text-blue-800 px-1.5 py-0.5 rounded font-mono font-semibold">ALL ACCESS</span>
                        </div>
                        <span className="text-[11px] text-blue-700 block">
                          All 68 pages and export scopes are unlocked for presentation, investor, and sponsor review.
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={deactivatePartnerReviewPass}
                      className="text-[11px] font-semibold text-blue-700 hover:text-blue-900 bg-white border border-blue-200 px-2.5 py-1 rounded-lg transition-colors shrink-0 shadow-2xs"
                    >
                      Deactivate
                    </button>
                  </div>
                ) : !isUnlocked ? (
                  <div className="p-3.5 bg-gradient-to-br from-blue-50/90 via-indigo-50/60 to-slate-50 border border-blue-200 rounded-xl text-xs space-y-2.5">
                    <div className="flex items-start gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-600/20 flex items-center justify-center text-blue-700 shrink-0 mt-0.5">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#14213D] text-xs">Presenting to Potential Business Partners?</span>
                          <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                            Evaluation Pass
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-600 mt-1 leading-relaxed">
                          Convincing potential business partners, campus gym directors, or sponsors? Enable the <strong>Temporary Partner Pass</strong> to download complete sample PDFs or the full 68-page edition without entering payment credentials.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          activatePartnerReviewPass();
                          setScope('partner_deck');
                        }}
                        className="w-full py-2 px-3 bg-[#14213D] hover:bg-[#1f335e] text-white font-bold rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <Building2 className="w-3.5 h-3.5 text-[#F4C95D]" />
                        <span>Enable Temporary Partner Pass (Free Instant Download)</span>
                      </button>
                    </div>
                  </div>
                ) : null}

                <p className="text-xs text-gray-600 leading-relaxed">
                  Select your export scope and resolution. All your entered notes, checklists, and habit scores
                  are preserved. Navigation bars and screen controls are automatically omitted for clean, publisher-grade prints.
                </p>

                {/* Scope Options */}
                <div className="space-y-2">
                  {/* Option 1: Current Page */}
                  <label
                    className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
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
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm font-bold text-[#14213D] flex items-center gap-1.5">
                          {!isUnlocked && !isPartnerReview && currentPage > FREE_SAMPLE_MAX_PAGE && (
                            <Lock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          )}
                          <span>Current Page Only (Page {currentPage})</span>
                        </span>
                        <span className="text-[10px] font-bold bg-[#38B66B]/15 text-[#38B66B] px-2 py-0.5 rounded shrink-0">
                          Instant
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5 truncate">
                        {currentPageMeta?.title}
                      </p>
                    </div>
                  </label>

                  {/* Option 2: Current Section */}
                  {currentPart && (
                    <label
                      className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
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
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs sm:text-sm font-bold text-[#14213D] flex items-center gap-1.5">
                            {!isUnlocked && !isPartnerReview && currentPart.pageEnd > FREE_SAMPLE_MAX_PAGE && (
                              <Lock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                            )}
                            <span className="truncate">{currentPart.title}</span>
                          </span>
                          <span className="text-[10px] font-mono text-gray-500 shrink-0 ml-1">
                            {currentPart.pageEnd - currentPart.pageStart + 1} pages
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Pages {currentPart.pageStart}–{currentPart.pageEnd} of the current module
                        </p>
                      </div>
                    </label>
                  )}

                  {/* Option 3: 30-Day Challenge Pack */}
                  <label
                    className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
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
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm font-bold text-[#14213D] flex items-center gap-1.5">
                          {!isUnlocked && !isPartnerReview && <Lock className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
                          <span>The 30-Day Challenge Pack</span>
                        </span>
                        <span className="text-[10px] font-mono text-gray-500 shrink-0">
                          12 pages
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Pages 51–62: Calendar, weekly focus guides & scorecards
                      </p>
                    </div>
                  </label>

                  {/* Option 4: Executive Partner Pitch Deck (16 Curated Pages) */}
                  <label
                    className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                      scope === 'partner_deck'
                        ? 'border-blue-600 bg-blue-50/70 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="exportScope"
                      checked={scope === 'partner_deck'}
                      onChange={() => setScope('partner_deck')}
                      className="mt-1 accent-blue-600"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm font-bold text-[#14213D] flex items-center gap-1.5">
                          <Briefcase className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span>Executive Partner Pitch Deck (16 Curated Pages)</span>
                        </span>
                        <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded shrink-0">
                          Best for Partners
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Curated showcase for business partners, university unions & sponsors (Cover, Table of Contents, Fitness Assessment, Core Workouts, Budget Nutrition, Wall Calendar & Certificate)
                      </p>
                    </div>
                  </label>

                  {/* Option 5: Custom Range */}
                  <label
                    className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                      scope === 'custom'
                        ? 'border-[#38B66B] bg-[#38B66B]/5 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="exportScope"
                      checked={scope === 'custom'}
                      onChange={() => setScope('custom')}
                      className="mt-1 accent-[#38B66B]"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm font-bold text-[#14213D] flex items-center gap-1.5">
                          {!isUnlocked && !isPartnerReview && customEnd > FREE_SAMPLE_MAX_PAGE && (
                            <Lock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          )}
                          <span>Custom Page Range</span>
                        </span>
                        <span className="text-[10px] font-mono text-gray-500 shrink-0">
                          {Math.max(1, Math.abs(customEnd - customStart) + 1)} pages
                        </span>
                      </div>

                      {scope === 'custom' && (
                        <div className="mt-2.5 flex items-center gap-2 text-xs" onClick={(e) => e.stopPropagation()}>
                          <span className="text-gray-500">From Page:</span>
                          <input
                            type="number"
                            min={1}
                            max={totalPages}
                            value={customStart}
                            onChange={(e) => setCustomStart(Math.max(1, Math.min(totalPages, parseInt(e.target.value) || 1)))}
                            className="w-16 px-2 py-1 bg-white border border-gray-300 rounded-lg text-center font-bold text-[#14213D] focus:border-[#38B66B] focus:outline-none"
                          />
                          <span className="text-gray-500">to</span>
                          <input
                            type="number"
                            min={1}
                            max={totalPages}
                            value={customEnd}
                            onChange={(e) => setCustomEnd(Math.max(1, Math.min(totalPages, parseInt(e.target.value) || 1)))}
                            className="w-16 px-2 py-1 bg-white border border-gray-300 rounded-lg text-center font-bold text-[#14213D] focus:border-[#38B66B] focus:outline-none"
                          />
                        </div>
                      )}
                    </div>
                  </label>

                  {/* Option 6: Complete Master Edition */}
                  <label
                    className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
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
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm font-bold text-[#14213D] flex items-center gap-1.5">
                          {!isUnlocked && !isPartnerReview && <Lock className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
                          <span>Complete Edition (All 68 Pages)</span>
                        </span>
                        <span className="text-[10px] font-bold bg-[#F4C95D]/20 text-[#B88716] px-2 py-0.5 rounded shrink-0">
                          {isUnlocked || isPartnerReview ? 'Full Book' : 'GH₵ 79'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Complete stitched A4 PDF from cover to graduation certificate
                      </p>
                    </div>
                  </label>
                </div>

                {/* Presentation Format Option */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#14213D] flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-blue-600" />
                      <span>Document Presentation Format</span>
                    </span>
                    <span className="text-[10px] font-mono text-gray-500">
                      {partnerFormat === 'review_copy' ? 'Confidential Review Copy' : 'Clean Master Edition'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setPartnerFormat('clean')}
                      className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all ${
                        partnerFormat === 'clean'
                          ? 'border-[#38B66B] bg-[#38B66B]/10 ring-1 ring-[#38B66B]'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#14213D]">Clean Student Edition</span>
                        {partnerFormat === 'clean' && <CheckCircle2 className="w-3.5 h-3.5 text-[#38B66B]" />}
                      </div>
                      <p className="text-[10px] text-gray-500 mt-0.5 leading-snug">
                        Standard edition as delivered to paying students
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPartnerFormat('review_copy')}
                      className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all ${
                        partnerFormat === 'review_copy'
                          ? 'border-blue-600 bg-blue-50/80 ring-1 ring-blue-600'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-blue-950">Partner Review Copy</span>
                        {partnerFormat === 'review_copy' && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />}
                      </div>
                      <p className="text-[10px] text-gray-500 mt-0.5 leading-snug">
                        Adds discreet evaluation footnote for business pitch meetings
                      </p>
                    </button>
                  </div>
                </div>

                {/* Print Quality Selector */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#14213D] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#38B66B]" />
                      <span>Resolution & Print Density</span>
                    </span>
                    <span className="text-[10px] font-semibold text-[#38B66B] bg-[#38B66B]/10 px-2 py-0.5 rounded-full">
                      {quality === 'ultra' ? '300 DPI Ultra HD' : '200 DPI Standard'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setQuality('ultra')}
                      className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all ${
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
                      <p className="text-[10px] text-gray-500 mt-0.5 leading-snug">
                        Razor-sharp typography & clean vectors for printing
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setQuality('standard')}
                      className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all ${
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
                      <p className="text-[10px] text-gray-500 mt-0.5 leading-snug">
                        Smaller file size, faster compilation & easy sharing
                      </p>
                    </button>
                  </div>
                </div>

                {/* Free Sample Locked Notice */}
                {isScopeLocked && (
                  <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-2 animate-in fade-in duration-150">
                    <div className="flex items-start gap-2">
                      <Lock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <strong>Free Sample Preview:</strong> Free export is available for foundation pages 1–8. Exporting pages 9–68 requires the unlocked edition or an active Partner Review Pass.
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          activatePartnerReviewPass();
                        }}
                        className="py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <Briefcase className="w-3.5 h-3.5" />
                        <span>Enable Partner Pass (Free)</span>
                      </button>
                      {onOpenCheckout && (
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            onOpenCheckout('complete');
                          }}
                          className="py-2 px-3 bg-gradient-to-r from-amber-500 to-[#F4C95D] hover:brightness-105 text-[#14213D] font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-xs"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Unlock All 68 Pages — GH₵ 79</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Export Progress View */}
            {isExporting && (
              <div className="py-8 space-y-4 text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-[#38B66B]/10 flex items-center justify-center text-[#38B66B]">
                  <Loader2 className="w-6 h-6 animate-spin" />
                </div>

                <div>
                  <h4 className="text-sm font-bold text-[#14213D] font-heading">
                    Exporting PDF in {quality === 'ultra' ? '300 DPI Ultra HD' : '200 DPI Standard'}...
                  </h4>
                  <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto truncate">
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

                <div className="flex items-center justify-between text-[11px] text-gray-500 font-mono px-1">
                  <span>
                    Page {progress.current} of {progress.total}
                  </span>
                  <span>{progress.percent}%</span>
                </div>
              </div>
            )}

            {/* Export Complete View */}
            {exportComplete && (
              <div className="py-8 space-y-4 text-center animate-in fade-in zoom-in-95 duration-200">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center text-emerald-600 shadow-sm">
                  <CheckCircle className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#14213D] font-heading">
                    PDF Successfully Downloaded!
                  </h4>
                  <p className="text-xs text-gray-600 mt-1 max-w-sm mx-auto">
                    Your document has been compiled and saved to your device:
                  </p>
                  <p className="text-xs font-mono font-bold text-[#38B66B] mt-1 bg-[#38B66B]/10 px-3 py-1 rounded-lg inline-block break-all">
                    {exportedFilename}
                  </p>
                </div>

                {(isPartnerReview || scope === 'partner_deck') && (
                  <div className="max-w-md mx-auto p-3 rounded-xl bg-blue-50/80 border border-blue-200 text-left text-xs text-blue-950 space-y-1">
                    <div className="font-bold flex items-center gap-1.5 text-blue-900">
                      <Briefcase className="w-3.5 h-3.5 text-blue-700" />
                      <span>Ready for Business Partners & Sponsors</span>
                    </div>
                    <p className="text-[11px] text-blue-800 leading-relaxed">
                      You can attach this PDF directly to formal email proposals, include it in pitch folders, or print high-fidelity presentation copies on standard A4 paper.
                    </p>
                  </div>
                )}

                <div className="pt-2 flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setExportComplete(false);
                      setIsExporting(false);
                    }}
                    className="px-3 py-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Export Another Scope</span>
                  </button>
                </div>
              </div>
            )}

            {/* Error View */}
            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2 text-xs text-red-700 animate-in fade-in duration-150">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="font-bold block">Export encountered an issue:</span>
                  <span>{errorMessage}</span>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="shrink-0 bg-gray-50 px-5 sm:px-6 py-3.5 sm:py-4 border-t border-gray-100 flex items-center justify-between gap-2">
            {!isExporting && !exportComplete ? (
              <>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3.5 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 rounded-lg transition-colors"
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
                    className="hidden sm:flex px-3 py-2 text-xs font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-xl transition-colors items-center gap-1.5"
                    title="Open browser native print dialog for selectable vector PDF"
                  >
                    <Printer className="w-3.5 h-3.5 text-gray-500" />
                    <span>Print Dialog</span>
                  </button>

                  {isScopeLocked ? (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          activatePartnerReviewPass();
                          setTimeout(() => {
                            handleStartExport();
                          }, 50);
                        }}
                        className="px-3.5 sm:px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                        title="Activate partner pass and start download immediately"
                      >
                        <Briefcase className="w-3.5 h-3.5" />
                        <span>Download Partner Copy</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onOpenCheckout?.('complete');
                        }}
                        className="px-3.5 sm:px-4 py-2 text-xs font-bold text-[#14213D] bg-gradient-to-r from-amber-400 to-[#F4C95D] hover:brightness-105 rounded-xl shadow-xs transition-all flex items-center gap-1.5"
                      >
                        <Lock className="w-3.5 h-3.5" />
                        <span>Unlock via Paystack</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={handleStartExport}
                      className="px-4 sm:px-5 py-2 text-xs font-bold text-white bg-[#38B66B] hover:bg-[#2fa35e] rounded-xl shadow-md transition-colors flex items-center gap-1.5"
                    >
                      <Download className="w-4 h-4" />
                      <span>
                        Download PDF {scope === 'partner_deck' ? '(16 Pages)' : scope === 'full' ? '(68 Pages)' : ''}
                      </span>
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

      {/* Dedicated Offscreen Staging Container for High-DPI Multi-Page Rendering */}
      <div
        id="pdf-export-hidden-stage"
        data-pdf-stage="true"
        style={{
          position: 'fixed',
          left: '0px',
          top: '0px',
          width: '850px',
          minHeight: '1202px',
          boxSizing: 'border-box',
          zIndex: -99999,
          pointerEvents: 'none',
          visibility: 'visible',
          opacity: 1,
          background: '#ffffff',
          overflow: 'visible',
        }}
        aria-hidden="true"
      >
        {stagePageNumber !== null && <PageRenderer pageNumber={stagePageNumber} />}
      </div>
    </>
  );
};
