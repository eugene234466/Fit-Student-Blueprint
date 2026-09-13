import React, { useState, useEffect, useCallback } from 'react';
import { WorkbookProvider, useWorkbook } from './context/WorkbookContext';
import { BOOK_PAGES, PART_INFO } from './data/bookData';
import { PageRenderer } from './components/PageRenderer';
import { PdfExportModal } from './components/PdfExportModal';
import { SalesPage } from './components/sales/SalesPage';
import { CheckoutModal } from './components/sales/CheckoutModal';
import { LegalModal, LegalTab } from './components/legal/LegalModal';

import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Printer,
  Download,
  List,
  Calendar,
  Dumbbell,
  Apple,
  Award,
  CheckCircle2,
  Menu,
  X,
  Sparkles,
  FileText,
  ShoppingBag,
  Lock,
  ShieldCheck,
  Briefcase,
  Building2,
} from 'lucide-react';

function WorkbookApp() {
  const {
    state,
    currentPage,
    totalPages,
    setCurrentPage,
    nextPage,
    prevPage,
    isUnlocked,
    isPartnerReview,
    activatePartnerReviewPass,
    deactivatePartnerReviewPass,
  } = useWorkbook();
  const [isTocOpen, setIsTocOpen] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutTier, setCheckoutTier] = useState<'starter' | 'complete' | 'mastery'>('complete');
  const [pageInput, setPageInput] = useState<string>(String(currentPage));
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<LegalTab>('health');

  const openLegal = (tab: LegalTab) => {
    setLegalTab(tab);
    setIsLegalModalOpen(true);
  };

  // Mode: 'sales' | 'workbook'
  const [viewMode, setViewMode] = useState<'sales' | 'workbook'>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('sales')) {
        return 'sales';
      }
      if (hash.match(/#?(?:page-)?\d+/i)) {
        return 'workbook';
      }
    }
    return 'sales'; // Default to the modeled high-converting sales page
  });

  useEffect(() => {
    setPageInput(String(currentPage));
  }, [currentPage]);

  // Hash listener to switch view mode or page
  useEffect(() => {
    const handleHashChange = () => {
      if (typeof window !== 'undefined') {
        const hash = window.location.hash.toLowerCase();
        if (hash.includes('sales')) {
          setViewMode('sales');
        } else if (hash.match(/#?(?:page-)?\d+/i)) {
          setViewMode('workbook');
        }
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNext = useCallback(() => {
    nextPage();
  }, [nextPage]);

  const handlePrev = useCallback(() => {
    prevPage();
  }, [prevPage]);

  const handleJump = useCallback((page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setIsTocOpen(false);
      if (typeof window !== 'undefined' && window.history?.replaceState) {
        window.history.replaceState(null, '', `#page-${page}`);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [setCurrentPage, totalPages]);

  // Sync hash with current page when in workbook mode
  useEffect(() => {
    if (viewMode === 'workbook' && typeof window !== 'undefined' && window.history?.replaceState) {
      window.history.replaceState(null, '', `#page-${currentPage}`);
    }
  }, [currentPage, viewMode]);

  const handleOpenWorkbookFromSales = useCallback((targetPage = 1) => {
    setViewMode('workbook');
    if (typeof window !== 'undefined' && window.history?.replaceState) {
      window.history.replaceState(null, '', `#page-${targetPage}`);
    }
    handleJump(targetPage);
  }, [handleJump]);

  const handleSwitchToSales = useCallback(() => {
    setViewMode('sales');
    if (typeof window !== 'undefined' && window.history?.replaceState) {
      window.history.replaceState(null, '', '#sales');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Keyboard navigation (only in workbook mode)
  useEffect(() => {
    if (viewMode !== 'workbook') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't navigate if user is typing in an input or textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        handlePrev();
      } else if (e.key === 'Escape') {
        setIsTocOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, viewMode]);

  // Current page info
  const currentPageMeta = BOOK_PAGES.find((p) => p.pageNumber === currentPage);

  // Render current page content
  const renderCurrentPage = () => {
    return <PageRenderer pageNumber={currentPage} onJumpToPage={handleJump} />;
  };

  // If in Sales Page view mode, render SalesPage
  if (viewMode === 'sales') {
    return (
      <SalesPage
        onOpenWorkbook={(targetPage) => handleOpenWorkbookFromSales(targetPage)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#ECEEE7] text-[#252525] flex flex-col font-sans">
      {/* Top Application Header (hidden on print) */}
      <header className="no-print sticky top-0 z-40 bg-[#14213D] text-[#F7F8F3] border-b border-white/10 shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsTocOpen(!isTocOpen)}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-[#F4C95D] flex items-center gap-1.5 text-xs font-semibold"
              title="Toggle Table of Contents"
            >
              <Menu className="w-4 h-4" />
              <span className="hidden sm:inline">Table of Contents</span>
            </button>

            <div className="border-l border-white/15 pl-3">
              <h1 className="text-xs sm:text-sm font-extrabold tracking-tight text-white uppercase font-heading flex items-center gap-1.5">
                <span>The Fit Student Blueprint</span>
                <span className="hidden md:inline text-[10px] text-[#38B66B] bg-[#38B66B]/20 px-2 py-0.5 rounded font-mono">
                  30-Day Edition
                </span>
              </h1>
              <p className="text-[10px] text-gray-400 hidden sm:block">
                MOVE • FUEL • RECOVER • REPEAT
              </p>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="hidden lg:flex items-center gap-2 text-xs">
            <button
              onClick={() => handleJump(20)}
              className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/15 text-gray-200 transition-colors flex items-center gap-1 text-[11px]"
            >
              <Dumbbell className="w-3.5 h-3.5 text-[#38B66B]" />
              <span>Dorm Workout</span>
            </button>
            <button
              onClick={() => handleJump(31)}
              className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/15 text-gray-200 transition-colors flex items-center gap-1 text-[11px]"
            >
              <Apple className="w-3.5 h-3.5 text-[#F4C95D]" />
              <span>Grocery List</span>
            </button>
            <button
              onClick={() => handleJump(53)}
              className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/15 text-gray-200 transition-colors flex items-center gap-1 text-[11px]"
            >
              <Calendar className="w-3.5 h-3.5 text-[#38B66B]" />
              <span>30-Day Tracker</span>
            </button>
            <button
              onClick={() => handleJump(68)}
              className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/15 text-gray-200 transition-colors flex items-center gap-1 text-[11px]"
            >
              <Award className="w-3.5 h-3.5 text-[#F4C95D]" />
              <span>Certificate</span>
            </button>
          </div>

          {/* Page Navigator Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentPage <= 1}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-white"
              title="Previous Page (Left Arrow)"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Jump Input */}
            <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-lg text-xs font-mono">
              <span className="text-gray-400">P.</span>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                aria-label="Go to page number"
                value={pageInput}
                onChange={(e) => {
                  const val = e.target.value;
                  setPageInput(val);
                  const num = parseInt(val, 10);
                  if (!isNaN(num) && num >= 1 && num <= totalPages) {
                    setCurrentPage(num);
                  }
                }}
                onBlur={() => {
                  const num = parseInt(pageInput, 10);
                  if (!isNaN(num) && num >= 1 && num <= totalPages) {
                    handleJump(num);
                  } else {
                    setPageInput(String(currentPage));
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const num = parseInt(pageInput, 10);
                    if (!isNaN(num) && num >= 1 && num <= totalPages) {
                      handleJump(num);
                    } else {
                      setPageInput(String(currentPage));
                    }
                    (e.target as HTMLInputElement).blur();
                  }
                }}
                className="w-8 text-center font-bold text-white bg-transparent focus:outline-none focus:bg-white/10 rounded"
              />
              <span className="text-gray-400">/ {totalPages}</span>
            </div>

            <button
              onClick={handleNext}
              disabled={currentPage >= totalPages}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-white"
              title="Next Page (Right Arrow)"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Quick Unlock or Unlocked Status Badge */}
            {isPartnerReview ? (
              <button
                onClick={() => setIsPdfModalOpen(true)}
                className="flex items-center gap-1.5 bg-blue-600/90 hover:bg-blue-600 text-white text-xs font-bold px-2.5 sm:px-3 py-1.5 rounded-lg transition-all shadow-sm shrink-0 border border-blue-400/30"
                title="Business Partner Review Pass Active - Click to export pitch deck or complete workbook"
              >
                <Briefcase className="w-3.5 h-3.5 text-blue-200" />
                <span className="hidden sm:inline">Partner Review Pass</span>
                <span className="sm:hidden">Partner</span>
              </button>
            ) : !isUnlocked ? (
              <button
                onClick={() => {
                  setCheckoutTier('complete');
                  setIsCheckoutOpen(true);
                }}
                className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-[#F4C95D] hover:from-amber-600 hover:to-[#e5bc4f] text-[#14213D] text-xs font-bold px-2.5 sm:px-3 py-1.5 rounded-lg transition-all shadow-sm shrink-0"
                title="Unlock Full 68-Page Edition & Complete PDF"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Unlock Full Access</span>
                <span className="sm:hidden">Unlock</span>
              </button>
            ) : (
              <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded bg-[#38B66B]/20 border border-[#38B66B]/30 text-[#38B66B] text-[11px] font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Full Access</span>
              </div>
            )}

            <button
              onClick={() => setIsPdfModalOpen(true)}
              className="flex items-center gap-1.5 bg-[#38B66B] hover:bg-[#2fa35e] text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ml-1 shadow-sm"
              title="Download as PDF (Current Page or Complete Workbook)"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download PDF</span>
              <span className="sm:hidden">PDF</span>
            </button>

            <button
              onClick={handleSwitchToSales}
              className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ml-1 border border-white/15 shadow-sm"
              title="View Sales Page & Program Overview"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F4C95D]" />
              <span className="hidden sm:inline">Sales Page</span>
            </button>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="w-full bg-black/20 h-1">
          <div
            className="bg-[#38B66B] h-full transition-all duration-200 ease-out"
            style={{ width: `${(currentPage / totalPages) * 100}%` }}
          />
        </div>
      </header>

      {/* Slide-over Table of Contents Drawer */}
      {isTocOpen && (
        <div className="no-print fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsTocOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative w-full max-w-md bg-[#14213D] text-white flex flex-col z-50 shadow-2xl overflow-hidden h-full">
            {/* Drawer Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-white uppercase font-heading">
                  Workbook Navigation
                </h3>
                <p className="text-[11px] text-[#F4C95D]">
                  All 68 Pages & 25 Visual Worksheets
                </p>
              </div>
              <button
                onClick={() => setIsTocOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sales Page Quick Link & Unlock Status in Drawer */}
            {!isUnlocked ? (
              <div className="p-3 bg-gradient-to-r from-amber-500/25 via-[#F4C95D]/20 to-amber-500/25 border-b border-amber-500/30 flex items-center justify-between">
                <div className="text-xs">
                  <span className="font-bold text-amber-300 block">Previewing Free Sample (Pages 1–8)</span>
                  <span className="text-[10px] text-gray-300">Unlock all 68 pages, 25 worksheets & 300 DPI PDF</span>
                </div>
                <button
                  onClick={() => {
                    setIsTocOpen(false);
                    setCheckoutTier('complete');
                    setIsCheckoutOpen(true);
                  }}
                  className="px-2.5 py-1 rounded bg-gradient-to-r from-amber-400 to-[#F4C95D] hover:brightness-105 text-[#14213D] text-[11px] font-bold uppercase tracking-wider shrink-0 transition-all shadow"
                >
                  Unlock GH₵ 79
                </button>
              </div>
            ) : (
              <div className="p-3 bg-gradient-to-r from-[#38B66B]/20 to-[#F4C95D]/20 border-b border-white/10 flex items-center justify-between">
                <div className="text-xs">
                  <span className="font-bold text-white block">Program Overview & Pricing</span>
                  <span className="text-[10px] text-gray-300">Bonuses, reviews, and guarantee</span>
                </div>
                <button
                  onClick={() => {
                    setIsTocOpen(false);
                    handleSwitchToSales();
                  }}
                  className="px-2.5 py-1 rounded bg-[#38B66B] hover:bg-[#2fa35e] text-white text-[11px] font-bold uppercase tracking-wider shrink-0 transition-colors shadow"
                >
                  Sales Page &rarr;
                </button>
              </div>
            )}

            {/* Quick Part Tabs */}
            <div className="p-3 bg-black/20 border-b border-white/10 grid grid-cols-3 gap-1.5 text-center text-[10px] font-bold">
              {PART_INFO.map((p) => (
                <button
                  key={p.key}
                  onClick={() => handleJump(p.pageStart)}
                  className={`p-1.5 rounded transition-all truncate ${
                    currentPage >= p.pageStart && currentPage <= p.pageEnd
                      ? 'bg-[#38B66B] text-white'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  {p.title}
                </button>
              ))}
            </div>

            {/* Scrollable Page List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 text-xs">
              {BOOK_PAGES.map((page) => {
                const isCurrent = page.pageNumber === currentPage;
                const isCompleted = state.completedPages[page.pageNumber];

                return (
                  <button
                    key={page.pageNumber}
                    onClick={() => handleJump(page.pageNumber)}
                    className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                      isCurrent
                        ? 'bg-[#38B66B] border-[#38B66B] text-white font-bold shadow-md'
                        : isCompleted
                        ? 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                        : 'bg-transparent border-white/5 text-gray-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <span
                        className={`w-6 h-6 rounded-md flex items-center justify-center font-mono text-[10px] font-bold shrink-0 ${
                          isCurrent
                            ? 'bg-white text-[#14213D]'
                            : isCompleted
                            ? 'bg-[#38B66B]/30 text-[#38B66B]'
                            : 'bg-white/10 text-gray-400'
                        }`}
                      >
                        {page.pageNumber}
                      </span>
                      <div className="truncate">
                        <span className="text-[10px] uppercase tracking-wider block text-gray-400 leading-none mb-0.5">
                          {page.partTitle}
                        </span>
                        <span className="text-xs truncate block">{page.title}</span>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-1.5">
                      {isCompleted && (
                        <CheckCircle2 className="w-4 h-4 text-[#38B66B]" />
                      )}
                      <span className="text-[10px] font-mono opacity-60">
                        {page.type}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Business Partner Evaluation Pass */}
            <div className="p-3 bg-blue-950/70 border-t border-blue-400/20 text-xs text-blue-100">
              <div className="flex items-center justify-between">
                <span className="font-bold flex items-center gap-1.5 text-blue-200">
                  <Briefcase className="w-3.5 h-3.5 text-blue-400" />
                  <span>Partner & Sponsor Pitch</span>
                </span>
                {isPartnerReview ? (
                  <button
                    onClick={deactivatePartnerReviewPass}
                    className="text-[10px] text-blue-300 hover:text-white underline font-semibold"
                  >
                    Pass Active (Exit)
                  </button>
                ) : (
                  <button
                    onClick={activatePartnerReviewPass}
                    className="text-[10px] bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-400/30 px-2 py-0.5 rounded font-bold transition-colors"
                  >
                    Enable Pass
                  </button>
                )}
              </div>
              <p className="text-[11px] text-blue-200/70 mt-1 leading-relaxed">
                Presenting to campus gym directors, student unions, or brand sponsors?
              </p>
              <button
                onClick={() => {
                  setIsTocOpen(false);
                  setIsPdfModalOpen(true);
                }}
                className="mt-2 w-full py-1.5 px-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold text-[11px] transition-colors flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Pitch Deck / Complete PDF</span>
              </button>
            </div>

            {/* Drawer Footer */}
            <div className="p-3 bg-black/40 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-400">
              <div className="flex items-center gap-2 text-[10px]">
                <button
                  onClick={() => openLegal('health')}
                  className="hover:text-white transition-colors underline"
                >
                  Health Disclaimer
                </button>
                <span>•</span>
                <button
                  onClick={() => openLegal('privacy')}
                  className="hover:text-white transition-colors underline"
                >
                  Privacy
                </button>
                <span>•</span>
                <button
                  onClick={() => openLegal('terms')}
                  className="hover:text-white transition-colors underline"
                >
                  Terms
                </button>
              </div>
              <span className="text-[10px] text-gray-500">Left & Right keys flip</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Page Stage */}
      <main className="flex-1 py-4 sm:py-8 px-2 sm:px-4 flex flex-col items-center justify-start overflow-x-hidden">
        <div className="w-full max-w-[850px] transition-opacity duration-200">
          {renderCurrentPage()}
        </div>
      </main>

      {/* Bottom Floating Bar on Mobile / Desktop */}
      <footer className="no-print sticky bottom-0 z-30 bg-[#14213D]/95 backdrop-blur-md text-white border-t border-white/10 py-2.5 px-4 shadow-lg">
        <div className="max-w-3xl mx-auto flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsTocOpen(true)}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-gray-200 transition-colors"
            >
              <List className="w-3.5 h-3.5 text-[#F4C95D]" />
              <span className="hidden sm:inline">Contents</span>
            </button>

            <button
              onClick={() => setIsPdfModalOpen(true)}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#38B66B]/20 hover:bg-[#38B66B]/30 text-[#38B66B] font-bold transition-colors"
              title="Download as PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export PDF</span>
            </button>

            <button
              onClick={() => openLegal('health')}
              className="hidden sm:flex items-center gap-1 px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
              title="Health Disclaimer & Legal Policies"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#38B66B]" />
              <span className="text-[11px]">Legal</span>
            </button>

            <span className="text-gray-400 hidden sm:inline">•</span>
            <span className="text-gray-300 font-medium truncate max-w-[150px] sm:max-w-xs">
              {currentPageMeta?.title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentPage <= 1}
              className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed font-medium transition-colors"
            >
              Back
            </button>
            <span className="font-mono text-[11px] text-[#F4C95D] font-bold">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage >= totalPages}
              className="px-3 py-1 rounded bg-[#38B66B] hover:bg-[#2fa35e] disabled:opacity-30 disabled:cursor-not-allowed font-bold text-white transition-colors flex items-center gap-1"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </footer>

      {/* PDF Export Modal */}
      <PdfExportModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        currentPage={currentPage}
        onOpenCheckout={(tier) => {
          setIsPdfModalOpen(false);
          setCheckoutTier(tier || 'complete');
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout & Instant Access Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        selectedTier={checkoutTier}
        onAccessWorkbook={(targetPage = 1) => {
          setIsCheckoutOpen(false);
          handleJump(targetPage);
        }}
      />

      {/* Legal & Compliance Policies Modal */}
      <LegalModal
        isOpen={isLegalModalOpen}
        onClose={() => setIsLegalModalOpen(false)}
        initialTab={legalTab}
      />
    </div>
  );
}

export default function App() {
  return (
    <WorkbookProvider>
      <WorkbookApp />
    </WorkbookProvider>
  );
}
