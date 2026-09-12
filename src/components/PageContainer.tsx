import React from 'react';
import { Bookmark, CheckCircle2, FileEdit } from 'lucide-react';
import { useWorkbook } from '../context/WorkbookContext';

interface PageContainerProps {
  pageNumber: number;
  partTitle?: string;
  category?: string;
  title: string;
  subtitle?: string;
  badge?: string;
  children: React.ReactNode;
  hideHeaderFooter?: boolean;
  isDark?: boolean;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  pageNumber,
  partTitle,
  category,
  title,
  subtitle,
  badge,
  children,
  hideHeaderFooter = false,
  isDark = false,
}) => {
  const { state, toggleBookmark, togglePageCompleted } = useWorkbook();
  const isBookmarked = state.bookmarkedPages.includes(pageNumber);
  const isCompleted = !!state.completedPages[pageNumber];

  if (hideHeaderFooter) {
    return (
      <div 
        id={`page-${pageNumber}`}
        className={`workbook-page relative mx-auto w-full max-w-[850px] min-h-[1100px] shadow-xl transition-all duration-200 overflow-hidden ${
          isDark ? 'bg-[#14213D] text-[#F7F8F3]' : 'bg-white text-[#252525]'
        }`}
        style={{ aspectRatio: '1 / 1.414' }}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      id={`page-${pageNumber}`}
      className={`workbook-page relative mx-auto w-full max-w-[850px] min-h-[1100px] shadow-lg border border-[#E5E7EB] print:border-none flex flex-col justify-between transition-all duration-200 overflow-hidden ${
        isDark ? 'bg-[#14213D] text-[#F7F8F3]' : 'bg-white text-[#252525]'
      }`}
      style={{ aspectRatio: '1 / 1.414' }}
    >
      {/* Top Header Bar */}
      <header className="px-8 pt-7 pb-4 border-b border-[#ECEEE7] flex items-center justify-between no-print:select-none">
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-semibold tracking-wider uppercase text-[#38B66B] bg-[#38B66B]/10 px-2.5 py-1 rounded-full">
            {partTitle || 'The Fit Student Blueprint'}
          </span>
          {category && (
            <span className="text-[11px] text-gray-400 font-medium hidden sm:inline-block">
              / {category}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 no-print">
          {badge && (
            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#F4C95D]/20 text-[#B88716] px-2 py-0.5 rounded">
              {badge}
            </span>
          )}
          <button
            onClick={() => toggleBookmark(pageNumber)}
            title={isBookmarked ? 'Remove bookmark' : 'Bookmark this page'}
            className={`p-1.5 rounded-lg transition-colors ${
              isBookmarked ? 'text-[#F4C95D] bg-[#F4C95D]/10' : 'text-gray-300 hover:text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={() => togglePageCompleted(pageNumber)}
            title={isCompleted ? 'Mark as incomplete' : 'Mark page as reviewed/done'}
            className={`flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-lg transition-colors ${
              isCompleted ? 'bg-[#38B66B]/15 text-[#38B66B]' : 'text-gray-400 hover:bg-gray-100 hover:text-gray-700'
            }`}
          >
            <CheckCircle2 className={`w-3.5 h-3.5 ${isCompleted ? 'fill-current' : ''}`} />
            <span className="hidden sm:inline">{isCompleted ? 'Done' : 'Mark done'}</span>
          </button>
        </div>
      </header>

      {/* Main Page Content Body */}
      <main className="flex-1 px-8 py-6 flex flex-col">
        {/* Page Title & Subtitle */}
        {(title || subtitle) && (
          <div className="mb-6">
            {title && (
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#14213D] mb-1 font-heading">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-sm font-medium text-gray-500">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className="flex-1 flex flex-col">
          {children}
        </div>
      </main>

      {/* Footer Bar */}
      <footer className="px-8 py-4 border-t border-[#ECEEE7] bg-[#F7F8F3]/50 flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[#14213D]">THE FIT STUDENT BLUEPRINT</span>
          <span className="hidden md:inline text-gray-300">•</span>
          <span className="hidden md:inline tracking-wider font-medium text-[11px] text-[#38B66B]">
            MOVE • FUEL • RECOVER • REPEAT
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-semibold text-[#14213D]">Page {pageNumber}</span>
        </div>
      </footer>
    </div>
  );
};
