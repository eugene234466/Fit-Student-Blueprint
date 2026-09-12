import React from 'react';
import { PageContainer } from '../PageContainer';
import { useWorkbook } from '../../context/WorkbookContext';
import { AlertCircle, Target, Shield, Clock, CheckCircle2, Award, Zap, HelpCircle, ArrowRight } from 'lucide-react';

interface PartOneProps {
  onJumpToPage: (page: number) => void;
}

// Page 7: Teaching: The University Reality
export const Page7UniversityReality: React.FC = () => {
  return (
    <PageContainer
      pageNumber={7}
      partTitle="PART ONE — RESET"
      category="Teaching"
      title="The University Reality"
      subtitle="Why student fitness breaks down (and why it is not your fault)"
    >
      <div className="flex-1 flex flex-col justify-between space-y-4 text-xs text-gray-700 leading-relaxed">
        <div className="p-4 bg-[#F7F8F3] border-l-4 border-[#14213D] rounded-r-xl">
          <p className="font-semibold text-[#14213D] text-sm mb-1">
            "You cannot apply an elite athlete's schedule to a student's chaotic life."
          </p>
          <p className="text-gray-600">
            Most fitness guides are written for working adults with predictable 9-to-5 schedules, private kitchens, and large grocery budgets. University life is fundamentally different.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="p-3.5 bg-white border border-[#E5E7EB] rounded-xl">
            <h4 className="font-bold text-[#14213D] text-xs uppercase mb-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-400" />
              1. The Schedule Fluctuation Trap
            </h4>
            <p className="text-gray-600">
              One day you have two 9 AM lectures and free afternoons; the next you are in lab until 6 PM with an assignment due at midnight. Rigid routines break under erratic timetables.
            </p>
          </div>

          <div className="p-3.5 bg-white border border-[#E5E7EB] rounded-xl">
            <h4 className="font-bold text-[#14213D] text-xs uppercase mb-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              2. Cognitive Fatigue & Decision Exhaustion
            </h4>
            <p className="text-gray-600">
              After 5 hours of dense lecture notes, reading, and problem sets, your prefrontal cortex is depleted. Complicated meal prep and 90-minute workouts feel impossible.
            </p>
          </div>

          <div className="p-3.5 bg-white border border-[#E5E7EB] rounded-xl">
            <h4 className="font-bold text-[#14213D] text-xs uppercase mb-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              3. The Budget & Kitchen Constraint
            </h4>
            <p className="text-gray-600">
              Sharing a small dorm kitchen with four roommates, a tiny mini-fridge shelf, or living off meal plan credits requires radically low-friction nutritional strategies.
            </p>
          </div>

          <div className="p-3.5 bg-white border border-[#E5E7EB] rounded-xl">
            <h4 className="font-bold text-[#14213D] text-xs uppercase mb-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#38B66B]" />
              4. The Social & Party Pull
            </h4>
            <p className="text-gray-600">
              Student life is meant to be social. Any wellness protocol that forces you to isolate yourself or decline every event is doomed to fail by week two.
            </p>
          </div>
        </div>

        <div className="p-4 bg-[#38B66B]/10 border border-[#38B66B]/30 rounded-xl">
          <h4 className="font-bold text-[#14213D] text-xs uppercase mb-1">
            The Solution: Modular Student Wellness
          </h4>
          <p className="text-gray-700">
            Instead of demanding perfection, we build <strong>low-barrier micro-routines</strong> that fit around your exam deadlines, shared kitchens, and campus layout.
          </p>
        </div>
      </div>
    </PageContainer>
  );
};

