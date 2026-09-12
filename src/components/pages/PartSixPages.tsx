import React, { useState } from 'react';
import { PageContainer } from '../PageContainer';
import { useWorkbook } from '../../context/WorkbookContext';
import { Award, CheckCircle2, ShieldCheck, Star, Sparkles, BookOpen, Clock, Heart, Printer, Download, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { exportElementToPdf } from '../../utils/pdfExport';

interface PartSixProps {
  onJumpToPage: (page: number) => void;
}

// Page 64: Beyond 30 Days: The Sustainable Semester System
export const Page64Beyond30Days: React.FC = () => {
  return (
    <PageContainer
      pageNumber={64}
      partTitle="PART SIX — KEEP GOING"
      category="Strategy"
      title="The Sustainable Semester System"
      subtitle="How to protect your habits through midterms, finals & break"
    >
      <div className="flex-1 flex flex-col justify-between space-y-4 text-xs text-gray-700 leading-relaxed">
        <p>
          You didn't do this 30-day challenge just to rebound back to exhaustion, energy drinks, and erratic sleep. Health is not a 30-day punishment; it is the engine that powers your academic degree and future career.
        </p>

        <div className="space-y-3">
          <div className="p-3.5 bg-white border border-[#E5E7EB] rounded-xl space-y-1">
            <span className="text-[10px] font-bold text-[#38B66B] uppercase">Principle 1</span>
            <h4 className="font-bold text-[#14213D] text-xs">Shift Between "Build" and "Maintain" Phases</h4>
            <p className="text-gray-600 text-[11px]">
              During light academic weeks, you can be in <strong>Build Mode</strong> (pushing reps, experimenting with new recipes). During high-stress midterm or exam weeks, shift immediately into <strong>Maintain Mode</strong> (hitting the 10-minute floor, protecting sleep).
            </p>
          </div>

          <div className="p-3.5 bg-white border border-[#E5E7EB] rounded-xl space-y-1">
            <span className="text-[10px] font-bold text-[#38B66B] uppercase">Principle 2</span>
            <h4 className="font-bold text-[#14213D] text-xs">Keep Your Identity Anchored</h4>
            <p className="text-gray-600 text-[11px]">
              You are no longer "someone trying to get fit." You are a student who values their brain, moves their body daily, fuels with quality protein, and sleeps with respect.
            </p>
          </div>

          <div className="p-3.5 bg-white border border-[#E5E7EB] rounded-xl space-y-1">
            <span className="text-[10px] font-bold text-[#38B66B] uppercase">Principle 3</span>
            <h4 className="font-bold text-[#14213D] text-xs">The Sunday 10-Minute Reset Ritual</h4>
            <p className="text-gray-600 text-[11px]">
              Every Sunday night, take 10 minutes to review your class calendar, schedule your 3 movement slots, and write your grocery list. A calm week begins on Sunday evening.
            </p>
          </div>
        </div>

        <div className="p-3 bg-[#14213D] text-white rounded-xl text-center">
          <p className="text-xs font-semibold text-[#F4C95D]">
            Fitness is not what you do in an emergency; it's who you are every day.
          </p>
        </div>
      </div>
    </PageContainer>
  );
};

// Page 65: Post-30-Day Reflection (Visual Element #22)
export const Page65PostReflection: React.FC = () => {
  const { state, updatePostReflection } = useWorkbook();
  const ref = state.postReflection;

  return (
    <PageContainer
      pageNumber={65}
      partTitle="PART SIX — KEEP GOING"
      category="Reflection"
      title="Post-30-Day Reflection"
      subtitle="Assessing transformation, physical energy & mindset shift (Visual Element #22)"
      badge="Visual Element #22"
    >
      <div className="flex-1 flex flex-col justify-between space-y-3.5 text-xs text-gray-700">
        <div className="flex items-center justify-between p-3 bg-white border border-[#E5E7EB] rounded-xl">
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase block">Overall Transformation Score:</span>
            <span className="font-extrabold text-sm text-[#14213D]">Rate your 30-day experience</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="1"
              max="10"
              value={ref.transformationRating || 9}
              onChange={(e) => updatePostReflection({ transformationRating: Number(e.target.value) })}
              className="accent-[#38B66B] cursor-pointer"
            />
            <span className="font-extrabold text-base text-[#38B66B] w-8 text-center">{ref.transformationRating || 9}/10</span>
          </div>
        </div>

        <div className="space-y-2.5">
          <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl">
            <label className="block text-[11px] font-bold text-[#14213D] uppercase mb-1">
              1. What is the single biggest habit shift you made over these 30 days?
            </label>
            <input
              type="text"
              placeholder="e.g. Walking 8,000 steps across campus daily and stopping caffeine by 2 PM..."
              value={ref.biggestHabitShift}
              onChange={(e) => updatePostReflection({ biggestHabitShift: e.target.value })}
              className="w-full bg-[#F7F8F3] border border-[#E5E7EB] rounded-lg px-2.5 py-1.5 text-xs text-[#14213D] focus:border-[#38B66B] focus:outline-none"
            />
          </div>

          <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl">
            <label className="block text-[11px] font-bold text-[#14213D] uppercase mb-1">
              2. What physical changes did you notice (strength, endurance, body feel)?
            </label>
            <input
              type="text"
              placeholder="e.g. Can do 15 strict pushups, don't get winded taking stairs, posture feels upright..."
              value={ref.physicalChanges}
              onChange={(e) => updatePostReflection({ physicalChanges: e.target.value })}
              className="w-full bg-[#F7F8F3] border border-[#E5E7EB] rounded-lg px-2.5 py-1.5 text-xs text-[#14213D] focus:border-[#38B66B] focus:outline-none"
            />
          </div>

          <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl">
            <label className="block text-[11px] font-bold text-[#14213D] uppercase mb-1">
              3. How did your study focus, mental clarity, and lecture stamina improve?
            </label>
            <input
              type="text"
              placeholder="e.g. No afternoon brain fog in 2-hour labs, sleeping deeply throughout the night..."
              value={ref.mentalFocusChanges}
              onChange={(e) => updatePostReflection({ mentalFocusChanges: e.target.value })}
              className="w-full bg-[#F7F8F3] border border-[#E5E7EB] rounded-lg px-2.5 py-1.5 text-xs text-[#14213D] focus:border-[#38B66B] focus:outline-none"
            />
          </div>

          <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl">
            <label className="block text-[11px] font-bold text-[#14213D] uppercase mb-1">
              4. One piece of advice you would tell yourself on Day 1:
            </label>
            <input
              type="text"
              placeholder="e.g. Don't stress about being perfect; just show up for the 10-minute floor..."
              value={ref.adviceToSelf}
              onChange={(e) => updatePostReflection({ adviceToSelf: e.target.value })}
              className="w-full bg-[#F7F8F3] border border-[#E5E7EB] rounded-lg px-2.5 py-1.5 text-xs text-[#14213D] focus:border-[#38B66B] focus:outline-none"
            />
          </div>
        </div>

        <div className="p-2.5 bg-[#38B66B]/15 border border-[#38B66B]/30 rounded-xl text-center text-[11px] font-bold text-[#14213D]">
          Reflection Recorded. Be Proud of Your Growth.
        </div>
      </div>
    </PageContainer>
  );
};

// Page 66: Exam Period Survival Guide (Visual Element #23)
export const Page66ExamPeriodGuide: React.FC = () => {
  return (
    <PageContainer
      pageNumber={66}
      partTitle="PART SIX — KEEP GOING"
      category="Survival Guide"
      title="Exam Period Survival Guide"
      subtitle="High performance when academic pressure peaks (Visual Element #23)"
      badge="Visual Element #23"
    >
      <div className="flex-1 flex flex-col justify-between space-y-3 text-xs text-gray-700">
        <p>
          Exam week is when most students surrender all health habits. Follow these 4 emergency protocols to maintain peak cognitive horsepower:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl space-y-1">
            <span className="text-[10px] font-bold text-[#38B66B] uppercase">Protocol 1</span>
            <h4 className="font-bold text-[#14213D] text-xs">The 10-Minute Study Decompression</h4>
            <p className="text-[11px] text-gray-600">Every 90 minutes of library study, stand up. Do 20 air squats and drink a full glass of water. Restores prefrontal cerebral blood flow.</p>
          </div>

          <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl space-y-1">
            <span className="text-[10px] font-bold text-[#38B66B] uppercase">Protocol 2</span>
            <h4 className="font-bold text-[#14213D] text-xs">Brain Food Over Sugar Surges</h4>
            <p className="text-[11px] text-gray-600">Avoid gummy bears and donuts while studying. Keep blueberries, walnuts, hard-boiled eggs, and dark chocolate at your desk for steady cognition.</p>
          </div>

          <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl space-y-1">
            <span className="text-[10px] font-bold text-[#38B66B] uppercase">Protocol 3</span>
            <h4 className="font-bold text-[#14213D] text-xs">The All-Nighter Ban</h4>
            <p className="text-[11px] text-gray-600">Never pull an all-nighter before an exam. Sleeping 4–6 hours consolidates facts in memory. Zero sleep causes test-taking blank-outs.</p>
          </div>

          <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl space-y-1">
            <span className="text-[10px] font-bold text-[#38B66B] uppercase">Protocol 4</span>
            <h4 className="font-bold text-[#14213D] text-xs">Caffeine Tapering on Test Day</h4>
            <p className="text-[11px] text-gray-600">Do not chug 3 Red Bulls right before the exam; the jittery heart rate triggers test anxiety. Have 1 cup of coffee with a balanced meal.</p>
          </div>
        </div>

        <div className="p-3 bg-[#38B66B]/15 border border-[#38B66B]/30 rounded-xl text-center text-[11px] font-semibold text-[#14213D]">
          High grades and vibrant health are not mutually exclusive—they reinforce each other.
        </div>
      </div>
    </PageContainer>
  );
};

// Page 67: Semester Maintenance Plan (Visual Element #24)
export const Page67SemesterMaintenancePlan: React.FC = () => {
  const { state, updateSemesterMaintenance } = useWorkbook();
  const plan = state.semesterPlan;

  return (
    <PageContainer
      pageNumber={67}
      partTitle="PART SIX — KEEP GOING"
      category="Maintenance Plan"
      title="Semester Maintenance Plan"
      subtitle="Locking in your next semester commitment (Visual Element #24)"
      badge="Visual Element #24"
    >
      <div className="flex-1 flex flex-col justify-between space-y-3.5 text-xs text-gray-700">
        <p className="text-gray-600">
          Document your ongoing semester commitment. This is your personal health contract with yourself:
        </p>

        <div className="space-y-3">
          <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl">
            <label className="block text-[11px] font-bold text-[#38B66B] uppercase mb-1">
              My 3 Non-Negotiable Habits Every Single Week:
            </label>
            <input
              type="text"
              placeholder="e.g. 1) 3x dorm/gym sessions, 2) 8k daily steps, 3) 2L water + 2 PM caffeine cutoff"
              value={plan.nonNegotiableHabits}
              onChange={(e) => updateSemesterMaintenance({ nonNegotiableHabits: e.target.value })}
              className="w-full bg-[#F7F8F3] border border-[#E5E7EB] rounded-lg px-2.5 py-1.5 text-xs text-[#14213D] focus:border-[#38B66B] focus:outline-none"
            />
          </div>

          <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl">
            <label className="block text-[11px] font-bold text-[#14213D] uppercase mb-1">
              Weekly Workout Schedule (Slots in Calendar):
            </label>
            <input
              type="text"
              placeholder="e.g. Mon / Wed / Fri at 8:30 AM before lectures"
              value={plan.workoutSchedule}
              onChange={(e) => updateSemesterMaintenance({ workoutSchedule: e.target.value })}
              className="w-full bg-[#F7F8F3] border border-[#E5E7EB] rounded-lg px-2.5 py-1.5 text-xs text-[#14213D] focus:border-[#38B66B] focus:outline-none"
            />
          </div>

          <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl">
            <label className="block text-[11px] font-bold text-[#14213D] uppercase mb-1">
              Top 3 Master Grocery Items Always in Dorm Fridge:
            </label>
            <input
              type="text"
              placeholder="e.g. Eggs, rolled oats, frozen broccoli, tuna cans"
              value={plan.groceryStaples}
              onChange={(e) => updateSemesterMaintenance({ groceryStaples: e.target.value })}
              className="w-full bg-[#F7F8F3] border border-[#E5E7EB] rounded-lg px-2.5 py-1.5 text-xs text-[#14213D] focus:border-[#38B66B] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl">
              <label className="block text-[10px] font-bold text-gray-500 uppercase mb-0.5">Signed by:</label>
              <input
                type="text"
                value={plan.signedBy || state.userProfile.name || 'Student'}
                onChange={(e) => updateSemesterMaintenance({ signedBy: e.target.value })}
                className="w-full font-serif italic text-sm text-[#14213D] border-b border-[#E5E7EB] bg-transparent focus:outline-none py-1"
              />
            </div>

            <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl">
              <label className="block text-[10px] font-bold text-gray-500 uppercase mb-0.5">Commitment Date:</label>
              <input
                type="text"
                value={plan.committedDate || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                onChange={(e) => updateSemesterMaintenance({ committedDate: e.target.value })}
                className="w-full text-xs font-mono text-gray-700 border-b border-[#E5E7EB] bg-transparent focus:outline-none py-1"
              />
            </div>
          </div>
        </div>

        <div className="p-2.5 bg-[#38B66B]/15 border border-[#38B66B]/30 rounded-xl text-center text-[11px] font-bold text-[#14213D]">
          Plan Sealed. You are in control of your semester.
        </div>
      </div>
    </PageContainer>
  );
};

// Page 68: Certificate of Completion (Visual Element #25)
export const Page68CertificateOfCompletion: React.FC = () => {
  const { state } = useWorkbook();
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const studentName = (state as any).userProfile?.name || state.finalCommitment?.studentName || 'Dedicated Student';
  const university = (state as any).userProfile?.university || 'University Life';

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 }
      });
    } catch {
      // ignore
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = async () => {
    try {
      setIsDownloadingPdf(true);
      const pageEl = document.getElementById('page-68') || (document.querySelector('.workbook-page') as HTMLElement);
      if (pageEl) {
        await exportElementToPdf(pageEl, `Fit-Student-Certificate-${studentName.replace(/\s+/g, '-')}.pdf`, false);
        triggerConfetti();
      }
    } catch (err) {
      console.error('Error exporting certificate to PDF:', err);
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  return (
    <PageContainer
      pageNumber={68}
      partTitle="PART SIX — KEEP GOING"
      category="Official Certificate"
      title="Certificate of Completion"
      subtitle="Your verified 30-Day Fit Student Transformation (Visual Element #25)"
      badge="Visual Element #25"
    >
      <div className="flex-1 flex flex-col justify-between items-center py-2 text-center text-xs">
        {/* Certificate Frame */}
        <div className="w-full max-w-xl bg-gradient-to-b from-[#F7F8F3] to-[#FFFFFF] border-4 border-[#14213D] rounded-3xl p-6 sm:p-8 relative shadow-lg space-y-4">
          {/* Inner decorative border */}
          <div className="absolute inset-2 border-2 border-[#F4C95D]/60 rounded-2xl pointer-events-none" />

          {/* Top Badge */}
          <div className="flex justify-center">
            <div className="w-14 h-14 rounded-full bg-[#14213D] border-2 border-[#F4C95D] flex items-center justify-center text-[#F4C95D] shadow-md">
              <Award className="w-8 h-8" />
            </div>
          </div>

          <div>
            <span className="text-[10px] font-bold tracking-widest text-[#38B66B] uppercase block">
              OFFICIAL RECOGNITION OF COMPLETION
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[#14213D] tracking-tight font-serif mt-1">
              THE FIT STUDENT BLUEPRINT
            </h2>
            <p className="text-[11px] text-gray-500 font-medium mt-0.5">
              30-Day Guide to Getting Fit, Building Healthy Habits & Feeling Better at University
            </p>
          </div>

          <div className="py-2 space-y-1">
            <p className="text-[11px] text-gray-600 uppercase tracking-wider">This certifies that</p>
            <h3 className="text-2xl sm:text-3xl font-serif italic font-bold text-[#14213D] border-b-2 border-[#ECEEE7] pb-2 max-w-md mx-auto">
              {studentName}
            </h3>
            <p className="text-xs text-gray-500 mt-1">{university}</p>
          </div>

          <p className="text-[11px] text-gray-700 max-w-md mx-auto leading-relaxed">
            Has successfully executed the four foundational pillars: <strong>Reset, Move, Fuel, and Habits</strong>, establishing an enduring personal operating system for lifelong physical fitness and academic excellence.
          </p>

          <div className="flex justify-between items-end pt-4 max-w-md mx-auto border-t border-[#ECEEE7] text-[10px] text-gray-500">
            <div className="text-left">
              <p className="font-mono text-[#14213D] font-bold">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
              <p className="border-t border-gray-300 pt-0.5 mt-0.5">Date of Completion</p>
            </div>

            {/* Seal */}
            <div className="w-12 h-12 rounded-full bg-[#F4C95D]/30 border border-[#F4C95D] flex items-center justify-center text-[#B88716] font-bold text-[9px] uppercase tracking-tighter text-center leading-tight">
              Verified Blueprint
            </div>

            <div className="text-right">
              <p className="font-serif italic text-sm text-[#14213D]">The Fit Student Team</p>
              <p className="border-t border-gray-300 pt-0.5 mt-0.5">Official Program Seal</p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="no-print flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={triggerConfetti}
            className="bg-[#14213D] hover:bg-[#1f315a] text-[#F4C95D] text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow"
          >
            <Sparkles className="w-4 h-4 text-[#F4C95D]" />
            <span>Celebrate 30 Days!</span>
          </button>

          <button
            onClick={handleDownloadPdf}
            disabled={isDownloadingPdf}
            className="bg-[#38B66B] hover:bg-[#2fa35e] disabled:opacity-50 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow"
          >
            {isDownloadingPdf ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            <span>{isDownloadingPdf ? 'Generating PDF...' : 'Download Certificate (PDF)'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 text-xs font-bold px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Printer className="w-4 h-4 text-gray-500" />
            <span>Print</span>
          </button>
        </div>
      </div>
    </PageContainer>
  );
};
