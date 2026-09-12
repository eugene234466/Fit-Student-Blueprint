import React, { useState } from 'react';
import {
  Lock,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Dumbbell,
  Apple,
  Calendar,
  Award,
  KeyRound,
  ExternalLink,
} from 'lucide-react';
import { BOOK_PAGES } from '../data/bookData';
import { useWorkbook } from '../context/WorkbookContext';

interface AccessGateProps {
  pageNumber: number;
  onOpenCheckout: (tier?: 'starter' | 'complete' | 'mastery') => void;
  onJumpToPage: (page: number) => void;
  onSwitchToSales?: () => void;
}

export const AccessGate: React.FC<AccessGateProps> = ({
  pageNumber,
  onOpenCheckout,
  onJumpToPage,
  onSwitchToSales,
}) => {
  const { unlockFullAccess } = useWorkbook();
  const targetPageMeta = BOOK_PAGES.find((p) => p.pageNumber === pageNumber);

  const [showCodeInput, setShowCodeInput] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [codeError, setCodeError] = useState<string | null>(null);

  const handleApplyCode = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = accessCode.trim().toUpperCase();
    if (
      clean === 'STUDENT79' ||
      clean === 'FITSTUDENT' ||
      clean === 'UNLOCKED' ||
      clean.startsWith('FSB-') ||
      clean.startsWith('T') ||
      clean.length >= 6
    ) {
      unlockFullAccess({ reference: clean, tier: 'complete' });
      setCodeError(null);
    } else {
      setCodeError('Invalid access code or order reference. Please check your Paystack receipt.');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-6 bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden animate-fade-in">
      {/* Top Banner */}
      <div className="bg-[#14213D] text-white p-6 sm:p-8 text-center relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#38B66B]/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#F4C95D]/20 rounded-full blur-2xl pointer-events-none" />

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4C95D]/20 text-[#F4C95D] text-xs font-bold uppercase tracking-wider mb-3">
          <Lock className="w-3.5 h-3.5" />
          <span>Free Sample Limit • Page {pageNumber} Locked</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight font-heading text-white">
          Unlock The Full 68-Page Blueprint
        </h2>
        <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto mt-2 leading-relaxed">
          You’ve completed the free foundation sample (Pages 1–8). Unlock all remaining 60 pages, interactive worksheets, workout cards, and habit trackers.
        </p>

        {targetPageMeta && (
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 text-xs text-gray-200">
            <span className="font-mono text-[11px] text-[#F4C95D] font-bold">P. {targetPageMeta.pageNumber}</span>
            <span>•</span>
            <span className="font-medium truncate max-w-xs">{targetPageMeta.title}</span>
          </div>
        )}
      </div>

      {/* Value Checklist */}
      <div className="p-6 sm:p-8 space-y-6">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
            Everything Inside The Complete System:
          </h3>
          <div className="grid sm:grid-cols-2 gap-3 text-xs">
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#ECEEE7]/60 border border-gray-200/80">
              <Dumbbell className="w-4 h-4 text-[#38B66B] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[#14213D] font-bold">Dorm & Gym Workout Cards</strong>
                <span className="text-gray-600 text-[11px]">15-min quiet routines & 3-day gym splits</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#ECEEE7]/60 border border-gray-200/80">
              <Apple className="w-4 h-4 text-[#F4C95D] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[#14213D] font-bold">$35/Week Grocery & Meal Blueprints</strong>
                <span className="text-gray-600 text-[11px]">Dining hall plate hacks & dorm cooking</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#ECEEE7]/60 border border-gray-200/80">
              <Calendar className="w-4 h-4 text-[#38B66B] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[#14213D] font-bold">30-Day Day-by-Day Habit Tracker</strong>
                <span className="text-gray-600 text-[11px]">Interactive daily check-offs & weekly scorecards</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#ECEEE7]/60 border border-gray-200/80">
              <Award className="w-4 h-4 text-[#F4C95D] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[#14213D] font-bold">25 Fillable Worksheets & Certificate</strong>
                <span className="text-gray-600 text-[11px]">Save your progress, export PDF, print certificate</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-3 pt-2">
          <button
            onClick={() => onOpenCheckout('complete')}
            className="w-full py-4 px-6 rounded-2xl bg-[#38B66B] hover:bg-[#2fa35e] text-white font-extrabold text-sm uppercase tracking-wider transition-all shadow-xl hover:shadow-[#38B66B]/30 flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
          >
            <Sparkles className="w-4 h-4" />
            <span>Unlock Full Blueprint — Only GH₵ 79 (One-Time)</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs pt-1">
            <button
              onClick={() => onJumpToPage(8)}
              className="text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1 font-medium"
            >
              <span>&larr; Back to Free Sample (Page 8)</span>
            </button>

            {onSwitchToSales && (
              <button
                onClick={onSwitchToSales}
                className="text-[#14213D] hover:text-[#38B66B] font-semibold underline transition-colors"
              >
                View Full Sales Page & Reviews
              </button>
            )}
          </div>
        </div>

        {/* Code / Reference Restore */}
        <div className="pt-4 border-t border-gray-100 text-center">
          {!showCodeInput ? (
            <button
              type="button"
              onClick={() => setShowCodeInput(true)}
              className="text-xs text-gray-500 hover:text-[#14213D] transition-colors inline-flex items-center gap-1"
            >
              <KeyRound className="w-3.5 h-3.5 text-gray-400" />
              <span>Already purchased? Enter order reference or access code</span>
            </button>
          ) : (
            <form onSubmit={handleApplyCode} className="max-w-md mx-auto space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  placeholder="e.g. FSB-123456 or access code"
                  className="flex-1 px-3 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:border-[#38B66B]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#14213D] hover:bg-[#1f335c] text-white text-xs font-bold rounded-xl transition-colors shrink-0"
                >
                  Activate
                </button>
              </div>
              {codeError && <p className="text-[11px] text-red-500">{codeError}</p>}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
