import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  Star,
  ShieldCheck,
  Zap,
  Dumbbell,
  Apple,
  Moon,
  RotateCcw,
  Clock,
  DollarSign,
  ChevronDown,
  Award,
  Download,
  Users,
  Check,
  X,
  Play,
  Flame,
  FileText,
  Calendar,
  Layers,
  ShoppingBag,
} from 'lucide-react';
import { CheckoutModal } from './CheckoutModal';

interface SalesPageProps {
  onOpenWorkbook: (targetPage?: number) => void;
}

export const SalesPage: React.FC<SalesPageProps> = ({ onOpenWorkbook }) => {
  const [selectedTier, setSelectedTier] = useState<'starter' | 'complete' | 'mastery'>('complete');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      const search = window.location.search;
      return (
        hash.includes('payment-success=true') ||
        search.includes('trxref=') ||
        search.includes('reference=')
      );
    }
    return false;
  });

  useEffect(() => {
    const handleCheckReturn = () => {
      if (typeof window !== 'undefined') {
        const hash = window.location.hash;
        const search = window.location.search;
        if (
          hash.includes('payment-success=true') ||
          search.includes('trxref=') ||
          search.includes('reference=')
        ) {
          setIsCheckoutOpen(true);
        }
      }
    };
    handleCheckReturn();
    window.addEventListener('hashchange', handleCheckReturn);
    return () => window.removeEventListener('hashchange', handleCheckReturn);
  }, []);

  const [activePreviewTab, setActivePreviewTab] = useState<number>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleBuyNow = (tier: 'starter' | 'complete' | 'mastery' = 'complete') => {
    setSelectedTier(tier);
    setIsCheckoutOpen(true);
  };

  // Preview spread items
  const previewSpreads = [
    {
      page: 9,
      title: 'Day 1 Student Fitness Assessment',
      category: 'PART 1 • RESET',
      description: 'An honest, judgment-free audit of your physical baseline, energy levels, and schedule before starting.',
      badge: 'Visual Element #3',
      img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1000&q=80',
      highlights: ['Upper/Lower/Core baseline test', 'Energy leak audit', 'No gym equipment required'],
    },
    {
      page: 20,
      title: '15-Minute Dorm Room Strength Card',
      category: 'PART 2 • MOVE',
      description: 'Zero noise, zero jumping, no equipment. Engineered for tiny dorm rooms with thin walls and roommates.',
      badge: 'Visual Element #6',
      img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80',
      highlights: ['Desk pushups & wall sits', 'Dorm towel rows', 'Zero floor vibration for neighbors'],
    },
    {
      page: 31,
      title: '$35 High-Protein Student Grocery Checklist',
      category: 'PART 3 • FUEL',
      description: 'The exact budget-friendly matrix for student living. High protein, minimal prep, zero food waste.',
      badge: 'Visual Element #11',
      img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80',
      highlights: ['$35–$45 total weekly spend', '30g protein meal formulas', 'Shelf-stable dorm pantry staples'],
    },
    {
      page: 53,
      title: 'The 30-Day Execution Calendar',
      category: 'PART 5 • CHALLENGE',
      description: 'The master interactive tracking grid keeping you consistent through lectures, midterms, and weekends.',
      badge: 'Visual Element #18',
      img: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1000&q=80',
      highlights: ['Move / Fuel / Recover daily tracking', 'Weekly momentum checkpoints', '60-second daily check-in'],
    },
    {
      page: 68,
      title: 'Official Verified Certificate of Completion',
      category: 'PART 6 • KEEP GOING',
      description: 'Earn your official, shareable credential upon completing the 30-day challenge.',
      badge: 'Visual Element #25',
      img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80',
      highlights: ['Personalized student certificate', 'Verified seal & completion date', 'One-click high-res PDF download'],
    },
  ];

  // FAQ Items
  const faqList = [
    {
      q: 'Do I need an expensive campus gym membership or equipment?',
      a: 'Not at all. The entire 30-Day Challenge is designed around the Student Movement Hierarchy. Part Two includes complete 15-minute dorm room bodyweight workouts that require zero equipment, zero weights, and zero jumping (so you won’t disturb roommates or downstairs neighbors). If you do want to use your campus recreation gym, we also provide a beginner-friendly 3-day split framework.',
    },
    {
      q: 'I have a chaotic lecture schedule and exams. How much time does this take each day?',
      a: 'The daily commitment is intentionally kept between 15 to 25 minutes. We teach you how to bank 8,000+ steps effortlessly between lecture halls and library trips, prep 15-minute single-pan dorm meals, and use our 60-second daily check-in. On crazy exam days, you deploy the "Bad-Day Minimum Viable Fallback"—so you never fall off track.',
    },
    {
      q: 'Can I really afford the groceries on a tight student budget?',
      a: 'Yes! Page 31 gives you our field-tested $35–$45 weekly master student grocery checklist. We focus on cost-effective, high-protein staples (eggs, Greek yogurt, canned tuna, peanut butter, lentils, oats, and frozen veggies) that fit into mini-fridges and dorm rooms without requiring food scales or organic supermarket prices.',
    },
    {
      q: 'What formats do I receive with my order?',
      a: 'You get both: (1) Instant access to the Complete 68-Page Interactive Web Application with live checkboxes, form saving, notes, and progress analytics, and (2) High-resolution fillable and printable A4 PDF editions that you can download, print, or use on your iPad, GoodNotes, Notability, or Kindle.',
    },
    {
      q: 'What if I fall off track or miss a couple of days?',
      a: 'We anticipated this! University life happens. That’s why Part Four contains our compassionate "Never Miss Twice" protocol and 5-Minute Reset system. Missing one day is normal life; the system is designed to gently bounce you back without guilt or starting from zero.',
    },
    {
      q: 'What is your 30-Day Semester Guarantee?',
      a: 'Try the entire program for 30 full days. If you don’t feel noticeably fitter, more energized in your morning lectures, and genuinely happier with your daily habits, just email us and we’ll refund 100% of your money. No complicated forms or awkward questions.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#ECEEE7] text-[#252525] font-sans antialiased selection:bg-[#38B66B]/20 selection:text-[#14213D]">
      {/* Top Announcement Urgency Bar */}
      <aside aria-label="Special Offer" className="bg-[#14213D] text-[#F7F8F3] py-2 px-4 text-center text-xs font-medium border-b border-white/10 flex items-center justify-center gap-2">
        <span className="bg-[#38B66B] text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded tracking-wider">
          Semester Special
        </span>
        <span>
          Save 68% Today on the Complete 30-Day Student Blueprint + 3 Free Bonus Guides
        </span>
        <button
          onClick={() => handleBuyNow('complete')}
          className="underline font-bold text-[#F4C95D] hover:text-white transition-colors ml-1 hidden sm:inline"
        >
          Claim Offer &rarr;
        </button>
      </aside>

      {/* Sticky Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#14213D]/95 backdrop-blur-md text-white border-b border-white/10 shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#38B66B] flex items-center justify-center text-white font-black text-sm shadow">
              FS
            </div>
            <div>
              <span className="font-extrabold text-sm sm:text-base tracking-tight uppercase font-heading text-white block leading-none">
                The Fit Student Blueprint
              </span>
              <span className="text-[10px] text-[#F4C95D] font-mono">
                MOVE • FUEL • RECOVER • REPEAT
              </span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs text-gray-300 font-medium">
            <a href="#the-problem" className="hover:text-white transition-colors">
              The Reality
            </a>
            <a href="#the-system" className="hover:text-white transition-colors">
              The 4 Pillars
            </a>
            <a href="#look-inside" className="hover:text-white transition-colors">
              Look Inside
            </a>
            <a href="#whats-included" className="hover:text-white transition-colors">
              What's Included
            </a>
            <a href="#testimonials" className="hover:text-white transition-colors">
              Student Reviews
            </a>
            <a href="#pricing" className="hover:text-white transition-colors">
              Pricing
            </a>
            <a href="#faq" className="hover:text-white transition-colors">
              FAQ
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => onOpenWorkbook(1)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
              title="Preview the 68-page workbook live"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#F4C95D]" />
              <span>Live Workbook Demo</span>
            </button>

            <button
              onClick={() => handleBuyNow('complete')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#38B66B] hover:bg-[#2fa35e] text-xs font-bold text-white transition-all shadow-md hover:shadow-[#38B66B]/30 tracking-wider uppercase"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Get Access GH₵ 79</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section (Modeled after Natacha Océane & Jeff Nippard) */}
      <section className="relative bg-[#14213D] text-white pt-12 pb-20 px-4 overflow-hidden border-b border-white/10">
        {/* Subtle decorative background glows */}
        <div className="absolute top-0 right-10 w-96 h-96 bg-[#38B66B]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#F4C95D]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Headline & Value Hook */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#38B66B]/20 border border-[#38B66B]/30 text-[#38B66B] text-xs font-bold tracking-wide">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38B66B] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#38B66B]" />
                </span>
                <span>NEW SEMESTER EDITION • OVER 1,420+ STUDENTS ENROLLED</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black uppercase tracking-tight text-white font-heading leading-[1.08]">
                Stop Waiting For The <span className="text-[#38B66B]">"Perfect Semester"</span> To Get Fit.
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-normal max-w-xl">
                The practical 30-day fitness operating system, 68-page digital workbook, and daily execution tracker engineered for university students with <strong>limited time, tiny dorm rooms, and zero budget</strong> for personal trainers or expensive diet meal plans.
              </p>

              {/* Core Pillars Ribbon */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 font-bold text-gray-200 flex items-center gap-1.5">
                  <Dumbbell className="w-3.5 h-3.5 text-[#38B66B]" />
                  <span>15-Min Dorm Strength</span>
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 font-bold text-gray-200 flex items-center gap-1.5">
                  <Apple className="w-3.5 h-3.5 text-[#F4C95D]" />
                  <span>$35 Weekly Dorm Fuel</span>
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 font-bold text-gray-200 flex items-center gap-1.5">
                  <Moon className="w-3.5 h-3.5 text-blue-400" />
                  <span>Exam-Proof Habits</span>
                </span>
              </div>

              {/* Primary CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => handleBuyNow('complete')}
                  className="px-8 py-4 rounded-xl bg-[#38B66B] hover:bg-[#2fa35e] text-white font-extrabold text-sm uppercase tracking-wider transition-all shadow-xl hover:shadow-[#38B66B]/30 flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Get Instant Access — Only GH₵ 79</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onOpenWorkbook(1)}
                  className="px-6 py-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider transition-all border border-white/20 flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-4 h-4 text-[#F4C95D]" />
                  <span>Explore Interactive Workbook</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 pt-2">
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-[#38B66B]" />
                  <span>30-Day Money-Back Guarantee</span>
                </div>
                <div className="flex items-center gap-1">
                  <Download className="w-4 h-4 text-[#F4C95D]" />
                  <span>Instant PDF & Web App Access</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-[#38B66B]" />
                  <span>No Gym Required</span>
                </div>
              </div>
            </div>

            {/* Right Column: 3D Product Bundle Mockup */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-sm sm:max-w-md bg-gradient-to-b from-white/10 to-white/5 border border-white/20 rounded-3xl p-6 backdrop-blur-md shadow-2xl space-y-4">
                {/* Floating Top Pill */}
                <div className="absolute -top-3 right-6 bg-[#F4C95D] text-[#14213D] px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-md">
                  Complete 68-Page Suite
                </div>

                {/* Cover Card Preview */}
                <div
                  onClick={() => onOpenWorkbook(1)}
                  className="cursor-pointer group relative rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl transform transition-transform group-hover:scale-101"
                >
                  <img
                    src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80"
                    alt="The Fit Student Blueprint Cover"
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14213D] via-[#14213D]/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-[10px] text-[#38B66B] font-bold uppercase tracking-widest block">
                      Digital Workbook + Printable A4
                    </span>
                    <h3 className="text-xl font-extrabold uppercase text-white font-heading">
                      The Fit Student Blueprint
                    </h3>
                    <p className="text-xs text-gray-300">
                      30-Day Interactive System & Daily Worksheets
                    </p>
                  </div>
                </div>

                {/* Deliverables Mini-Grid */}
                <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                    <span className="block text-base font-black text-[#38B66B]">68</span>
                    <span className="text-gray-400">Total Pages</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                    <span className="block text-base font-black text-[#F4C95D]">25</span>
                    <span className="text-gray-400">Worksheets</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                    <span className="block text-base font-black text-white">30</span>
                    <span className="text-gray-400">Day Tracker</span>
                  </div>
                </div>

                {/* Quick Peek Button */}
                <button
                  onClick={() => onOpenWorkbook(53)}
                  className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors border border-white/15"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#38B66B]" />
                  <span>Click to Preview 30-Day Tracker (Page 53)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof & Numbers Banner */}
      <section className="bg-white border-b border-gray-200 py-6 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-black text-[#14213D] font-heading">1,420+</div>
            <div className="text-xs text-gray-500 font-medium">Students Enrolled</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-[#38B66B] font-heading">4.92 / 5</div>
            <div className="text-xs text-gray-500 font-medium flex items-center justify-center gap-1">
              <span className="flex text-[#F4C95D]">★★★★★</span>
              <span>Student Reviews</span>
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-[#14213D] font-heading">38+</div>
            <div className="text-xs text-gray-500 font-medium">Campuses Represented</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-[#38B66B] font-heading">100%</div>
            <div className="text-xs text-gray-500 font-medium">Student-Budget Approved</div>
          </div>
        </div>
      </section>

      {/* The Problem Section (APSOSSA Framework) */}
      <section id="the-problem" className="py-16 sm:py-20 px-4 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#38B66B] bg-[#38B66B]/15 px-3 py-1 rounded-full">
            The University Reality
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#14213D] font-heading uppercase tracking-tight">
            Why Most Fitness Advice Fails Students Within 14 Days
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Most fitness influencers have hours to spend at luxury gyms, unlimited grocery budgets, and no 8:00 AM lectures or 2,000-word essays due at midnight.
          </p>
        </div>

        {/* Side-by-side comparison table */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Card 1: Generic Influencer Fantasy */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-red-200 shadow-sm space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-red-100 text-red-700 text-[11px] font-bold px-3 py-1 rounded-bl-xl uppercase">
              The Influencer Fantasy
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold">
                <X className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-gray-800">What Doesn't Work for Students</h3>
            </div>

            <ul className="space-y-3 text-xs text-gray-600">
              <li className="flex items-start gap-2.5">
                <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>2-hour daily gym sessions that get abandoned the moment midterm assignments hit.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>$150/week organic grocery hauls and complex meal prep you can't cook in a dorm microwave.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>Weighing every single gram of rice on food scales in the communal kitchen.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>The toxic "all-or-nothing" guilt cycle: missing one workout leads to quitting entirely.</span>
              </li>
            </ul>
          </div>

          {/* Card 2: The Fit Student Blueprint Reality */}
          <div className="bg-[#14213D] text-white rounded-2xl p-6 sm:p-8 border-2 border-[#38B66B] shadow-lg space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#38B66B] text-white text-[11px] font-extrabold px-3 py-1 rounded-bl-xl uppercase">
              The Blueprint System
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#38B66B]/20 text-[#38B66B] border border-[#38B66B] flex items-center justify-center font-bold">
                <Check className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-white font-heading">What Actually Works at University</h3>
            </div>

            <ul className="space-y-3 text-xs text-gray-300">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#38B66B] shrink-0 mt-0.5" />
                <span><strong>15-Minute Dorm Routines:</strong> High-density bodyweight work with zero equipment.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#38B66B] shrink-0 mt-0.5" />
                <span><strong>$35 Weekly Grocery Matrix:</strong> High-protein student staples with 1-pan dorm recipes.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#38B66B] shrink-0 mt-0.5" />
                <span><strong>4-Quadrant Hand Measuring:</strong> Plate formulas without weighing scales or calorie anxiety.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#38B66B] shrink-0 mt-0.5" />
                <span><strong>Bad-Day Minimum Viable Fallback:</strong> Keep momentum even during stressful finals weeks.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* The 4 Pillars Section */}
      <section id="the-system" className="py-16 bg-[#14213D] text-white px-4 border-y border-white/10">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F4C95D] bg-[#F4C95D]/20 px-3 py-1 rounded-full">
              Core Architecture
            </span>
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white font-heading">
              The 4 Pillars of Modern Student Wellness
            </h2>
            <p className="text-xs sm:text-sm text-gray-300">
              A balanced, science-grounded framework designed to fit cleanly inside your existing lecture timetable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pillar 1: RESET */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#38B66B]/50 transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#38B66B]/20 text-[#38B66B] flex items-center justify-center font-bold">
                  <RotateCcw className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#38B66B]">
                    PART ONE • PAGES 6–15
                  </span>
                  <h3 className="text-lg font-bold text-white font-heading mt-0.5">
                    RESET
                  </h3>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Break the all-or-nothing trap, audit true semester energy leaks, establish your Day 1 baseline, and configure your Bad-Day Fallback plan.
                </p>
              </div>
              <button
                onClick={() => onOpenWorkbook(6)}
                className="text-xs text-[#F4C95D] font-bold hover:underline flex items-center gap-1"
              >
                <span>Read Part 1 Intro &rarr;</span>
              </button>
            </div>

            {/* Pillar 2: MOVE */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#38B66B]/50 transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#F4C95D]/20 text-[#F4C95D] flex items-center justify-center font-bold">
                  <Dumbbell className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#F4C95D]">
                    PART TWO • PAGES 16–27
                  </span>
                  <h3 className="text-lg font-bold text-white font-heading mt-0.5">
                    MOVE
                  </h3>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Master the Student Movement Hierarchy. Bank 8k campus steps effortlessly, master 15-min dorm strength, and demystify the campus rec gym.
                </p>
              </div>
              <button
                onClick={() => onOpenWorkbook(16)}
                className="text-xs text-[#F4C95D] font-bold hover:underline flex items-center gap-1"
              >
                <span>Read Part 2 Intro &rarr;</span>
              </button>
            </div>

            {/* Pillar 3: FUEL */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#38B66B]/50 transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#38B66B]/20 text-[#38B66B] flex items-center justify-center font-bold">
                  <Apple className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#38B66B]">
                    PART THREE • PAGES 28–39
                  </span>
                  <h3 className="text-lg font-bold text-white font-heading mt-0.5">
                    FUEL
                  </h3>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  The $35 weekly grocery checklist, 4-Quadrant plate formula without food scales, 4 1-pan dorm recipes, and dining hall / takeout survival.
                </p>
              </div>
              <button
                onClick={() => onOpenWorkbook(28)}
                className="text-xs text-[#F4C95D] font-bold hover:underline flex items-center gap-1"
              >
                <span>Read Part 3 Intro &rarr;</span>
              </button>
            </div>

            {/* Pillar 4: HABITS */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#38B66B]/50 transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                  <Moon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">
                    PART FOUR • PAGES 40–50
                  </span>
                  <h3 className="text-lg font-bold text-white font-heading mt-0.5">
                    HABITS & SLEEP
                  </h3>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Habit stacking around lecture schedules, 5-minute dorm resets, "Never Miss Twice" psychology, and 7.5 hours of sleep to boost your GPA.
                </p>
              </div>
              <button
                onClick={() => onOpenWorkbook(40)}
                className="text-xs text-[#F4C95D] font-bold hover:underline flex items-center gap-1"
              >
                <span>Read Part 4 Intro &rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Look Inside: Interactive Spread Showcase (Modeled after Jeff Nippard) */}
      <section id="look-inside" className="py-16 sm:py-20 px-4 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#38B66B] bg-[#38B66B]/15 px-3 py-1 rounded-full">
            Inside The 68 Pages
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#14213D] font-heading uppercase tracking-tight">
            Take an Interactive Look Inside
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Click through sample worksheets below. Every page is fillable online and printable as high-res A4 sheets.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {previewSpreads.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActivePreviewTab(idx)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activePreviewTab === idx
                  ? 'bg-[#14213D] text-[#F4C95D] shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <span>{item.title.split(' ')[0]} {item.title.split(' ')[1]}</span>
              <span className="opacity-70 text-[10px] ml-1 font-mono">(P.{item.page})</span>
            </button>
          ))}
        </div>

        {/* Active Spread Preview Card */}
        {(() => {
          const item = previewSpreads[activePreviewTab];
          return (
            <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12">
              <div className="md:col-span-6 relative bg-gray-100 flex items-center justify-center overflow-hidden min-h-[280px]">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="bg-[#38B66B] text-[10px] font-extrabold uppercase px-2 py-0.5 rounded">
                    Page {item.page}
                  </span>
                  <div className="font-bold text-sm mt-1">{item.title}</div>
                </div>
              </div>

              <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#38B66B] uppercase tracking-wider">
                      {item.category}
                    </span>
                    <span className="text-[10px] font-bold bg-[#F4C95D]/30 text-[#8a680e] px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#14213D] font-heading">
                    {item.title}
                  </h3>

                  <p className="text-xs text-gray-600 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-gray-100">
                    <span className="text-[11px] font-bold text-gray-700 block">Key Highlights:</span>
                    {item.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-gray-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#38B66B] shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                  <button
                    onClick={() => onOpenWorkbook(item.page)}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-[#14213D] hover:bg-[#1f315a] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2"
                  >
                    <BookOpen className="w-4 h-4 text-[#F4C95D]" />
                    <span>Open Live in Workbook</span>
                  </button>

                  <button
                    onClick={() => handleBuyNow('complete')}
                    className="py-2.5 px-4 rounded-xl bg-[#38B66B] hover:bg-[#2fa35e] text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Get All 68 Pages ($27)</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })()}
      </section>

      {/* What's Included Section */}
      <section id="whats-included" className="py-16 bg-white border-y border-gray-200 px-4">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#38B66B] bg-[#38B66B]/15 px-3 py-1 rounded-full">
              Complete Deliverables
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#14213D] font-heading uppercase tracking-tight">
              Everything You Get In The Blueprint
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              A complete, commercial-grade digital system you can use immediately on your laptop, phone, iPad, or print out.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-[#ECEEE7]/50 border border-gray-200 flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-[#14213D] text-[#38B66B] flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-[#14213D]">68-Page Master Digital Workbook</h4>
                  <span className="text-xs font-bold text-gray-400">$49 Value</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Interactive web edition with local data persistence + print-ready high-resolution A4 PDF.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#ECEEE7]/50 border border-gray-200 flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-[#14213D] text-[#F4C95D] flex items-center justify-center shrink-0">
                <Layers className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-[#14213D]">25 Printable Visual Worksheets</h4>
                  <span className="text-xs font-bold text-gray-400">$35 Value</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Audits, scorecards, grocery lists, and habit stacks designed for quick reflection without cognitive overload.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#ECEEE7]/50 border border-gray-200 flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-[#14213D] text-[#38B66B] flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-[#14213D]">30-Day Daily Streak & Momentum Tracker</h4>
                  <span className="text-xs font-bold text-gray-400">$25 Value</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  A high-contrast daily check-in system with weekly review scorecards and milestone rewards.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#ECEEE7]/50 border border-gray-200 flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-[#14213D] text-[#F4C95D] flex items-center justify-center shrink-0">
                <Dumbbell className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-[#14213D]">15-Minute No-Equipment Dorm Card</h4>
                  <span className="text-xs font-bold text-gray-400">$19 Value</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Zero-noise, zero-jumping strength routines that keep you strong and toned from your bedroom floor.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#ECEEE7]/50 border border-gray-200 flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-[#14213D] text-[#38B66B] flex items-center justify-center shrink-0">
                <Apple className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-[#14213D]">$35 Grocery List & 1-Pan Recipes</h4>
                  <span className="text-xs font-bold text-gray-400">$25 Value</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  The ultimate student food matrix. High-protein breakfasts, fast lunches, and dining hall survival hacks.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#ECEEE7]/50 border border-gray-200 flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-[#14213D] text-[#F4C95D] flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-[#14213D]">Verified Certificate of Completion</h4>
                  <span className="text-xs font-bold text-gray-400">$19 Value</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Official downloadable and printable completion certificate with your name and university verified.
                </p>
              </div>
            </div>
          </div>

          {/* Value Summary Callout */}
          <div className="p-6 rounded-2xl bg-[#14213D] text-white flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <div className="text-xs uppercase tracking-wider text-[#F4C95D] font-bold">
                Total Combined Real Value: $172
              </div>
              <div className="text-xl sm:text-2xl font-black font-heading mt-0.5">
                Today's Student Enrollment Price: Just $27
              </div>
            </div>
            <button
              onClick={() => handleBuyNow('complete')}
              className="px-6 py-3 rounded-xl bg-[#38B66B] hover:bg-[#2fa35e] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shrink-0"
            >
              Claim Student Discount &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* Student Testimonials Section */}
      <section id="testimonials" className="py-16 sm:py-20 px-4 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#38B66B] bg-[#38B66B]/15 px-3 py-1 rounded-full">
            Real Student Results
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#14213D] font-heading uppercase tracking-tight">
            Hear From Students Like You
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Real feedback from students balancing courses, assignments, and campus life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Review 1 */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex text-[#F4C95D] text-xs">★★★★★</div>
              <p className="text-xs text-gray-700 leading-relaxed italic">
                "I used to drink three energy drinks a day and crash at 3 PM during lectures. The 15-minute dorm routine and 4-quadrant dining hall formula changed everything. I have steady focus all day without spending hours in the gym."
              </p>
            </div>
            <div className="pt-3 border-t border-gray-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#14213D] text-[#38B66B] flex items-center justify-center font-bold text-xs">
                MS
              </div>
              <div>
                <h5 className="font-bold text-xs text-[#14213D]">Maya S.</h5>
                <p className="text-[10px] text-gray-500">2nd Year Computer Science • Edinburgh</p>
              </div>
            </div>
          </div>

          {/* Review 2 */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex text-[#F4C95D] text-xs">★★★★★</div>
              <p className="text-xs text-gray-700 leading-relaxed italic">
                "The Bad-Day Minimum Viable Fallback alone is worth 10x the price. On crazy weeks with deadlines, I didn't abandon everything—I just did the 5-minute reset. Completed the full 30 days and printed my certificate!"
              </p>
            </div>
            <div className="pt-3 border-t border-gray-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#38B66B] text-white flex items-center justify-center font-bold text-xs">
                MT
              </div>
              <div>
                <h5 className="font-bold text-xs text-[#14213D]">Marcus T.</h5>
                <p className="text-[10px] text-gray-500">3rd Year Business & Finance • Manchester</p>
              </div>
            </div>
          </div>

          {/* Review 3 */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex text-[#F4C95D] text-xs">★★★★★</div>
              <p className="text-xs text-gray-700 leading-relaxed italic">
                "Grocery shopping on £35 a week with actual protein used to feel impossible. Page 31 became my literal weekly supermarket shopping list. Down 7 lbs, sleeping so much better, and my exam focus is up."
              </p>
            </div>
            <div className="pt-3 border-t border-gray-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#14213D] text-[#F4C95D] flex items-center justify-center font-bold text-xs">
                CR
              </div>
              <div>
                <h5 className="font-bold text-xs text-[#14213D]">Chloe R.</h5>
                <p className="text-[10px] text-gray-500">1st Year Nursing • King's College London</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section (Modeled after Natacha Océane & Jeff Nippard) */}
      <section id="pricing" className="py-16 sm:py-20 bg-[#14213D] text-white px-4 border-y border-white/10">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#38B66B] bg-[#38B66B]/20 px-3 py-1 rounded-full">
              Transparent Student Pricing
            </span>
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white font-heading">
              Choose Your Blueprint Package
            </h2>
            <p className="text-xs sm:text-sm text-gray-300">
              One-time payment. Instant lifetime digital access. No subscriptions, hidden fees, or recurring charges.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
            {/* Tier 1: Starter Blueprint */}
            <div className="bg-white/5 border border-white/15 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div>
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                    Core PDF
                  </span>
                  <h3 className="text-xl font-black text-white font-heading mt-1">
                    Starter Blueprint
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Ideal for students wanting just the printable master book.
                  </p>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black text-white font-heading">GH₵ 49</span>
                  <span className="text-xs line-through text-gray-500">GH₵ 120</span>
                  <span className="text-[11px] text-gray-400">one-time</span>
                </div>

                <ul className="space-y-2.5 text-xs text-gray-300 pt-3 border-t border-white/10">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#38B66B] shrink-0" />
                    <span>The Fit Student Blueprint 68-Page PDF</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#38B66B] shrink-0" />
                    <span>30-Day Printable Calendar Grid</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#38B66B] shrink-0" />
                    <span>Dorm Room Strength Quick Card</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-500">
                    <X className="w-4 h-4 text-gray-600 shrink-0" />
                    <span>Interactive Web App & Storage</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-500">
                    <X className="w-4 h-4 text-gray-600 shrink-0" />
                    <span>Verified Official Certificate</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => handleBuyNow('starter')}
                className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-colors"
              >
                Choose Starter — GH₵ 49
              </button>
            </div>

            {/* Tier 2: The 30-Day Complete System (POPULAR) */}
            <div className="bg-gradient-to-b from-[#1c2e56] to-[#14213D] border-2 border-[#38B66B] rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 relative shadow-2xl transform lg:-translate-y-2">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#38B66B] text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow">
                Most Popular • Best Value
              </div>

              <div className="space-y-4 pt-2">
                <div>
                  <span className="text-xs text-[#F4C95D] font-bold uppercase tracking-wider">
                    The Complete Suite
                  </span>
                  <h3 className="text-xl font-black text-white font-heading mt-1">
                    The 30-Day System
                  </h3>
                  <p className="text-xs text-gray-300 mt-1">
                    Everything you need for an effortless, permanent physical reset.
                  </p>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black text-[#38B66B] font-heading">GH₵ 79</span>
                  <span className="text-xs line-through text-gray-400">GH₵ 240</span>
                  <span className="text-[11px] text-[#F4C95D] font-semibold">Save GH₵ 161 Today</span>
                </div>

                <ul className="space-y-2.5 text-xs text-gray-200 pt-3 border-t border-white/10">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#38B66B] shrink-0" />
                    <span><strong>68-Page Interactive Web Application</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#38B66B] shrink-0" />
                    <span><strong>High-Resolution A4 Printable PDF</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#38B66B] shrink-0" />
                    <span>All 25 Printable Visual Worksheets</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#38B66B] shrink-0" />
                    <span>Interactive 30-Day Tracker & Streak Saver</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#38B66B] shrink-0" />
                    <span>$35 Weekly High-Protein Dorm Grocery Matrix</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#38B66B] shrink-0" />
                    <span>Official Verified Certificate of Completion</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#38B66B] shrink-0" />
                    <span>Lifetime Access & Free Future Updates</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => handleBuyNow('complete')}
                className="w-full py-3.5 rounded-xl bg-[#38B66B] hover:bg-[#2fa35e] text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-[#38B66B]/30 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Get Instant Access — GH₵ 79</span>
              </button>
            </div>

            {/* Tier 3: University Mastery Pack */}
            <div className="bg-white/5 border border-white/15 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div>
                  <span className="text-xs text-[#F4C95D] font-bold uppercase tracking-wider">
                    Mastery Package
                  </span>
                  <h3 className="text-xl font-black text-white font-heading mt-1">
                    Mastery Pack
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Full system + exam protocols and semester long-term operating system.
                  </p>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black text-white font-heading">GH₵ 119</span>
                  <span className="text-xs line-through text-gray-500">GH₵ 360</span>
                  <span className="text-[11px] text-gray-400">one-time</span>
                </div>

                <ul className="space-y-2.5 text-xs text-gray-300 pt-3 border-t border-white/10">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#38B66B] shrink-0" />
                    <span>Everything in The 30-Day Complete System</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#38B66B] shrink-0" />
                    <span>Exam Period Survival Guide (Page 66)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#38B66B] shrink-0" />
                    <span>Semester Long-Term Maintenance Plan</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#38B66B] shrink-0" />
                    <span>Dining Hall & Campus Social Mastery Deck</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#38B66B] shrink-0" />
                    <span>Priority Lifetime Email Support</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => handleBuyNow('mastery')}
                className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-colors"
              >
                Choose Mastery — GH₵ 119
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 30-Day Semester Guarantee Section */}
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200 shadow-xl flex flex-col sm:flex-row items-center gap-8">
          <div className="w-24 h-24 rounded-full bg-[#38B66B]/15 border-2 border-[#38B66B] flex items-center justify-center text-[#38B66B] shrink-0">
            <ShieldCheck className="w-12 h-12" />
          </div>

          <div className="space-y-2 text-center sm:text-left">
            <span className="text-[11px] font-bold text-[#38B66B] uppercase tracking-wider block">
              100% Risk-Free Guarantee
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-[#14213D] font-heading">
              Our 30-Day "Semester Transformation" Guarantee
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Take the full 30 days to test the blueprint. If you don't feel noticeably stronger, more energized in your morning lectures, and in control of your daily routine, simply send us an email. We'll refund every single penny immediately. You have nothing to lose and a vibrant, healthy semester to gain.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section id="faq" className="py-16 bg-white border-y border-gray-200 px-4">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#38B66B] bg-[#38B66B]/15 px-3 py-1 rounded-full">
              Common Questions
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#14213D] font-heading uppercase tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              Everything you need to know before joining the 30-Day Challenge.
            </p>
          </div>

          <div className="space-y-3">
            {faqList.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-gray-200 overflow-hidden transition-all bg-[#ECEEE7]/40"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between font-bold text-xs sm:text-sm text-[#14213D] hover:bg-white/60 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-500 transition-transform ${
                        isOpen ? 'rotate-180 text-[#38B66B]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-4 pt-1 text-xs text-gray-600 leading-relaxed border-t border-gray-200/60 bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final Call to Action Banner */}
      <section className="py-20 bg-[#14213D] text-white px-4 text-center relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#38B66B]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl mx-auto relative z-10 space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4C95D]/20 text-[#F4C95D] text-xs font-bold uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5" />
            <span>Make This Semester Your Strongest Ever</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight font-heading leading-tight">
            Ready to Transform Your Fitness, Fuel & Habits in 30 Days?
          </h2>

          <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto leading-relaxed">
            Join over 1,420 students who stopped waiting for the "perfect time" and started feeling energized, confident, and fit.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => handleBuyNow('complete')}
              className="px-8 py-4 rounded-xl bg-[#38B66B] hover:bg-[#2fa35e] text-white font-extrabold text-sm uppercase tracking-wider transition-all shadow-xl hover:shadow-[#38B66B]/30 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Get Instant Access — GH₵ 79</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onOpenWorkbook(1)}
              className="px-6 py-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider transition-all border border-white/20 flex items-center justify-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-[#F4C95D]" />
              <span>Open Interactive Demo</span>
            </button>
          </div>

          <div className="flex items-center justify-center gap-6 text-[11px] text-gray-400 pt-2">
            <span>Instant Digital Access</span>
            <span>•</span>
            <span>30-Day Money-Back Guarantee</span>
            <span>•</span>
            <span>A4 Printable + Web App</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0e172a] text-gray-400 py-10 px-4 text-xs border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-white font-bold text-sm tracking-wide uppercase font-heading">
              The Fit Student Blueprint
            </div>
            <p className="text-[11px] text-gray-500">
              Modern Student Wellness Publishing. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-6 text-xs">
            <button onClick={() => onOpenWorkbook(1)} className="hover:text-white transition-colors">
              Interactive Workbook
            </button>
            <button onClick={() => onOpenWorkbook(2)} className="hover:text-white transition-colors">
              Disclaimer & Terms
            </button>
            <a href="#faq" className="hover:text-white transition-colors">
              FAQ
            </a>
            <button onClick={() => handleBuyNow('complete')} className="text-[#38B66B] font-bold hover:underline">
              Get Access (GH₵ 79)
            </button>
          </div>
        </div>
      </footer>

      {/* Interactive Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        selectedTier={selectedTier}
        onAccessWorkbook={(page = 1) => onOpenWorkbook(page)}
      />
    </div>
  );
};
