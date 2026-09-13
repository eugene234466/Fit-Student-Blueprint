import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  HeartPulse,
  Scale,
  RotateCcw,
  Search,
  ExternalLink,
  Mail,
  Printer,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { LEGAL_POLICIES, LegalSection } from '../../data/legalPolicies';

export type LegalTab = 'health' | 'privacy' | 'terms' | 'refund';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: LegalTab;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'privacy',
}) => {
  const [activeTab, setActiveTab] = useState<LegalTab>(initialTab);
  const [searchQuery, setSearchQuery] = useState('');

  // Sync initialTab if opened with specific tab
  React.useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      setSearchQuery('');
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  const currentPolicy: LegalSection = LEGAL_POLICIES[activeTab];

  const filteredContent = searchQuery.trim()
    ? currentPolicy.content.filter(
        (c) =>
          c.heading.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.points?.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : currentPolicy.content;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 flex flex-col max-h-[92vh] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#14213D] text-white px-5 sm:px-8 py-5 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#38B66B]">
              {activeTab === 'health' && <HeartPulse className="w-5 h-5 text-rose-400" />}
              {activeTab === 'privacy' && <ShieldCheck className="w-5 h-5 text-[#38B66B]" />}
              {activeTab === 'terms' && <Scale className="w-5 h-5 text-[#F4C95D]" />}
              {activeTab === 'refund' && <RotateCcw className="w-5 h-5 text-emerald-400" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold font-heading tracking-wide">
                  Legal & Compliance Center
                </h2>
                <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/10 text-gray-300">
                  {currentPolicy.badge}
                </span>
              </div>
              <p className="text-xs text-gray-300">
                The Fit Student Blueprint • Modern Student Wellness Publishing
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              title="Print Document"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors text-xs hidden sm:flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              <span>Print</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-[#0f172a] px-4 sm:px-8 py-2.5 flex items-center gap-1 sm:gap-2 overflow-x-auto border-b border-white/10 shrink-0">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'privacy'
                ? 'bg-[#38B66B] text-white shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Privacy Policy</span>
          </button>

          <button
            onClick={() => setActiveTab('health')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'health'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <HeartPulse className="w-3.5 h-3.5" />
            <span>Health & Medical Disclaimer</span>
          </button>

          <button
            onClick={() => setActiveTab('terms')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'terms'
                ? 'bg-[#F4C95D] text-[#14213D] shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Terms of Service & License</span>
          </button>

          <button
            onClick={() => setActiveTab('refund')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'refund'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>30-Day Refund Guarantee</span>
          </button>
        </div>

        {/* Search & Quick Summary Subheader */}
        <div className="p-4 sm:px-8 bg-gray-50 border-b border-gray-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shrink-0">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search within ${currentPolicy.title}...`}
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#38B66B] focus:border-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
              >
                Clear
              </button>
            )}
          </div>

          <div className="text-[11px] text-gray-500 flex items-center gap-3">
            <span>Last revised: {currentPolicy.lastUpdated}</span>
            <span>•</span>
            <span className="font-semibold text-gray-700">Official Policy Document</span>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-6 flex-1 text-gray-700 text-sm leading-relaxed">
          {/* Executive Summary Callout Box */}
          <div
            className={`p-4 rounded-xl border flex items-start gap-3.5 ${
              activeTab === 'health'
                ? 'bg-rose-50 border-rose-200 text-rose-950'
                : activeTab === 'privacy'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                : activeTab === 'terms'
                ? 'bg-amber-50 border-amber-200 text-amber-950'
                : 'bg-blue-50 border-blue-200 text-blue-950'
            }`}
          >
            {activeTab === 'health' ? (
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            ) : (
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            )}
            <div className="space-y-1">
              <h4 className="font-bold text-xs uppercase tracking-wider">
                Summary of Critical Provisions
              </h4>
              <p className="text-xs leading-relaxed opacity-90">{currentPolicy.summary}</p>
            </div>
          </div>

          {/* Policy Title in content */}
          <div>
            <h3 className="text-xl font-black text-[#14213D] font-heading">
              {currentPolicy.title}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Applicable to all readers, buyers, and interactive applet users worldwide.
            </p>
          </div>

          {/* Filtered Sections */}
          {filteredContent.length === 0 ? (
            <div className="text-center py-12 text-gray-500 text-xs">
              No matching legal clauses found for "{searchQuery}". Try a different keyword like
              "refund", "doctor", "storage", or "license".
            </div>
          ) : (
            <div className="space-y-6 divide-y divide-gray-100">
              {filteredContent.map((item, idx) => (
                <div key={idx} className={idx > 0 ? 'pt-6' : ''}>
                  <h4 className="font-bold text-[#14213D] text-sm mb-2">{item.heading}</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.body}</p>

                  {item.points && item.points.length > 0 && (
                    <ul className="mt-3 space-y-2 pl-4 text-xs text-gray-600">
                      {item.points.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#38B66B] mt-1.5 shrink-0" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Contact / Legal Inquiries footer within content */}
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-gray-600">
            <div className="space-y-0.5">
              <span className="font-bold text-[#14213D]">Questions or Legal Requests?</span>
              <p className="text-[11px] text-gray-500">
                Direct all data deletion requests, copyright matters, or inquiries to our desk:
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="mailto:support@thefitstudent.com"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-gray-300 hover:border-[#38B66B] text-gray-800 font-semibold text-xs transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#38B66B]" />
                <span>support@thefitstudent.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Modal Footer / Acceptance */}
        <div className="bg-gray-100 px-5 sm:px-8 py-3.5 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-gray-500 text-center sm:text-left">
            <CheckCircle2 className="w-4 h-4 text-[#38B66B] shrink-0" />
            <span>
              By purchasing or using this platform, you agree to all terms and liability disclaimers.
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2 rounded-xl bg-[#14213D] hover:bg-[#1a2d52] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
            >
              Close & Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