// Page 8: Teaching: The All-or-Nothing Fallacy
export const Page8AllOrNothing: React.FC = () => {
  return (
    <PageContainer
      pageNumber={8}
      partTitle="PART ONE — RESET"
      category="Teaching"
      title="The All-or-Nothing Fallacy"
      subtitle="Why 20% beats 0% every single time"
    >
      <div className="flex-1 flex flex-col justify-between space-y-4 text-xs text-gray-700 leading-relaxed">
        <p className="text-gray-700">
          The biggest reason university students abandon fitness isn’t laziness—it is <strong>toxic perfectionism</strong>. We believe that unless we can hit the gym for 75 minutes, eat 100% clean, and sleep 8 hours, the day is "ruined."
        </p>

        {/* Visual Comparison Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-red-50/70 border border-red-200 rounded-xl">
            <div className="flex items-center gap-2 mb-2 text-red-700 font-bold text-xs uppercase">
              <span>✕ The Perfectionist Trap</span>
            </div>
            <ul className="space-y-2 text-[11px] text-gray-700">
              <li>• "I only have 20 minutes today, so there's no point working out."</li>
              <li>• "I ate two slices of pizza, so I might as well binge on junk food tonight."</li>
              <li>• "I stayed up studying until 2 AM, my week is completely derailed."</li>
              <li>• <strong>Result:</strong> Constant cycles of 2 weeks on, 6 weeks completely off.</li>
            </ul>
          </div>

          <div className="p-4 bg-[#38B66B]/10 border border-[#38B66B]/40 rounded-xl">
            <div className="flex items-center gap-2 mb-2 text-[#38B66B] font-bold text-xs uppercase">
              <span>✓ The Fit Student Model</span>
            </div>
            <ul className="space-y-2 text-[11px] text-gray-700">
              <li>• "I only have 15 minutes, so I’ll do a rapid 3-exercise dorm circuit."</li>
              <li>• "I enjoyed pizza with friends, so my next meal will feature protein & water."</li>
              <li>• "Rough night of studying? I will take a 15-minute campus walk to reset."</li>
              <li>• <strong>Result:</strong> Unbroken habit momentum that survives midterm exams.</li>
            </ul>
          </div>
        </div>

        {/* The Math of 20% */}
        <div className="p-4 bg-[#14213D] text-white rounded-xl">
          <h4 className="text-xs font-bold text-[#F4C95D] uppercase tracking-wider mb-1">
            The Math of the Minimum Baseline
          </h4>
          <p className="text-xs text-gray-200">
            A 15-minute dorm bodyweight session done 3 times a week is <strong>45 minutes of training</strong>. Over a 12-week semester, that is <strong>9 solid hours of strength stimulus</strong>. That maintains muscle mass, posture, insulin sensitivity, and mood, compared to zero.
          </p>
        </div>

        <div className="p-3.5 bg-[#F7F8F3] border border-[#E5E7EB] rounded-xl text-center">
          <p className="font-bold text-[#14213D] text-xs">
            "Your ceiling doesn't determine your success—your floor does."
          </p>
          <p className="text-[11px] text-gray-500 mt-0.5">Raise your minimum baseline when life gets crazy.</p>
        </div>
      </div>
    </PageContainer>
  );
};

