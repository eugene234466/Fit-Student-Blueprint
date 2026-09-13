import React, { useState } from 'react';
import { ShieldCheck, BookOpen, Compass, Flame, Apple, Moon, RotateCcw, ArrowRight, CheckSquare, Sparkles, HeartPulse, Scale, AlertTriangle, FileText, Lock } from 'lucide-react';
import { PageContainer } from '../PageContainer';
import { PART_INFO } from '../../data/bookData';
import { LegalModal, LegalTab } from '../legal/LegalModal';

interface FrontMatterProps {
  onJumpToPage: (pageNumber: number) => void;
}

export const CoverPage: React.FC<FrontMatterProps> = ({ onJumpToPage }) => {
  return (
    <div 
      id="page-1"
      className="workbook-page relative mx-auto w-full max-w-[850px] min-h-[1100px] shadow-2xl overflow-hidden bg-[#14213D] text-[#F7F8F3] flex flex-col justify-between"
      style={{ aspectRatio: '1 / 1.414' }}
    >
      {/* Background Graphic Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#38B66B]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#F4C95D]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Tag */}
      <div className="pt-12 px-12 z-10">
        <div className="inline-flex items-center gap-2 bg-[#38B66B]/20 border border-[#38B66B]/30 px-3.5 py-1.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-[#38B66B] animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-widest text-[#38B66B]">
            Official Student Wellness Workbook & System
          </span>
        </div>
      </div>

      {/* Main Cover Title Block */}
      <div className="px-12 z-10 my-auto">
        <div className="space-y-4 max-w-xl">
          <p className="text-sm uppercase tracking-[0.25em] font-semibold text-[#F4C95D]">
            The 30-Day Practical Transformation
          </p>
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-white uppercase leading-[1.08] font-heading">
            THE FIT<br />
            <span className="text-[#38B66B]">STUDENT</span><br />
            BLUEPRINT
          </h1>
          <p className="text-lg sm:text-xl text-[#ECEEE7] font-normal leading-relaxed pt-2">
            Your 30-Day Guide to Getting Fit, Building Healthy Habits & Feeling Better at University
          </p>
        </div>

        {/* Hero Authentic Campus Image Card */}
        <div className="mt-8 rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl relative group max-w-lg">
          <img
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1000&q=80"
            alt="University student walking on campus with backpack"
            referrerPolicy="no-referrer"
            className="w-full h-64 sm:h-72 object-cover object-center transform group-hover:scale-102 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14213D] via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/90">
            <span className="bg-[#14213D]/80 backdrop-blur px-2.5 py-1 rounded-md font-medium border border-white/10">
              Campus Life • Real Routines • Zero Gimmicks
            </span>
            <span className="text-[#F4C95D] font-semibold">30-Day Interactive System</span>
          </div>
        </div>

        {/* Core Message Pill */}
        <div className="mt-8 inline-flex items-center gap-4 bg-white/5 border border-white/15 px-5 py-3 rounded-xl backdrop-blur">
          <span className="text-xs font-bold tracking-[0.2em] text-[#38B66B]">
            MOVE
          </span>
          <span className="text-white/30">•</span>
          <span className="text-xs font-bold tracking-[0.2em] text-[#F4C95D]">
            FUEL
          </span>
          <span className="text-white/30">•</span>
          <span className="text-xs font-bold tracking-[0.2em] text-white">
            RECOVER
          </span>
          <span className="text-white/30">•</span>
          <span className="text-xs font-bold tracking-[0.2em] text-[#38B66B]">
            REPEAT
          </span>
        </div>
      </div>

      {/* Bottom Cover Footer */}
      <div className="pb-10 px-12 z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/10 pt-6">
        <div>
          <p className="text-xs text-gray-400">Interactive Digital Edition • Printable A4 Workbook</p>
          <p className="text-xs font-semibold text-gray-300">Modern Student Wellness Publishing</p>
        </div>
        <button
          onClick={() => onJumpToPage(3)}
          className="no-print inline-flex items-center gap-2 bg-[#38B66B] hover:bg-[#2fa35e] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-lg transition-all shadow-lg hover:shadow-[#38B66B]/30"
        >
          <span>Open Table of Contents</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export const CopyrightDisclaimerPage: React.FC = () => {
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<LegalTab>('health');

  const openLegal = (tab: LegalTab) => {
    setLegalTab(tab);
    setIsLegalModalOpen(true);
  };

  return (
    <PageContainer
      pageNumber={2}
      partTitle="Front Matter"
      category="Notice"
      title="Disclaimer & Publication Notice"
      subtitle="Important health, fitness, copyright, and legal information"
    >
      <div className="space-y-5 text-sm text-gray-700 leading-relaxed max-w-2xl mx-auto my-auto">
        {/* Core Medical Disclaimer Banner */}
        <div className="p-4 sm:p-5 bg-rose-50/70 border border-rose-200 rounded-xl flex items-start gap-3.5">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="font-bold text-rose-950 text-sm">
              Medical & Exercise Liability Disclaimer
            </h3>
            <p className="text-xs text-rose-900/85 leading-relaxed">
              <em>The Fit Student Blueprint</em> is published strictly for educational, informational, and general habit-building purposes. It does not provide medical advice, diagnosis, or clinical treatment. Always consult with a licensed physician or healthcare provider before starting any exercise program or modifying your diet. By using this workbook, you voluntarily assume all known and unknown risks of physical activity and agree to release the authors and publishers from any liability.
            </p>
          </div>
        </div>

        {/* License & Copyright Protection Banner */}
        <div className="p-4 sm:p-5 bg-[#F7F8F3] border border-[#E5E7EB] rounded-xl flex items-start gap-3.5">
          <Scale className="w-5 h-5 text-[#14213D] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="font-bold text-[#14213D] text-sm">
              Single-User Personal License & Anti-Piracy Notice
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Each purchase entitles you to one non-transferable personal license. You may print physical copies for personal student study. You are strictly forbidden from uploading this book to shared cloud drives, torrent networks, WhatsApp/Telegram groups, or Discord servers. Unauthorized distribution is a violation of copyright law and subject to statutory penalties.
            </p>
          </div>
        </div>

        {/* Legal Policies Modal Quick Launchers */}
        <div className="p-4 bg-white border border-gray-200 rounded-xl space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#14213D] uppercase tracking-wider">
              Official Legal & Compliance Documents
            </span>
            <span className="text-[10px] text-gray-400">Updated Sept 2026</span>
          </div>
          <p className="text-[11px] text-gray-500">
            Click any section below to review the full, binding legal policies in detail:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            <button
              type="button"
              onClick={() => openLegal('health')}
              className="px-2.5 py-2 rounded-lg bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-800 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <HeartPulse className="w-3.5 h-3.5 text-rose-600" />
              <span>Health Disclaimer</span>
            </button>
            <button
              type="button"
              onClick={() => openLegal('privacy')}
              className="px-2.5 py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Privacy Policy</span>
            </button>
            <button
              type="button"
              onClick={() => openLegal('terms')}
              className="px-2.5 py-2 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Scale className="w-3.5 h-3.5 text-amber-700" />
              <span>Terms of Sale</span>
            </button>
            <button
              type="button"
              onClick={() => openLegal('refund')}
              className="px-2.5 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-900 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-blue-600" />
              <span>Refund Policy</span>
            </button>
          </div>
        </div>

        {/* Publication Metadata & Support Contacts */}
        <div className="border-t border-[#ECEEE7] pt-3.5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-500">
          <div>
            <p className="font-semibold text-gray-700">Publisher:</p>
            <p>Modern Student Wellness Publishing</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Support & Privacy Desk:</p>
            <p className="text-[#38B66B] font-bold">support@thefitstudent.com</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Target Audience:</p>
            <p>University & College Students (Ages 18–25)</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Core Motto:</p>
            <p className="font-bold text-[#38B66B]">MOVE • FUEL • RECOVER • REPEAT</p>
          </div>
        </div>
      </div>

      {/* Embedded Legal Modal */}
      <LegalModal
        isOpen={isLegalModalOpen}
        onClose={() => setIsLegalModalOpen(false)}
        initialTab={legalTab}
      />
    </PageContainer>
  );
};

export const TableOfContentsPage: React.FC<FrontMatterProps> = ({ onJumpToPage }) => {
  return (
    <PageContainer
      pageNumber={3}
      partTitle="Front Matter"
      category="Roadmap"
      title="Table of Contents"
      subtitle="Your 68-page roadmap to university vitality"
      badge="Full Curriculum"
    >
      <div className="space-y-3 flex-1 flex flex-col justify-between py-1">
        {PART_INFO.filter(p => p.key !== 'frontmatter').map((part, idx) => (
          <div
            key={part.key}
            onClick={() => onJumpToPage(part.pageStart)}
            className="p-3.5 bg-[#F7F8F3] hover:bg-[#ECEEE7] border border-[#E5E7EB] rounded-xl transition-all cursor-pointer group flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <span className="w-8 h-8 rounded-lg bg-[#14213D] text-white flex items-center justify-center font-bold text-xs font-heading">
                0{idx + 1}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#38B66B] uppercase tracking-wider">
                    {part.number}
                  </span>
                  <span className="text-sm font-bold text-[#14213D] group-hover:text-[#38B66B] transition-colors">
                    {part.title}
                  </span>
                </div>
                <p className="text-xs text-gray-500 line-clamp-1">{part.desc}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-gray-400 group-hover:text-[#14213D]">
                Pages {part.pageStart}–{part.pageEnd}
              </span>
              <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#38B66B] group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>
        ))}

        <div className="mt-2 p-4 bg-white border border-[#38B66B]/30 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-[#38B66B]" />
            <div className="text-xs">
              <p className="font-bold text-[#14213D]">Looking for the 30-Day Calendar & Daily Trackers?</p>
              <p className="text-gray-500">Jump directly to Part Five to log today's movement, meals, and sleep.</p>
            </div>
          </div>
          <button
            onClick={() => onJumpToPage(53)}
            className="text-xs font-bold text-[#38B66B] hover:underline shrink-0"
          >
            Jump to Day Tracker →
          </button>
        </div>
      </div>
    </PageContainer>
  );
};

export const FourFoundationsPage: React.FC = () => {
  const foundations = [
    {
      title: 'MOVE',
      subtitle: 'Non-Negotiable Daily Momentum',
      color: '#38B66B',
      icon: Flame,
      summary: 'You do not need 2-hour gym marathons. High-frequency 15–25 minute bodyweight sessions and hitting 7,000–10,000 daily campus steps keep your metabolism fired and focus sharp.',
      pillar: 'Movement Hierarchy: Steps > Resistance > Conditioning'
    },
    {
      title: 'FUEL',
      subtitle: 'Nutrient Density on a Student Budget',
      color: '#F4C95D',
      icon: Apple,
      summary: 'Forget luxury superfoods. Master the simple student formula: Protein + Slow Carbs + Colorful Fiber + Good Fats on a $35–$45 weekly grocery budget or dining hall tray.',
      pillar: 'Fuel Formula: Real food before quick dopamine snacks'
    },
    {
      title: 'RECOVER',
      subtitle: 'Sleep, Stress & Biological Repair',
      color: '#14213D',
      icon: Moon,
      summary: 'Fitness adaptations and academic memory consolidation happen during deep sleep. A 30-minute evening digital wind-down transforms your next day’s energy.',
      pillar: 'Recovery Rule: 7–8 hours is your competitive academic edge'
    },
    {
      title: 'REPEAT',
      subtitle: 'The Power of Low-Friction Consistency',
      color: '#38B66B',
      icon: RotateCcw,
      summary: 'Perfection is the enemy of progress. When assignments pile up, execute your "Minimum Viable Commitment" rather than dropping to zero. Never miss twice.',
      pillar: 'Repeat Law: Repetition beats motivation every single time'
    },
  ];

  return (
    <PageContainer
      pageNumber={4}
      partTitle="Front Matter"
      category="Core Model"
      title="The Four Foundations Graphic"
      subtitle="The operating engine of the fit student blueprint"
      badge="Core Message"
    >
      <div className="flex-1 flex flex-col justify-between space-y-4">
        <div className="text-center max-w-lg mx-auto mb-2">
          <p className="text-xs uppercase font-bold tracking-widest text-[#38B66B]">
            System Architecture
          </p>
          <h2 className="text-xl sm:text-2xl font-bold text-[#14213D] font-heading">
            MOVE • FUEL • RECOVER • REPEAT
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Every workout, grocery choice, and evening habit in this workbook aligns with these 4 pillars.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {foundations.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="p-4 rounded-xl border border-[#E5E7EB] bg-[#F7F8F3] hover:border-[#38B66B]/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-base font-extrabold tracking-wider font-heading text-[#14213D]">
                      {item.title}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center text-[#38B66B]">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="text-xs font-semibold text-gray-600 mb-2">{item.subtitle}</p>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.summary}</p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-[#ECEEE7] text-[11px] font-bold text-[#14213D]">
                  {item.pillar}
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-3.5 bg-[#14213D] text-white rounded-xl flex items-center justify-between">
          <div className="text-xs">
            <span className="font-bold text-[#F4C95D] uppercase tracking-wider">The Golden Principle: </span>
            <span className="text-gray-200">Consistency at 70% intensity will always outwork intermittent bursts of 100% effort.</span>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export const HowToUsePage: React.FC<{ onJumpToPage: (p: number) => void }> = ({ onJumpToPage }) => {
  return (
    <PageContainer
      pageNumber={5}
      partTitle="Front Matter"
      category="User Guide"
      title="How to Use This Digital Workbook"
      subtitle="Maximizing your 30-day experience on screen or paper"
    >
      <div className="flex-1 flex flex-col justify-between space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 bg-[#F7F8F3] rounded-xl border border-[#E5E7EB]">
            <div className="w-7 h-7 rounded-lg bg-[#38B66B] text-white flex items-center justify-center font-bold text-xs mb-2">
              1
            </div>
            <h4 className="font-bold text-[#14213D] text-xs uppercase mb-1">Fill Digitally</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Every worksheet, checklist, and tracker automatically saves to your browser. Your answers remain secure and persist between sessions.
            </p>
          </div>

          <div className="p-4 bg-[#F7F8F3] rounded-xl border border-[#E5E7EB]">
            <div className="w-7 h-7 rounded-lg bg-[#14213D] text-white flex items-center justify-center font-bold text-xs mb-2">
              2
            </div>
            <h4 className="font-bold text-[#14213D] text-xs uppercase mb-1">Print to A4</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Prefer writing by hand? Click the Print / PDF button on any page or the entire book for cleanly styled, ink-friendly sheets.
            </p>
          </div>

          <div className="p-4 bg-[#F7F8F3] rounded-xl border border-[#E5E7EB]">
            <div className="w-7 h-7 rounded-lg bg-[#F4C95D] text-[#14213D] flex items-center justify-center font-bold text-xs mb-2">
              3
            </div>
            <h4 className="font-bold text-[#14213D] text-xs uppercase mb-1">Execute Daily</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Do not binge-read this like a novel. Complete Part One today, then run through the 30-Day Challenge one deliberate day at a time.
            </p>
          </div>
        </div>

        {/* Alternate Page Rhythm Guide */}
        <div className="p-4 bg-white border border-[#E5E7EB] rounded-xl">
          <h4 className="text-xs font-bold text-[#14213D] uppercase tracking-wider mb-2">
            The Interactive Workbook Rhythm
          </h4>
          <p className="text-xs text-gray-600 mb-3">
            To prevent cognitive fatigue and information overload, this blueprint deliberately alternates between 8 distinct formats:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
            <div className="p-2 rounded bg-[#F7F8F3] border border-[#ECEEE7] font-medium text-gray-700">1. Teaching Pages</div>
            <div className="p-2 rounded bg-[#F7F8F3] border border-[#ECEEE7] font-medium text-gray-700">2. Visual Concepts</div>
            <div className="p-2 rounded bg-[#F7F8F3] border border-[#ECEEE7] font-medium text-gray-700">3. Worksheets</div>
            <div className="p-2 rounded bg-[#F7F8F3] border border-[#ECEEE7] font-medium text-gray-700">4. Checklists</div>
            <div className="p-2 rounded bg-[#F7F8F3] border border-[#ECEEE7] font-medium text-gray-700">5. Trackers</div>
            <div className="p-2 rounded bg-[#F7F8F3] border border-[#ECEEE7] font-medium text-gray-700">6. Planning Pages</div>
            <div className="p-2 rounded bg-[#F7F8F3] border border-[#ECEEE7] font-medium text-gray-700">7. Challenge Days</div>
            <div className="p-2 rounded bg-[#F7F8F3] border border-[#ECEEE7] font-medium text-gray-700">8. Reflections</div>
          </div>
        </div>

        {/* Action Box */}
        <div className="p-4 bg-[#38B66B]/10 border border-[#38B66B]/30 rounded-xl flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold text-[#14213D] uppercase">Ready to Begin Part One?</h4>
            <p className="text-xs text-gray-600">Turn the page to start your baseline audit and Day 1 fitness assessment.</p>
          </div>
          <button
            onClick={() => onJumpToPage(6)}
            className="no-print bg-[#14213D] text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-[#252525] transition-colors flex items-center gap-1"
          >
            <span>Start Reset</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </PageContainer>
  );
};
