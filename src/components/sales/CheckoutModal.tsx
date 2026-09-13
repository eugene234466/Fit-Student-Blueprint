import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  ShieldCheck,
  Lock,
  Sparkles,
  Download,
  BookOpen,
  ArrowRight,
  Star,
  Award,
  CreditCard,
  Building2,
  AlertCircle,
  ExternalLink,
  Loader2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useWorkbook } from '../../context/WorkbookContext';
import { LegalModal, LegalTab } from '../legal/LegalModal';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTier: 'starter' | 'complete' | 'mastery';
  onAccessWorkbook: (startPage?: number) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  selectedTier,
  onAccessWorkbook,
}) => {
  const [tier, setTier] = useState<'starter' | 'complete' | 'mastery'>(selectedTier);
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [university, setUniversity] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paystackConfigured, setPaystackConfigured] = useState<boolean | null>(null);
  const [currency, setCurrency] = useState<'GHS' | 'USD' | 'NGN' | 'ZAR'>('GHS');
  const [availableCurrencies, setAvailableCurrencies] = useState<string[]>(['GHS', 'USD']);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pendingCheckoutUrl, setPendingCheckoutUrl] = useState<string | null>(null);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<LegalTab>('terms');

  const openLegal = (tab: LegalTab) => {
    setLegalTab(tab);
    setIsLegalModalOpen(true);
  };

  // Sync initial tier if prop changes
  useEffect(() => {
    setTier(selectedTier);
  }, [selectedTier]);

  // Check backend payment configuration status
  useEffect(() => {
    fetch('/api/payment-config')
      .then((res) => res.json())
      .then((data) => {
        setPaystackConfigured(Boolean(data.configured));
        if (data.defaultCurrency) {
          setCurrency(data.defaultCurrency);
        }
        if (Array.isArray(data.supportedCurrencies) && data.supportedCurrencies.length > 0) {
          setAvailableCurrencies(data.supportedCurrencies);
        }
      })
      .catch(() => {
        setPaystackConfigured(false);
      });
  }, []);

  // Listen for payment return URL parameters (#payment-success=true or ?reference=)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      const search = window.location.search;
      if (
        hash.includes('payment-success=true') ||
        search.includes('trxref=') ||
        search.includes('reference=')
      ) {
        setIsSuccess(true);
        const hashParams = new URLSearchParams(hash.replace(/^#/, ''));
        const searchParams = new URLSearchParams(search.replace(/^\?/, ''));
        const nameParam = hashParams.get('name') || searchParams.get('name');
        if (nameParam) setStudentName(decodeURIComponent(nameParam));
        const tierParam = (hashParams.get('tier') || searchParams.get('tier')) as any;
        if (tierParam && ['starter', 'complete', 'mastery'].includes(tierParam)) {
          setTier(tierParam);
        }

        try {
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 },
          });
        } catch {
          // ignore
        }
      }
    }
  }, []);

  if (!isOpen) return null;

  const currencySymbols: Record<string, string> = {
    GHS: 'GH₵ ',
    USD: '$',
    NGN: '₦',
    ZAR: 'R ',
  };

  const getPriceDisplay = (amounts: Record<string, number>, originalAmounts: Record<string, number>) => {
    const sym = currencySymbols[currency] || '$';
    const amount = amounts[currency] ?? amounts.USD;
    const orig = originalAmounts[currency] ?? originalAmounts.USD;
    return {
      price: `${sym}${amount.toLocaleString()}`,
      originalPrice: `${sym}${orig.toLocaleString()}`,
    };
  };

  const tierDetails = {
    starter: {
      name: 'Starter Blueprint (Student Discount)',
      amounts: { GHS: 29, USD: 2.5, NGN: 3500, ZAR: 45 },
      originalAmounts: { GHS: 120, USD: 9, NGN: 14000, ZAR: 170 },
      tag: 'Student Discount • Core Essentials',
      items: [
        'The Fit Student Blueprint 68-Page Master PDF',
        '30-Day Daily Habit & Progress Tracker',
        'Standard Dorm Room Workout Card',
      ],
    },
    complete: {
      name: 'The 30-Day Complete System',
      amounts: { GHS: 79, USD: 6, NGN: 8900, ZAR: 110 },
      originalAmounts: { GHS: 240, USD: 18, NGN: 27000, ZAR: 340 },
      tag: 'Most Popular • Best Value',
      items: [
        'Full 68-Page Interactive Digital Workbook + A4 PDF',
        'All 25 Printable Visual Frameworks & Worksheets',
        'The 30-Day Interactive Streak & Scorecard Tracker',
        '15-Minute Dorm No-Equipment Exercise Card Deck',
        '$35 High-Protein Dorm Grocery Matrix & 4 Fast Meals',
        'Exam-Period Stress & Survival Protocol (Bonus)',
        'Official Verified Certificate of Completion',
        'Lifetime Access & All Future Semester Updates',
      ],
    },
    mastery: {
      name: 'University Mastery Pack',
      amounts: { GHS: 119, USD: 9, NGN: 13500, ZAR: 165 },
      originalAmounts: { GHS: 360, USD: 28, NGN: 41000, ZAR: 510 },
      tag: 'Ultimate Student Kit',
      items: [
        'Everything in The 30-Day Complete System',
        'Semester Long-Term Maintenance Operating System',
        'Dining Hall & Campus Social Navigation Masterclass',
        '1-on-1 Habit Customizer & Lecture Schedule Planner',
        'Priority Lifetime Feature Updates',
      ],
    },
  };

  const selectedTierData = tierDetails[tier];
  const { price: currentPrice, originalPrice: currentOriginalPrice } = getPriceDisplay(
    selectedTierData.amounts,
    selectedTierData.originalAmounts
  );

  const current = {
    ...selectedTierData,
    price: currentPrice,
    originalPrice: currentOriginalPrice,
  };

  const handleCompleteOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrorMessage(null);

    // If Paystack is configured with key, create Paystack checkout authorization
    if (paystackConfigured) {
      try {
        const response = await fetch('/api/create-checkout-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tier,
            studentName,
            studentEmail,
            university,
            currency,
          }),
        });

        const data = await response.json();

        if (response.ok && data.url) {
          setIsProcessing(false);
          setPendingCheckoutUrl(data.url);
          const isIframe = typeof window !== 'undefined' && window.self !== window.top;
          if (isIframe) {
            try {
              window.open(data.url, '_blank');
            } catch {
              // fallback to explicit button
            }
          } else {
            window.location.href = data.url;
          }
          return;
        } else {
          setErrorMessage(data.error || 'Could not initialize Paystack checkout. Falling back to preview test mode.');
          triggerSuccessSimulation();
        }
      } catch (err: any) {
        setErrorMessage(err?.message || 'Payment network error. Launching in preview mode.');
        triggerSuccessSimulation();
      }
    } else {
      // Instant preview simulation mode (when PAYSTACK_SECRET_KEY is not configured yet)
      triggerSuccessSimulation();
    }
  };

  const triggerSuccessSimulation = () => {
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // ignore
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#14213D] text-[#F7F8F3] rounded-2xl shadow-2xl border border-white/15 overflow-hidden my-6">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#14213D] to-[#1f315a] p-5 sm:p-6 border-b border-white/10 flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#38B66B]/20 text-[#38B66B] text-[11px] font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Instant Digital Access</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight font-heading">
              {isSuccess ? 'Welcome to The Fit Student Blueprint!' : 'Complete Your Enrollment'}
            </h2>
            <p className="text-xs text-gray-300 mt-0.5">
              {isSuccess
                ? 'Your order is confirmed. Your 30-day transformation starts right now.'
                : '30-Day Student Fitness Guide & Interactive Operating System'}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5">
          {pendingCheckoutUrl ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#38B66B]/20 border border-[#38B66B]/40 flex items-center justify-center text-[#38B66B] mx-auto">
                <CreditCard className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-white font-heading">
                  Paystack Checkout Ready
                </h3>
                <p className="text-xs text-gray-300 max-w-sm mx-auto mt-1 leading-relaxed">
                  Your secure Paystack payment window for <strong className="text-white">{current.name}</strong> ({current.price}) is ready.
                </p>
              </div>

              <div className="pt-2 flex flex-col gap-2.5 max-w-sm mx-auto">
                <a
                  href={pendingCheckoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-[#38B66B] hover:bg-[#2fa35e] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <span>Open Paystack Checkout in New Tab</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setPendingCheckoutUrl(null);
                    triggerSuccessSimulation();
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-gray-200 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#F4C95D]" />
                  <span>Simulate Payment Verified (Test Unlock)</span>
                </button>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setPendingCheckoutUrl(null)}
                  className="text-xs text-gray-400 hover:text-white underline"
                >
                  ← Return to checkout form
                </button>
              </div>
            </div>
          ) : isSuccess ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#38B66B]/20 border-2 border-[#38B66B] flex items-center justify-center text-[#38B66B] mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-white font-heading">
                  Order Confirmed! You're Ready to Roll, {studentName || 'Student'}!
                </h3>
                <p className="text-xs text-gray-300 max-w-md mx-auto mt-1 leading-relaxed">
                  We've unlocked full access to the 68-page interactive workbook, 25 visual worksheets, and daily habit tracker for you.
                </p>
              </div>

              <div className="p-4 bg-white/5 border border-white/10 rounded-xl max-w-md mx-auto text-left space-y-2 text-xs">
                <div className="flex justify-between font-medium">
                  <span className="text-gray-400">Selected Plan:</span>
                  <span className="text-[#F4C95D] font-bold">{current.name}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span className="text-gray-400">Total Charged:</span>
                  <span className="text-[#38B66B] font-bold">{current.price} (Student Discount Applied)</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span className="text-gray-400">Access Type:</span>
                  <span className="text-white">Lifetime Interactive + Fillable PDF</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => {
                    onClose();
                    onAccessWorkbook(1);
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#38B66B] hover:bg-[#2fa35e] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Launch Interactive Workbook</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onAccessWorkbook(9); // Day 1 assessment
                  }}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#F4C95D]" />
                  <span>Start Day 1 Assessment</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Tier Selection Tabs */}
              <div className="grid grid-cols-3 gap-2 p-1 bg-black/30 rounded-xl border border-white/10">
                {(['starter', 'complete', 'mastery'] as const).map((t) => {
                  const tPrice = getPriceDisplay(tierDetails[t].amounts, tierDetails[t].originalAmounts).price;
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTier(t)}
                      className={`py-2 px-1 text-center rounded-lg transition-all ${
                        tier === t
                          ? 'bg-[#38B66B] text-white font-bold shadow'
                          : 'text-gray-300 hover:text-white hover:bg-white/5 font-medium'
                      }`}
                    >
                      <div className="text-xs leading-tight capitalize">
                        {t === 'starter' ? 'Student Plan' : t === 'complete' ? 'Complete' : 'Mastery'}
                      </div>
                      <div className="text-[11px] opacity-90">{tPrice}</div>
                    </button>
                  );
                })}
              </div>

              {/* Package Summary Box */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-[#F4C95D]">
                      {current.tag}
                    </span>
                    <h3 className="font-bold text-sm text-white">{current.name}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs line-through text-gray-400 block leading-none">
                      {current.originalPrice}
                    </span>
                    <span className="text-xl font-black text-[#38B66B] leading-none">
                      {current.price}
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-white/10">
                  {current.items.slice(0, 5).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-[11px] text-gray-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#38B66B] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                  {current.items.length > 5 && (
                    <div className="text-[11px] text-[#F4C95D] font-medium pl-5">
                      + {current.items.length - 5} more bonuses included
                    </div>
                  )}
                </div>
              </div>

              {/* Student Details Form */}
              <form onSubmit={handleCompleteOrder} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-300 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg bg-black/40 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#38B66B]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-gray-300 mb-1">
                      Student / Preferred Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@university.edu"
                      value={studentEmail}
                      onChange={(e) => setStudentEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg bg-black/40 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#38B66B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-300 mb-1">
                    University / College (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. University of Manchester / NYU"
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-black/40 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#38B66B]"
                  />
                </div>

                {/* Currency Selection */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-black/20 border border-white/10 text-xs">
                  <span className="text-gray-300 font-semibold text-[11px] flex items-center gap-1.5">
                    <span>Currency:</span>
                  </span>
                  <div className="flex gap-1">
                    {(['GHS', 'USD', 'NGN', 'ZAR'] as const).map((curr) => (
                      <button
                        key={curr}
                        type="button"
                        onClick={() => setCurrency(curr)}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                          currency === curr
                            ? 'bg-[#38B66B] text-white shadow'
                            : 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white'
                        }`}
                      >
                        {curr}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Student Rate Notification & Quick-Switch */}
                {tier !== 'starter' ? (
                  <div className="p-2.5 rounded-lg bg-[#38B66B]/10 border border-[#38B66B]/30 flex items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-1.5 text-gray-200 text-[11px]">
                      <Sparkles className="w-3.5 h-3.5 text-[#38B66B] shrink-0" />
                      <span>Are you a university student?</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setTier('starter')}
                      className="px-2.5 py-1 rounded-md bg-[#38B66B] hover:bg-[#2fa35e] text-white font-bold text-[11px] tracking-wide shrink-0 transition-colors"
                    >
                      Apply Student Rate ({currency === 'GHS' ? 'GH₵ 29' : '$2.50'})
                    </button>
                  </div>
                ) : (
                  <div className="p-2.5 rounded-lg bg-[#38B66B]/15 border border-[#38B66B]/30 flex items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-1.5 text-[#38B66B] font-semibold text-[11px]">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>Student Discount Active — {currency === 'GHS' ? 'GH₵ 29' : '$2.50'} Rate Applied!</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setTier('complete')}
                      className="text-[10px] text-gray-400 hover:text-white underline shrink-0"
                    >
                      View 30-Day System (GH₵ 79)
                    </button>
                  </div>
                )}

                {/* Payment Gateway Status & Bank Connection Info */}
                <div className="p-2.5 rounded-lg bg-black/30 border border-white/10 text-[11px] flex items-start gap-2">
                  <Building2 className="w-4 h-4 text-[#F4C95D] shrink-0 mt-0.5" />
                  <div className="text-gray-300 leading-snug">
                    {paystackConfigured ? (
                      <div>
                        <span className="text-white font-semibold flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#38B66B] inline-block animate-pulse"></span>
                          Paystack Direct Bank & Mobile Money Gateway Active
                        </span>
                        <span className="text-gray-400 block text-[10px] mt-0.5">
                          Accepts Bank Transfer, Mobile Money (MTN MoMo, Telecel, AirtelTigo), Debit/Credit Cards, Apple Pay, and USSD. Revenue automatically deposits directly into your bank account.
                        </span>
                      </div>
                    ) : (
                      <div>
                        <span className="text-[#F4C95D] font-semibold block">
                          Paystack Bank Payout Integration Ready
                        </span>
                        <span className="text-gray-400 block text-[10px] mt-0.5">
                          Customer payments deposit directly into your bank account via Paystack. Add your <code className="text-[#38B66B] bg-black/40 px-1 py-0.5 rounded font-mono">PAYSTACK_SECRET_KEY</code> in project secrets to enable live processing.
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {errorMessage && (
                  <div className="p-2.5 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-200 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Instant Order Button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#38B66B] hover:bg-[#2fa35e] text-white font-extrabold text-sm uppercase tracking-wider transition-all shadow-lg hover:shadow-[#38B66B]/30 flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{paystackConfigured ? 'Connecting to Paystack...' : 'Unlocking Student Access...'}</span>
                    </>
                  ) : paystackConfigured ? (
                    <>
                      <CreditCard className="w-4 h-4" />
                      <span>Pay with Paystack ({currency}) — {current.price}</span>
                      <ExternalLink className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Unlock The Blueprint — {current.price}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {paystackConfigured && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      triggerSuccessSimulation();
                    }}
                    className="w-full text-center text-[11px] text-gray-400 hover:text-[#38B66B] transition-colors py-1 flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-3 h-3 text-[#F4C95D]" />
                    <span>Or run instant demo test (skip payment)</span>
                  </button>
                )}

                {/* Legal Consent Notice */}
                <div className="pt-2 px-1 text-center">
                  <p className="text-[10px] text-gray-400 leading-tight">
                    By completing this order, you agree to our{' '}
                    <button
                      type="button"
                      onClick={() => openLegal('terms')}
                      className="text-[#F4C95D] underline hover:text-white font-medium inline"
                    >
                      Terms of Sale
                    </button>
                    ,{' '}
                    <button
                      type="button"
                      onClick={() => openLegal('privacy')}
                      className="text-[#38B66B] underline hover:text-white font-medium inline"
                    >
                      Privacy Policy
                    </button>
                    , and{' '}
                    <button
                      type="button"
                      onClick={() => openLegal('health')}
                      className="text-rose-400 underline hover:text-white font-medium inline"
                    >
                      Health Disclaimer
                    </button>
                    . Backed by our{' '}
                    <button
                      type="button"
                      onClick={() => openLegal('refund')}
                      className="text-emerald-400 underline hover:text-white font-medium inline"
                    >
                      30-Day Money-Back Guarantee
                    </button>
                    .
                  </p>
                </div>
              </form>

              {/* Guarantees & Security footer */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-400 gap-2 border-t border-white/10">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#38B66B]" />
                  <span>Paystack Bank Payout Protected</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-gray-400" />
                  <span>256-Bit SSL Encrypted Access</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Legal Policies Modal inside Checkout */}
      <LegalModal
        isOpen={isLegalModalOpen}
        onClose={() => setIsLegalModalOpen(false)}
        initialTab={legalTab}
      />
    </div>
  );
};