// Page 9: Day 1 Fitness Assessment (Visual Element #4)
export const Page9Day1Assessment: React.FC = () => {
  const { state, updateAssessment } = useWorkbook();
  const { assessment } = state;

  return (
    <PageContainer
      pageNumber={9}
      partTitle="PART ONE — RESET"
      category="Worksheet"
      title="Day 1 Fitness Assessment"
      subtitle="Establish your honest baseline without judgment (Visual Element #4)"
      badge="Visual Element #4"
    >
      <div className="flex-1 flex flex-col justify-between space-y-3.5 text-xs">
        <div className="p-3 bg-[#F7F8F3] rounded-xl border border-[#E5E7EB] flex items-start gap-2.5">
          <Shield className="w-4 h-4 text-[#38B66B] shrink-0 mt-0.5" />
          <p className="text-[11px] text-gray-600">
            This is not a graded exam. Record your exact starting numbers today so you can celebrate measurable, objective progress when you reach Day 30.
          </p>
        </div>

        {/* Date & Energy Level Slider */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl">
            <label className="block text-[11px] font-bold text-[#14213D] uppercase mb-1">
              Assessment Date:
            </label>
            <input
              type="date"
              value={assessment.day1Date}
              onChange={(e) => updateAssessment({ day1Date: e.target.value })}
              className="w-full bg-[#F7F8F3] border border-[#E5E7EB] rounded-lg px-3 py-1.5 text-xs font-medium text-[#14213D] focus:outline-none focus:border-[#38B66B]"
            />
          </div>

          <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl">
            <div className="flex justify-between items-center mb-1">
              <label className="text-[11px] font-bold text-[#14213D] uppercase">
                Current Daily Energy:
              </label>
              <span className="font-extrabold text-[#38B66B] text-xs">
                {assessment.energyLevel} / 10
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={assessment.energyLevel}
              onChange={(e) => updateAssessment({ energyLevel: Number(e.target.value) })}
              className="w-full accent-[#38B66B] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-400 mt-0.5">
              <span>Constantly Exhausted</span>
              <span>High Sustained Energy</span>
            </div>
          </div>
        </div>

        {/* Physical Baseline Strength Tests */}
        <div className="p-3.5 bg-white border border-[#E5E7EB] rounded-xl space-y-2.5">
          <h4 className="font-bold text-[#14213D] text-xs uppercase tracking-wider flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-[#F4C95D]" />
            Physical Capacity Benchmarks (Test in Dorm or Gym)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div>
              <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                Pushups (Max Quality Reps):
              </label>
              <input
                type="text"
                placeholder="e.g., 8 reps (or on knees)"
                value={assessment.pushupsCount}
                onChange={(e) => updateAssessment({ pushupsCount: e.target.value })}
                className="w-full bg-[#F7F8F3] border border-[#E5E7EB] rounded-lg px-2.5 py-1.5 text-xs text-[#14213D] focus:border-[#38B66B] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                Bodyweight Squats (2 mins):
              </label>
              <input
                type="text"
                placeholder="e.g., 20 clean reps"
                value={assessment.bodyweightSquats}
                onChange={(e) => updateAssessment({ bodyweightSquats: e.target.value })}
                className="w-full bg-[#F7F8F3] border border-[#E5E7EB] rounded-lg px-2.5 py-1.5 text-xs text-[#14213D] focus:border-[#38B66B] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                Forearm Plank Hold:
              </label>
              <input
                type="text"
                placeholder="e.g., 30 seconds"
                value={assessment.plankSeconds}
                onChange={(e) => updateAssessment({ plankSeconds: e.target.value })}
                className="w-full bg-[#F7F8F3] border border-[#E5E7EB] rounded-lg px-2.5 py-1.5 text-xs text-[#14213D] focus:border-[#38B66B] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Qualitative Baseline Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-bold text-[#14213D] uppercase mb-1">
              Estimated Average Steps Per Day:
            </label>
            <input
              type="text"
              placeholder="e.g., ~4,000 steps according to phone"
              value={assessment.dailyStepEstimate}
              onChange={(e) => updateAssessment({ dailyStepEstimate: e.target.value })}
              className="w-full bg-[#F7F8F3] border border-[#E5E7EB] rounded-lg px-3 py-1.5 text-xs text-[#14213D] focus:border-[#38B66B] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#14213D] uppercase mb-1">
              Average Nightly Sleep (Hours & Quality):
            </label>
            <input
              type="text"
              placeholder="e.g., 6 hours, wake up groggy"
              value={assessment.sleepHours}
              onChange={(e) => updateAssessment({ sleepHours: e.target.value })}
              className="w-full bg-[#F7F8F3] border border-[#E5E7EB] rounded-lg px-3 py-1.5 text-xs text-[#14213D] focus:border-[#38B66B] focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-[#14213D] uppercase mb-1">
            Physical Comfort / Posture Notes (Back, Neck, Knees):
          </label>
          <textarea
            rows={2}
            placeholder="e.g., Stiff lower back from sitting at desk in library, tight hips..."
            value={assessment.physicalComfortNotes}
            onChange={(e) => updateAssessment({ physicalComfortNotes: e.target.value })}
            className="w-full bg-[#F7F8F3] border border-[#E5E7EB] rounded-lg p-2.5 text-xs text-[#14213D] focus:border-[#38B66B] focus:outline-none"
          />
        </div>
      </div>
    </PageContainer>
  );
};

// Page 10: Lifestyle & Time Audit
export const Page10LifestyleAudit: React.FC = () => {
  const { state, updateAssessment } = useWorkbook();

  return (
    <PageContainer
      pageNumber={10}
      partTitle="PART ONE — RESET"
      category="Worksheet"
      title="Lifestyle & Time Audit"
      subtitle="Where your 168 weekly hours & mental energy actually go"
    >
      <div className="flex-1 flex flex-col justify-between space-y-3.5 text-xs text-gray-700">
        <p>
          Students often say, <em>"I don't have time to work out or cook."</em> Let's uncover the reality. There are 168 hours in a week. Let’s identify your genuine open pockets.
        </p>

        <div className="p-3.5 bg-white border border-[#E5E7EB] rounded-xl space-y-2">
          <h4 className="font-bold text-[#14213D] text-xs uppercase">Your Approximate Weekly Allocation</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
            <div className="p-2.5 bg-[#F7F8F3] rounded-lg">
              <span className="font-bold text-[#14213D] block text-sm">~20 hrs</span>
              <span className="text-[10px] text-gray-500">Lectures & Labs</span>
            </div>
            <div className="p-2.5 bg-[#F7F8F3] rounded-lg">
              <span className="font-bold text-[#14213D] block text-sm">~25 hrs</span>
              <span className="text-[10px] text-gray-500">Study & Assignments</span>
            </div>
            <div className="p-2.5 bg-[#F7F8F3] rounded-lg">
              <span className="font-bold text-[#14213D] block text-sm">~56 hrs</span>
              <span className="text-[10px] text-gray-500">Target Sleep (8h/day)</span>
            </div>
            <div className="p-2.5 bg-[#38B66B]/15 rounded-lg border border-[#38B66B]/30">
              <span className="font-bold text-[#38B66B] block text-sm">~67 hrs</span>
              <span className="text-[10px] text-gray-600 font-semibold">Remaining Life/Social</span>
            </div>
          </div>
          <p className="text-[11px] text-gray-500 italic text-center pt-1">
            Notice: Even with heavy study, you have 67+ unallocated hours. Fitness only needs <strong>1.5 hours per week</strong>.
          </p>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-[#14213D] uppercase mb-1">
            What is your single biggest obstacle to consistency right now?
          </label>
          <textarea
            rows={3}
            placeholder="e.g., Spending 3 hours late at night scrolling on TikTok or Instagram, or skipping lunch and getting dizzy..."
            value={state.assessment.biggestObstacle}
            onChange={(e) => updateAssessment({ biggestObstacle: e.target.value })}
            className="w-full bg-[#F7F8F3] border border-[#E5E7EB] rounded-lg p-2.5 text-xs text-[#14213D] focus:border-[#38B66B] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-[#14213D] uppercase mb-1">
            Describe your current typical food intake across an average campus day:
          </label>
          <textarea
            rows={3}
            placeholder="e.g., Morning: Coffee on empty stomach. Afternoon: Meal deal sandwich with chips. Dinner: Instant noodles or takeout with roommates..."
            value={state.assessment.mealsQuality}
            onChange={(e) => updateAssessment({ mealsQuality: e.target.value })}
            className="w-full bg-[#F7F8F3] border border-[#E5E7EB] rounded-lg p-2.5 text-xs text-[#14213D] focus:border-[#38B66B] focus:outline-none"
          />
        </div>
      </div>
    </PageContainer>
  );
};

// Page 11: Goal-Setting Worksheet (Visual Element #5)
export const Page11GoalSetting: React.FC = () => {
  const { state, updateGoals } = useWorkbook();
  const { goals } = state;

  return (
    <PageContainer
      pageNumber={11}
      partTitle="PART ONE — RESET"
      category="Worksheet"
      title="Goal-Setting Worksheet"
      subtitle="Defining the 30-Day Triangle: Physical, Habit & Mental (Visual Element #5)"
      badge="Visual Element #5"
    >
      <div className="flex-1 flex flex-col justify-between space-y-3.5 text-xs">
        <div className="p-3 bg-[#F7F8F3] rounded-xl border border-[#E5E7EB]">
          <h4 className="font-bold text-[#14213D] text-xs uppercase mb-1 flex items-center gap-1.5">
            <Target className="w-4 h-4 text-[#38B66B]" />
            The 30-Day Goal Triangle
          </h4>
          <p className="text-[11px] text-gray-600">
            We avoid vague hopes like "get in shape." Instead, set three distinct, concrete outcomes that keep you grounded during busy weeks.
          </p>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-[#14213D] uppercase mb-1">
            1. Your Core "Why" (Why do you care about feeling fitter at university?):
          </label>
          <textarea
            rows={2}
            placeholder="e.g., I want to stop feeling exhausted halfway through lectures, improve my mental clarity for exams, and feel confident in my clothes..."
            value={goals.coreWhy}
            onChange={(e) => updateGoals({ coreWhy: e.target.value })}
            className="w-full bg-[#F7F8F3] border border-[#E5E7EB] rounded-lg p-2 text-xs text-[#14213D] focus:border-[#38B66B] focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl">
            <label className="block text-[11px] font-bold text-[#38B66B] uppercase mb-1">
              2. Physical Capacity Goal:
            </label>
            <textarea
              rows={2}
              placeholder="e.g., Hit 15 full body pushups and walk 8,000 steps daily on class days..."
              value={goals.thirtyDayPhysicalGoal}
              onChange={(e) => updateGoals({ thirtyDayPhysicalGoal: e.target.value })}
              className="w-full bg-[#F7F8F3] border border-[#E5E7EB] rounded-lg p-2 text-xs text-[#14213D] focus:border-[#38B66B] focus:outline-none"
            />
          </div>

          <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl">
            <label className="block text-[11px] font-bold text-[#F4C95D] uppercase mb-1">
              3. Habit & Food Goal:
            </label>
            <textarea
              rows={2}
              placeholder="e.g., Cook 4 simple high-protein dinners per week and carry my water bottle..."
              value={goals.thirtyDayHabitGoal}
              onChange={(e) => updateGoals({ thirtyDayHabitGoal: e.target.value })}
              className="w-full bg-[#F7F8F3] border border-[#E5E7EB] rounded-lg p-2 text-xs text-[#14213D] focus:border-[#38B66B] focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl">
            <label className="block text-[11px] font-bold text-[#14213D] uppercase mb-1">
              4. Exam Period Contingency Strategy:
            </label>
            <textarea
              rows={2}
              placeholder="e.g., During assignment crunch weeks, scale down to 10-minute dorm circuits rather than quitting..."
              value={goals.examPeriodStrategy}
              onChange={(e) => updateGoals({ examPeriodStrategy: e.target.value })}
              className="w-full bg-[#F7F8F3] border border-[#E5E7EB] rounded-lg p-2 text-xs text-[#14213D] focus:border-[#38B66B] focus:outline-none"
            />
          </div>

          <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl">
            <label className="block text-[11px] font-bold text-[#14213D] uppercase mb-1">
              5. Day 30 Reward for Completion:
            </label>
            <textarea
              rows={2}
              placeholder="e.g., A new pair of comfortable walking shoes or a fun day trip with friends..."
              value={goals.rewardForCompletion}
              onChange={(e) => updateGoals({ rewardForCompletion: e.target.value })}
              className="w-full bg-[#F7F8F3] border border-[#E5E7EB] rounded-lg p-2 text-xs text-[#14213D] focus:border-[#38B66B] focus:outline-none"
            />
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

// Page 12: Minimum Commitment Worksheet (Visual Element #6)
export const Page12MinimumCommitment: React.FC = () => {
  const { state, updateMinimumCommitment } = useWorkbook();
  const { minimumCommitment } = state;

  return (
    <PageContainer
      pageNumber={12}
      partTitle="PART ONE — RESET"
      category="Worksheet"
      title="Minimum Commitment Worksheet"
      subtitle="Your non-negotiable 'Bad Day' contract (Visual Element #6)"
      badge="Visual Element #6"
    >
      <div className="flex-1 flex flex-col justify-between space-y-3.5 text-xs text-gray-700">
        <div className="p-3.5 bg-[#14213D] text-white rounded-xl">
          <p className="text-xs font-semibold text-[#F4C95D] uppercase tracking-wider mb-1">
            The Philosophy of the "Bad Day" Protocol
          </p>
          <p className="text-xs text-gray-200 leading-relaxed">
            Anyone can stick to a fitness plan on a sunny Saturday with zero homework. Champions are built on Wednesday night when you have two deadlines, rained-out shoes, and 12% phone battery. Define your bare-minimum floor now.
          </p>
        </div>

        <div className="space-y-2.5">
          <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl">
            <label className="block text-[11px] font-bold text-[#14213D] uppercase mb-1">
              1. My Bad Day Workout (Takes ≤10 minutes, requires 0 equipment):
            </label>
            <input
              type="text"
              value={minimumCommitment.badDayWorkout}
              onChange={(e) => updateMinimumCommitment({ badDayWorkout: e.target.value })}
              className="w-full bg-[#F7F8F3] border border-[#E5E7EB] rounded-lg px-3 py-1.5 text-xs text-[#14213D] focus:border-[#38B66B] focus:outline-none"
            />
            <p className="text-[10px] text-gray-400 mt-1">Example: 20 pushups against desk + 20 squats + 10-minute brisk campus loop.</p>
          </div>

          <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl">
            <label className="block text-[11px] font-bold text-[#14213D] uppercase mb-1">
              2. My Bad Day Meal (Emergency nutritious meal in under 5 minutes):
            </label>
            <input
              type="text"
              value={minimumCommitment.badDayMeal}
              onChange={(e) => updateMinimumCommitment({ badDayMeal: e.target.value })}
              className="w-full bg-[#F7F8F3] border border-[#E5E7EB] rounded-lg px-3 py-1.5 text-xs text-[#14213D] focus:border-[#38B66B] focus:outline-none"
            />
            <p className="text-[10px] text-gray-400 mt-1">Example: 3 scrambled eggs with slice of wholewheat toast or canned tuna & microwave rice.</p>
          </div>

          <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl">
            <label className="block text-[11px] font-bold text-[#14213D] uppercase mb-1">
              3. My Bad Day Sleep Rule (Protecting biological recovery):
            </label>
            <input
              type="text"
              value={minimumCommitment.badDayBedtime}
              onChange={(e) => updateMinimumCommitment({ badDayBedtime: e.target.value })}
              className="w-full bg-[#F7F8F3] border border-[#E5E7EB] rounded-lg px-3 py-1.5 text-xs text-[#14213D] focus:border-[#38B66B] focus:outline-none"
            />
            <p className="text-[10px] text-gray-400 mt-1">Example: Phone plugged in across the dorm room by 11:30 PM, no late doomscrolling.</p>
          </div>
        </div>

        {/* Commitment Sign-off */}
        <div className="p-3.5 bg-[#F7F8F3] border border-[#38B66B]/40 rounded-xl grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-bold text-[#14213D] uppercase mb-1">
              Accountability Partner (Roommate or Friend):
            </label>
            <input
              type="text"
              placeholder="e.g., Alex / Liam"
              value={minimumCommitment.accountabilityPartner}
              onChange={(e) => updateMinimumCommitment({ accountabilityPartner: e.target.value })}
              className="w-full bg-white border border-[#E5E7EB] rounded-lg px-2.5 py-1.5 text-xs text-[#14213D] focus:border-[#38B66B] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-[#14213D] uppercase mb-1">
              Student Signature & Date:
            </label>
            <input
              type="text"
              placeholder="Type your initials or name"
              value={minimumCommitment.signature}
              onChange={(e) => updateMinimumCommitment({ signature: e.target.value })}
              className="w-full bg-white border border-[#E5E7EB] rounded-lg px-2.5 py-1.5 text-xs font-serif italic text-[#14213D] focus:border-[#38B66B] focus:outline-none"
            />
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

// Page 13: Concept: Designing Your Semester Baseline
export const Page13SemesterBaseline: React.FC = () => {
  return (
    <PageContainer
      pageNumber={13}
      partTitle="PART ONE — RESET"
      category="Concept"
      title="Designing Your Semester Baseline"
      subtitle="Integrating workouts into the natural rhythm of campus life"
    >
      <div className="flex-1 flex flex-col justify-between space-y-4 text-xs text-gray-700 leading-relaxed">
        <p>
          The secret to maintaining consistency across 15 weeks of university is <strong>predictable anchors</strong>. When you tether movement to existing events (like the walk to your first lecture), fitness stops feeling like an exhausting extra task.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 bg-white border border-[#E5E7EB] rounded-xl flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#38B66B] block mb-1">
                Phase A: Mon / Wed
              </span>
              <h4 className="font-bold text-[#14213D] text-xs uppercase mb-1.5">Lecture Days</h4>
              <p className="text-gray-600 text-[11px]">
                High mental load. Plan your 15–20 minute dorm workout in the morning before class, or walk briskly across campus between campus buildings.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-[#ECEEE7] text-[10px] font-semibold text-gray-500">
              Intensity: Moderate
            </div>
          </div>

          <div className="p-3.5 bg-white border border-[#E5E7EB] rounded-xl flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#F4C95D] block mb-1">
                Phase B: Tue / Thu
              </span>
              <h4 className="font-bold text-[#14213D] text-xs uppercase mb-1.5">Study & Lab Days</h4>
              <p className="text-gray-600 text-[11px]">
                Long uninterrupted desk hours. Take 5-minute movement snacks every 60 minutes. Hydrate with 1 full water bottle per study session.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-[#ECEEE7] text-[10px] font-semibold text-gray-500">
              Intensity: Active Recovery
            </div>
          </div>

          <div className="p-3.5 bg-white border border-[#E5E7EB] rounded-xl flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#14213D] block mb-1">
                Phase C: Weekend
              </span>
              <h4 className="font-bold text-[#14213D] text-xs uppercase mb-1.5">Reset & Social</h4>
              <p className="text-gray-600 text-[11px]">
                Sunday 45-minute grocery run and simple meal prep. Casual sports with friends or long campus walking loop to reset for the week ahead.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-[#ECEEE7] text-[10px] font-semibold text-gray-500">
              Intensity: Low Stress
            </div>
          </div>
        </div>

        <div className="p-4 bg-[#F7F8F3] border border-[#E5E7EB] rounded-xl">
          <h4 className="font-bold text-[#14213D] text-xs uppercase mb-1">
            The 30-Day Semester Rule:
          </h4>
          <p className="text-gray-600">
            Never schedule a brutal, exhausting workout the morning of an exam or the evening after an all-nighter. Match your physical intensity to your academic stress load.
          </p>
        </div>
      </div>
    </PageContainer>
  );
};

// Page 14: Reflection: Friction Points & Triggers
export const Page14FrictionPoints: React.FC = () => {
  return (
    <PageContainer
      pageNumber={14}
      partTitle="PART ONE — RESET"
      category="Reflection"
      title="Identifying Friction Points & Triggers"
      subtitle="Spotting the hidden traps before they derail your week"
    >
      <div className="flex-1 flex flex-col justify-between space-y-3.5 text-xs text-gray-700">
        <p>
          Habits don’t collapse at random. They collapse at predictable friction points. When you identify the friction ahead of time, you can design an effortless workaround.
        </p>

        <div className="space-y-2.5">
          <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl flex items-start gap-3">
            <div className="w-6 h-6 rounded-md bg-red-100 text-red-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              !
            </div>
            <div>
              <h4 className="font-bold text-[#14213D] text-xs uppercase">Friction 1: Morning Inertia ("I snooze 4 alarms")</h4>
              <p className="text-[11px] text-gray-600 mt-0.5">
                <strong>Solution:</strong> Place your alarm/phone on your study desk across the room. Leave your water bottle and workout shorts on your chair the night before.
              </p>
            </div>
          </div>

          <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl flex items-start gap-3">
            <div className="w-6 h-6 rounded-md bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              !
            </div>
            <div>
              <h4 className="font-bold text-[#14213D] text-xs uppercase">Friction 2: Library Starvation ("I get ravenous at 4 PM")</h4>
              <p className="text-[11px] text-gray-600 mt-0.5">
                <strong>Solution:</strong> Never walk into the library without an apple, protein bar, or bag of roasted peanuts in your backpack. Prevent vending machine binges.
              </p>
            </div>
          </div>

          <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl flex items-start gap-3">
            <div className="w-6 h-6 rounded-md bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              !
            </div>
            <div>
              <h4 className="font-bold text-[#14213D] text-xs uppercase">Friction 3: Crowded Campus Gym ("There's a 20-min wait for benches")</h4>
              <p className="text-[11px] text-gray-600 mt-0.5">
                <strong>Solution:</strong> Use our Dorm Strength Routine (Part Two) or go during off-peak hours (7:30 AM or 1:30 PM between classes).
              </p>
            </div>
          </div>
        </div>

        <div className="p-3.5 bg-[#F7F8F3] border border-[#ECEEE7] rounded-xl">
          <p className="text-[11px] font-semibold text-[#14213D]">
            Prompt: What is your personal biggest trigger for skipping a planned workout?
          </p>
          <input
            type="text"
            placeholder="Write your trigger here (e.g. feeling tired after 4 PM class)..."
            className="w-full mt-1.5 bg-white border border-[#E5E7EB] rounded-lg px-3 py-1.5 text-xs text-[#14213D] focus:border-[#38B66B] focus:outline-none"
          />
        </div>
      </div>
    </PageContainer>
  );
};

// Page 15: Checklist: Part One Readiness Checklist
export const Page15PartOneChecklist: React.FC<PartOneProps> = ({ onJumpToPage }) => {
  const { state, togglePageCompleted } = useWorkbook();
  const [items, setItems] = React.useState<{ [key: string]: boolean }>({
    assessmentDone: !!state.assessment.pushupsCount,
    auditDone: !!state.assessment.biggestObstacle,
    goalsDone: !!state.goals.thirtyDayPhysicalGoal,
    minimumDone: !!state.minimumCommitment.signature,
    mindsetReset: true,
  });

  const toggle = (k: string) => {
    setItems(prev => ({ ...prev, [k]: !prev[k] }));
  };

  const allReady = Object.values(items).every(Boolean);

  return (
    <PageContainer
      pageNumber={15}
      partTitle="PART ONE — RESET"
      category="Checklist"
      title="Part One Readiness Checklist"
      subtitle="What to do next before beginning Part Two"
    >
      <div className="flex-1 flex flex-col justify-between space-y-4 text-xs">
        <div className="p-3.5 bg-[#38B66B]/15 border border-[#38B66B]/30 rounded-xl">
          <h4 className="font-bold text-[#14213D] text-xs uppercase mb-1">
            You Have Completed the Reset Phase!
          </h4>
          <p className="text-gray-700 text-[11px]">
            You have audited your starting baseline, unmasked perfectionism, and signed your minimum commitment. Confirm each milestone below:
          </p>
        </div>

        <div className="space-y-2.5">
          <label className="flex items-center gap-3 p-3 bg-white border border-[#E5E7EB] rounded-xl cursor-pointer hover:border-[#38B66B] transition-colors">
            <input
              type="checkbox"
              checked={items.assessmentDone}
              onChange={() => toggle('assessmentDone')}
              className="w-4 h-4 rounded text-[#38B66B] accent-[#38B66B]"
            />
            <span className="font-medium text-gray-700">Completed the Day 1 Fitness Assessment (Page 9)</span>
          </label>

          <label className="flex items-center gap-3 p-3 bg-white border border-[#E5E7EB] rounded-xl cursor-pointer hover:border-[#38B66B] transition-colors">
            <input
              type="checkbox"
              checked={items.auditDone}
              onChange={() => toggle('auditDone')}
              className="w-4 h-4 rounded text-[#38B66B] accent-[#38B66B]"
            />
            <span className="font-medium text-gray-700">Identified my primary obstacles & schedule traps (Page 10)</span>
          </label>

          <label className="flex items-center gap-3 p-3 bg-white border border-[#E5E7EB] rounded-xl cursor-pointer hover:border-[#38B66B] transition-colors">
            <input
              type="checkbox"
              checked={items.goalsDone}
              onChange={() => toggle('goalsDone')}
              className="w-4 h-4 rounded text-[#38B66B] accent-[#38B66B]"
            />
            <span className="font-medium text-gray-700">Defined my 30-Day Goal Triangle & Exam Contingency (Page 11)</span>
          </label>

          <label className="flex items-center gap-3 p-3 bg-white border border-[#E5E7EB] rounded-xl cursor-pointer hover:border-[#38B66B] transition-colors">
            <input
              type="checkbox"
              checked={items.minimumDone}
              onChange={() => toggle('minimumDone')}
              className="w-4 h-4 rounded text-[#38B66B] accent-[#38B66B]"
            />
            <span className="font-medium text-gray-700">Signed my Minimum "Bad Day" Commitment Contract (Page 12)</span>
          </label>

          <label className="flex items-center gap-3 p-3 bg-white border border-[#E5E7EB] rounded-xl cursor-pointer hover:border-[#38B66B] transition-colors">
            <input
              type="checkbox"
              checked={items.mindsetReset}
              onChange={() => toggle('mindsetReset')}
              className="w-4 h-4 rounded text-[#38B66B] accent-[#38B66B]"
            />
            <span className="font-medium text-gray-700">Rejected the All-or-Nothing trap: 20% effort always beats zero</span>
          </label>
        </div>

        {/* Action Callout */}
        <div className="p-4 bg-[#14213D] text-white rounded-xl flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold text-[#F4C95D] uppercase">What to do next:</h4>
            <p className="text-xs text-gray-200">Unlock Part Two: The Movement Hierarchy & Dorm Workouts.</p>
          </div>
          <button
            onClick={() => onJumpToPage(16)}
            className="no-print bg-[#38B66B] hover:bg-[#2fa35e] text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <span>Enter Part Two</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </PageContainer>
  );
};
