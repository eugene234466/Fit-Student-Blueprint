import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface SectionDividerProps {
  pageNumber: number;
  partNumber: string;
  title: string;
  subtitle: string;
  quote: string;
  quoteAuthor?: string;
  objectives: string[];
  imageUrl: string;
  imageCaption: string;
  onNextPage: () => void;
}

export const SectionDividerPage: React.FC<SectionDividerProps> = ({
  pageNumber,
  partNumber,
  title,
  subtitle,
  quote,
  quoteAuthor = 'The Fit Student Blueprint',
  objectives,
  imageUrl,
  imageCaption,
  onNextPage,
}) => {
  return (
    <div
      id={`page-${pageNumber}`}
      className="workbook-page relative mx-auto w-full max-w-[850px] min-h-[1100px] shadow-xl overflow-hidden bg-[#14213D] text-[#F7F8F3] flex flex-col justify-between"
      style={{ aspectRatio: '1 / 1.414' }}
    >
      {/* Background radial glow */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#38B66B]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="pt-10 px-10 flex items-center justify-between border-b border-white/10 pb-4 z-10">
        <div className="flex items-center gap-3">
          <span className="text-xs font-extrabold uppercase tracking-[0.25em] text-[#38B66B] bg-[#38B66B]/20 px-3 py-1 rounded-md">
            {partNumber}
          </span>
          <span className="text-xs text-gray-400 font-medium tracking-wide">
            THE FIT STUDENT BLUEPRINT
          </span>
        </div>
        <span className="text-xs font-bold text-gray-400">Page {pageNumber}</span>
      </div>

      {/* Center Hero Block */}
      <div className="px-10 my-auto z-10 space-y-6">
        <div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight uppercase font-heading">
            {title}
          </h1>
          <p className="text-base sm:text-lg text-[#F4C95D] font-medium mt-1">
            {subtitle}
          </p>
        </div>

        {/* Section Image */}
        <div className="rounded-xl overflow-hidden border border-white/15 shadow-2xl relative group">
          <img
            src={imageUrl}
            alt={title}
            referrerPolicy="no-referrer"
            className="w-full h-56 object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14213D] via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-3 left-4 text-xs text-gray-300 font-medium">
            {imageCaption}
          </div>
        </div>

        {/* Section Pull Quote */}
        <div className="p-4 bg-white/5 border-l-4 border-[#38B66B] rounded-r-xl backdrop-blur">
          <p className="text-sm italic text-gray-200 leading-relaxed font-serif">
            "{quote}"
          </p>
          <p className="text-xs text-[#38B66B] font-semibold mt-1">— {quoteAuthor}</p>
        </div>

        {/* Objectives Box */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-300 mb-2.5">
            What You Will Build in This Section:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {objectives.map((obj, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-gray-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#38B66B] shrink-0 mt-0.5" />
                <span>{obj}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="pb-8 px-10 z-10 flex items-center justify-between border-t border-white/10 pt-4">
        <span className="text-xs tracking-wider text-[#38B66B] font-bold">
          MOVE • FUEL • RECOVER • REPEAT
        </span>
        <button
          onClick={onNextPage}
          className="no-print inline-flex items-center gap-2 bg-[#38B66B] hover:bg-[#2fa35e] text-white text-xs font-bold px-4 py-2 rounded-lg transition-all"
        >
          <span>Enter Section</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
