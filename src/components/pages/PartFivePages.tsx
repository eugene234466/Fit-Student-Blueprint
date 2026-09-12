import React, { useState } from 'react';
import { PageContainer } from '../PageContainer';
import { useWorkbook } from '../../context/WorkbookContext';
import { ChallengeDayRecord } from '../../types';
import { Calendar, CheckCircle2, Award, Flame, Apple, Moon, Star, ArrowRight, Zap, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PartFiveProps {
  onJumpToPage: (page: number) => void;
}

// Page 52: Challenge Architecture & 3 Golden Rules
export const Page52ChallengeRules: React.FC = () => {
  return (
    <PageContainer
      pageNumber={52}
      partTitle="PART FIVE — THE 30-DAY CHALLENGE"
      category="Architecture"
      title="Challenge Architecture & The 3 Rules"
      subtitle="How to win the next 30 days without burnout"
    >
      <div className="flex-1 flex flex-col justify-between space-y-4 text-xs text-gray-700 leading-relaxed">
        <p>
          Welcome to the execution arena. This is not a theoretical workout log; it is your active 30-day operating system. The challenge is structured into 4 themed weekly sprints:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
          <div className="p-3 bg-[#38B66B]/15 border border-[#38B66B]/40 rounded-xl">
            <span className="text-[10px] font-bold text-[#38B66B] uppercase block">Week 1</span>
            <span className="font-extrabold text-[#14213D] text-xs block mt-1">Movement Anchor</span>
            <span className="text-[10px] text-gray-600 block mt-0.5">3 workouts + 7k steps</span>
          </div>

          <div className="p-3 bg-[#F4C95D]/25 border border-[#F4C95D]/50 rounded-xl">
            <span className="text-[10px] font-bold text-[#B88716] uppercase block">Week 2</span>
            <span className="font-extrabold text-[#14213D] text-xs block mt-1">Fuel Foundations</span>
            <span className="text-[10px] text-gray-600 block mt-0.5">Protein + 2L water</span>
          </div>

          <div className="p-3 bg-[#14213D]/10 border border-[#14213D]/30 rounded-xl">
            <span className="text-[10px] font-bold text-[#14213D] uppercase block">Week 3</span>
            <span className="font-extrabold text-[#14213D] text-xs block mt-1">Sleep & Energy</span>
            <span className="text-[10px] text-gray-600 block mt-0.5">2 PM caffeine curfew</span>
          </div>

          <div className="p-3 bg-[#38B66B]/25 border border-[#38B66B]/60 rounded-xl">
            <span className="text-[10px] font-bold text-[#38B66B] uppercase block">Week 4</span>
            <span className="font-extrabold text-[#14213D] text-xs block mt-1">Lockdown & Finish</span>
            <span className="text-[10px] text-gray-600 block mt-0.5">Streak protection</span>
          </div>
        </div>

        <div className="space-y-2.5">
          <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-[#38B66B] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">1</span>
            <div>
              <h4 className="font-bold text-[#14213D] text-xs uppercase">Rule 1: Log Daily (30 Seconds)</h4>
              <p className="text-[11px] text-gray-600">Open your workbook every evening and check off your day. Tracking creates conscious accountability.</p>
            </div>
          </div>

          <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-[#14213D] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</span>
            <div>
              <h4 className="font-bold text-[#14213D] text-xs uppercase">Rule 2: Execute Your "Bad Day" Floor</h4>
              <p className="text-[11px] text-gray-600">When homework swamps you, do your 10-minute fallback routine instead of recording a blank day.</p>
            </div>
          </div>

          <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-[#F4C95D] text-[#14213D] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">3</span>
            <div>
              <h4 className="font-bold text-[#14213D] text-xs uppercase">Rule 3: Never Miss Twice</h4>
              <p className="text-[11px] text-gray-600">If you miss a day, acknowledge it cleanly and reset immediately the next morning. No drama.</p>
            </div>
          </div>
        </div>

        <div className="p-3 bg-[#14213D] text-white rounded-xl text-center">
          <p className="text-xs font-semibold text-[#F4C95D]">
            30 Days. 1 Month. A Lifetime of Habit Confidence.
          </p>
        </div>
      </div>
    </PageContainer>
  );
};

// Page 53: 30-Day Challenge Calendar (Visual Element #19)
export const Page53ChallengeCalendar: React.FC = () => {
  const { state, updateChallengeDay } = useWorkbook();
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const currentDayData = state.challengeDays[selectedDay] || {
    day: selectedDay,
    completed: false,
    workoutDone: false,
    fuelDone: false,
    recoveryDone: false,
    energyRating: 3,
    note: '',
  };

  const completedCount = (Object.values(state.challengeDays) as ChallengeDayRecord[]).filter(d => d.completed || (d.workoutDone && d.fuelDone)).length;

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  const handleTogglePillar = (pillar: 'workoutDone' | 'fuelDone' | 'recoveryDone') => {
    const nextVal = !currentDayData[pillar];
    const willBeCompleted = (pillar === 'workoutDone' ? nextVal : currentDayData.workoutDone) &&
                            (pillar === 'fuelDone' ? nextVal : currentDayData.fuelDone) &&
                            (pillar === 'recoveryDone' ? nextVal : currentDayData.recoveryDone);
    
    updateChallengeDay(selectedDay, {
      [pillar]: nextVal,
      completed: willBeCompleted,
    });

    if (willBeCompleted) {
      triggerCelebration();
    }
  };

  return (
    <PageContainer
      pageNumber={53}
      partTitle="PART FIVE — THE 30-DAY CHALLENGE"
      category="Interactive Tracker"
      title="30-Day Challenge Calendar"
      subtitle="Click any day to log Move, Fuel & Recovery habits (Visual Element #19)"
      badge="Visual Element #19"
    >
      <div className="flex-1 flex flex-col justify-between space-y-3 text-xs">
        {/* Progress header */}
        <div className="flex items-center justify-between p-3 bg-[#14213D] text-white rounded-xl">
          <div>
            <span className="text-[10px] font-bold text-[#F4C95D] uppercase tracking-wider block">30-Day Blueprint Progress:</span>
            <span className="font-extrabold text-sm">{completedCount} of 30 Days Logged</span>
          </div>
          <div className="w-36 bg-white/20 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-[#38B66B] h-full transition-all duration-300 rounded-full"
              style={{ width: `${Math.round((completedCount / 30) * 100)}%` }}
            />
          </div>
        </div>

        {/* 30-Day Grid */}
        <div className="p-3 bg-[#F7F8F3] border border-[#E5E7EB] rounded-xl">
          <div className="grid grid-cols-6 sm:grid-cols-10 gap-1.5">
            {Array.from({ length: 30 }, (_, i) => i + 1).map((dayNum) => {
              const day = state.challengeDays[dayNum] || { completed: false, workoutDone: false, fuelDone: false, recoveryDone: false };
              const isSelected = selectedDay === dayNum;
              const isFullyDone = day.completed || (day.workoutDone && day.fuelDone && day.recoveryDone);
              const isPartial = day.workoutDone || day.fuelDone || day.recoveryDone;

              return (
                <button
                  key={dayNum}
                  onClick={() => setSelectedDay(dayNum)}
                  className={`aspect-square rounded-lg font-bold text-xs flex flex-col items-center justify-center transition-all relative ${
                    isSelected
                      ? 'ring-2 ring-[#14213D] shadow-md'
                      : ''
                  } ${
                    isFullyDone
                      ? 'bg-[#38B66B] text-white'
                      : isPartial
                      ? 'bg-[#F4C95D] text-[#14213D]'
                      : 'bg-white border border-[#E5E7EB] text-gray-600 hover:border-[#38B66B]'
                  }`}
                >
                  <span className="text-[11px]">D{dayNum}</span>
                  {isFullyDone && <span className="text-[9px] leading-none">✓</span>}
                </button>
              );
            })}
          </div>
          <div className="flex items-center justify-center gap-4 text-[10px] text-gray-500 mt-2.5">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-white border border-gray-300 inline-block" /> Unlogged</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-[#F4C95D] inline-block" /> Partial</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-[#38B66B] inline-block" /> Complete</span>
          </div>
        </div>

        {/* Active Selected Day Editor Panel */}
        <div className="p-3.5 bg-white border border-[#E5E7EB] rounded-xl space-y-2.5">
          <div className="flex items-center justify-between border-b border-[#ECEEE7] pb-2">
            <h4 className="font-extrabold text-[#14213D] text-xs uppercase flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#38B66B]" />
              Logging Details for Day {selectedDay}
            </h4>
            <span className="text-[11px] text-gray-400">
              Week {Math.ceil(selectedDay / 7)} of 4
            </span>
          </div>

          {/* 3 Pillars Checkboxes */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button
              onClick={() => handleTogglePillar('workoutDone')}
              className={`p-2 rounded-lg border text-left flex items-center justify-between transition-all ${
                currentDayData.workoutDone
                  ? 'bg-[#38B66B]/15 border-[#38B66B] text-[#14213D]'
                  : 'bg-[#F7F8F3] border-[#E5E7EB] text-gray-500'
              }`}
            >
              <div className="flex items-center gap-2">
                <Flame className={`w-4 h-4 ${currentDayData.workoutDone ? 'text-[#38B66B]' : 'text-gray-400'}`} />
                <span className="font-bold text-[11px]">1. MOVE</span>
              </div>
              <span className="text-xs">{currentDayData.workoutDone ? '✓' : '+'}</span>
            </button>

            <button
              onClick={() => handleTogglePillar('fuelDone')}
              className={`p-2 rounded-lg border text-left flex items-center justify-between transition-all ${
                currentDayData.fuelDone
                  ? 'bg-[#F4C95D]/25 border-[#B88716] text-[#14213D]'
                  : 'bg-[#F7F8F3] border-[#E5E7EB] text-gray-500'
              }`}
            >
              <div className="flex items-center gap-2">
                <Apple className={`w-4 h-4 ${currentDayData.fuelDone ? 'text-[#B88716]' : 'text-gray-400'}`} />
                <span className="font-bold text-[11px]">2. FUEL</span>
              </div>
              <span className="text-xs">{currentDayData.fuelDone ? '✓' : '+'}</span>
            </button>

            <button
              onClick={() => handleTogglePillar('recoveryDone')}
              className={`p-2 rounded-lg border text-left flex items-center justify-between transition-all ${
                currentDayData.recoveryDone
                  ? 'bg-[#14213D]/15 border-[#14213D] text-[#14213D]'
                  : 'bg-[#F7F8F3] border-[#E5E7EB] text-gray-500'
              }`}
            >
              <div className="flex items-center gap-2">
                <Moon className={`w-4 h-4 ${currentDayData.recoveryDone ? 'text-[#14213D]' : 'text-gray-400'}`} />
                <span className="font-bold text-[11px]">3. RECOVER</span>
              </div>
              <span className="text-xs">{currentDayData.recoveryDone ? '✓' : '+'}</span>
            </button>
          </div>

          {/* Energy Rating & Quick Note */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            <div className="flex items-center justify-between bg-[#F7F8F3] px-3 py-1.5 rounded-lg border border-[#E5E7EB]">
              <span className="text-[10px] font-bold text-gray-600 uppercase">Day Energy:</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => updateChallengeDay(selectedDay, { energyRating: star })}
                    className="p-0.5"
                  >
                    <Star
                      className={`w-3.5 h-3.5 ${
                        star <= (currentDayData.energyRating || 3)
                          ? 'text-[#F4C95D] fill-[#F4C95D]'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <input
              type="text"
              placeholder="Day note (e.g. Felt great during 20m dorm workout!)"
              value={currentDayData.note || ''}
              onChange={(e) => updateChallengeDay(selectedDay, { note: e.target.value })}
              className="bg-[#F7F8F3] border border-[#E5E7EB] rounded-lg px-2.5 py-1 text-xs text-[#14213D] focus:border-[#38B66B] focus:outline-none"
            />
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

// Page 54: Week 1: The Movement Anchor
export const Page54WeekOneChallenge: React.FC = () => {
  return (
    <PageContainer
      pageNumber={54}
      partTitle="PART FIVE — THE 30-DAY CHALLENGE"
      category="Challenge Sprint"
      title="Week 1: The Movement Anchor"
      subtitle="Days 1–7: Establishing consistency before complexity"
    >
      <div className="flex-1 flex flex-col justify-between space-y-4 text-xs text-gray-700 leading-relaxed">
        <div className="p-3.5 bg-[#38B66B]/15 border border-[#38B66B]/40 rounded-xl">
          <h4 className="font-bold text-[#14213D] text-xs uppercase mb-1">
            Week 1 Mission: Break Physical Inertia
          </h4>
          <p className="text-[11px] text-gray-700">
            Do not worry about changing your entire diet this week. Your sole objective for Days 1 through 7 is <strong>locking in movement</strong>.
          </p>
        </div>

        <div className="space-y-3">
          <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl space-y-1">
            <span className="text-[10px] font-bold text-[#38B66B] uppercase">Target 1</span>
            <h4 className="font-bold text-[#14213D] text-xs">Complete 3x 15-Minute Sessions</h4>
            <p className="text-[11px] text-gray-600">Execute the Dorm Strength Routine (Page 20) on Monday, Wednesday, and Friday. Just 15 minutes each.</p>
          </div>

          <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl space-y-1">
            <span className="text-[10px] font-bold text-[#38B66B] uppercase">Target 2</span>
            <h4 className="font-bold text-[#14213D] text-xs">Hit 7,000 Daily Campus Steps</h4>
            <p className="text-[11px] text-gray-600">Take the stairs instead of the elevator. Walk a 10-minute morning loop before your first lecture.</p>
          </div>

          <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl space-y-1">
            <span className="text-[10px] font-bold text-[#38B66B] uppercase">Target 3</span>
            <h4 className="font-bold text-[#14213D] text-xs">Morning Hydration Anchor</h4>
            <p className="text-[11px] text-gray-600">Drink 500ml of water before touching morning coffee or social media.</p>
          </div>
        </div>

        <div className="p-3 bg-[#F7F8F3] border border-[#ECEEE7] rounded-xl text-center text-gray-500 text-[11px]">
          Remember: A bad 10-minute workout is infinitely better than the "perfect" workout you postponed.
        </div>
      </div>
    </PageContainer>
  );
};

// Reusable Weekly Scorecard Component (Visual Element #21)
export const WeeklyScorecardPage: React.FC<{
  pageNumber: number;
  weekNumber: number;
  title: string;
  subtitle: string;
}> = ({ pageNumber, weekNumber, title, subtitle }) => {
  const { state, updateWeeklyScorecard } = useWorkbook();
  const card = state.weeklyScorecards[weekNumber] || {
    weekNumber,
    workoutsCompleted: 0,
    targetWorkouts: 3,
    mealsCooked: 0,
    targetMeals: 5,
    avgSleepHours: 7,
    energyRating: 7,
    biggestWin: '',
    biggestChallenge: '',
    adjustmentForNextWeek: '',
  };

  return (
    <PageContainer
      pageNumber={pageNumber}
      partTitle="PART FIVE — THE 30-DAY CHALLENGE"
      category="Scorecard"
      title={title}
      subtitle={`${subtitle} (Visual Element #21)`}
      badge={`Scorecard W${weekNumber}`}
    >
      <div className="flex-1 flex flex-col justify-between space-y-3 text-xs text-gray-700">
        <p className="text-[11px] text-gray-600">
          Sunday Review: Score your consistency honestly, celebrate your wins, and calibrate for the upcoming week.
        </p>

        {/* 4 Metric Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
          <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl">
            <span className="text-[10px] font-bold text-gray-500 uppercase block">Workouts Done</span>
            <input
              type="number"
              min="0"
              max="7"
              value={card.workoutsCompleted}
              onChange={(e) => updateWeeklyScorecard(weekNumber, { workoutsCompleted: Number(e.target.value) })}
              className="w-16 mx-auto text-center font-extrabold text-base text-[#14213D] border border-[#E5E7EB] rounded my-1 bg-[#F7F8F3]"
            />
            <span className="text-[10px] text-gray-400 block">Target: {card.targetWorkouts}</span>
          </div>

          <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl">
            <span className="text-[10px] font-bold text-gray-500 uppercase block">Meals Cooked</span>
            <input
              type="number"
              min="0"
              max="14"
              value={card.mealsCooked}
              onChange={(e) => updateWeeklyScorecard(weekNumber, { mealsCooked: Number(e.target.value) })}
              className="w-16 mx-auto text-center font-extrabold text-base text-[#14213D] border border-[#E5E7EB] rounded my-1 bg-[#F7F8F3]"
            />
            <span className="text-[10px] text-gray-400 block">Target: {card.targetMeals}</span>
          </div>

          <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl">
            <span className="text-[10px] font-bold text-gray-500 uppercase block">Avg Sleep (hrs)</span>
            <input
              type="number"
              step="0.5"
              min="4"
              max="10"
              value={card.avgSleepHours}
              onChange={(e) => updateWeeklyScorecard(weekNumber, { avgSleepHours: Number(e.target.value) })}
              className="w-16 mx-auto text-center font-extrabold text-base text-[#14213D] border border-[#E5E7EB] rounded my-1 bg-[#F7F8F3]"
            />
            <span className="text-[10px] text-gray-400 block">Goal: 7.5+ hrs</span>
          </div>

          <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl">
            <span className="text-[10px] font-bold text-gray-500 uppercase block">Energy (1–10)</span>
            <input
              type="number"
              min="1"
              max="10"
              value={card.energyRating}
              onChange={(e) => updateWeeklyScorecard(weekNumber, { energyRating: Number(e.target.value) })}
              className="w-16 mx-auto text-center font-extrabold text-base text-[#38B66B] border border-[#E5E7EB] rounded my-1 bg-[#F7F8F3]"
            />
            <span className="text-[10px] text-gray-400 block">Rating</span>
          </div>
        </div>

        {/* Qualitative Questions */}
        <div className="space-y-2">
          <div>
            <label className="block text-[11px] font-bold text-[#38B66B] uppercase mb-0.5">
              1. My Biggest Win this Week:
            </label>
            <input
              type="text"
              placeholder="e.g., Hit 8,500 steps 4 days in a row and finished 3 full dorm circuits..."
              value={card.biggestWin}
              onChange={(e) => updateWeeklyScorecard(weekNumber, { biggestWin: e.target.value })}
              className="w-full bg-[#F7F8F3] border border-[#E5E7EB] rounded-lg px-2.5 py-1.5 text-xs text-[#14213D] focus:border-[#38B66B] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#B88716] uppercase mb-0.5">
              2. Biggest Challenge Encountered:
            </label>
            <input
              type="text"
              placeholder="e.g., Stayed up late studying on Wednesday, felt groggy on Thursday..."
              value={card.biggestChallenge}
              onChange={(e) => updateWeeklyScorecard(weekNumber, { biggestChallenge: e.target.value })}
              className="w-full bg-[#F7F8F3] border border-[#E5E7EB] rounded-lg px-2.5 py-1.5 text-xs text-[#14213D] focus:border-[#38B66B] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#14213D] uppercase mb-0.5">
              3. Single Adjustment for Next Week:
            </label>
            <input
              type="text"
              placeholder="e.g., Pack an apple and water bottle before leaving for morning classes..."
              value={card.adjustmentForNextWeek}
              onChange={(e) => updateWeeklyScorecard(weekNumber, { adjustmentForNextWeek: e.target.value })}
              className="w-full bg-[#F7F8F3] border border-[#E5E7EB] rounded-lg px-2.5 py-1.5 text-xs text-[#14213D] focus:border-[#38B66B] focus:outline-none"
            />
          </div>
        </div>

        <div className="p-2.5 bg-[#38B66B]/15 border border-[#38B66B]/30 rounded-xl text-center text-[11px] font-bold text-[#14213D]">
          Scorecard Saved. Keep Building!
        </div>
      </div>
    </PageContainer>
  );
};

// Page 56: Week 2: Fuel Foundations
export const Page56WeekTwoChallenge: React.FC = () => {
  return (
    <PageContainer
      pageNumber={56}
      partTitle="PART FIVE — THE 30-DAY CHALLENGE"
      category="Challenge Sprint"
      title="Week 2: Fuel Foundations"
      subtitle="Days 8–14: Stabilizing blood sugar & student energy"
    >
      <div className="flex-1 flex flex-col justify-between space-y-4 text-xs text-gray-700 leading-relaxed">
        <div className="p-3.5 bg-[#F4C95D]/25 border border-[#F4C95D]/50 rounded-xl">
          <h4 className="font-bold text-[#14213D] text-xs uppercase mb-1">
            Week 2 Mission: Clean Up Campus Nutrition
          </h4>
          <p className="text-[11px] text-gray-700">
            Keep your Week 1 movement alive. Now layer on the Student Meal Formula: Protein + Fiber + Water.
          </p>
        </div>

        <div className="space-y-3">
          <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl space-y-1">
            <span className="text-[10px] font-bold text-[#B88716] uppercase">Target 1</span>
            <h4 className="font-bold text-[#14213D] text-xs">Palm of Protein at Every Main Meal</h4>
            <p className="text-[11px] text-gray-600">Eggs, canned tuna, Greek yogurt, or chicken. Notice how your afternoon cravings drop to zero.</p>
          </div>

          <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl space-y-1">
            <span className="text-[10px] font-bold text-[#B88716] uppercase">Target 2</span>
            <h4 className="font-bold text-[#14213D] text-xs">Execute 1 Batch Prep Session</h4>
            <p className="text-[11px] text-gray-600">Boil 6 eggs or cook a big batch of brown rice on Sunday or Wednesday. Have food ready before hunger hits.</p>
          </div>

          <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl space-y-1">
            <span className="text-[10px] font-bold text-[#B88716] uppercase">Target 3</span>
            <h4 className="font-bold text-[#14213D] text-xs">Carry 1L Water Bottle All Day</h4>
            <p className="text-[11px] text-gray-600">Keep it on your lecture desk. Finish 2 full refills before your last class of the day.</p>
          </div>
        </div>

        <div className="p-3 bg-[#14213D] text-white rounded-xl text-center">
          <p className="text-xs font-semibold text-[#F4C95D]">
            Fueling well is the ultimate academic unfair advantage.
          </p>
        </div>
      </div>
    </PageContainer>
  );
};

// Page 58: Week 3: Energy, Sleep & Recovery
export const Page58WeekThreeChallenge: React.FC = () => {
  return (
    <PageContainer
      pageNumber={58}
      partTitle="PART FIVE — THE 30-DAY CHALLENGE"
      category="Challenge Sprint"
      title="Week 3: Energy & Sleep Recovery"
      subtitle="Days 15–21: Maximizing biological restoration"
    >
      <div className="flex-1 flex flex-col justify-between space-y-4 text-xs text-gray-700 leading-relaxed">
        <div className="p-3.5 bg-[#14213D]/10 border border-[#14213D]/30 rounded-xl">
          <h4 className="font-bold text-[#14213D] text-xs uppercase mb-1">
            Week 3 Mission: Biological Decompression
          </h4>
          <p className="text-[11px] text-gray-700">
            Movement and fuel are now habitual. This week we optimize your sleep architecture so your brain recovers deeply every single night.
          </p>
        </div>

        <div className="space-y-3">
          <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl space-y-1">
            <span className="text-[10px] font-bold text-[#14213D] uppercase">Target 1</span>
            <h4 className="font-bold text-[#14213D] text-xs">Strict 2:00 PM Caffeine Curfew</h4>
            <p className="text-[11px] text-gray-600">No coffee, pre-workout, or energy drinks after 2 PM. Protect your slow-wave restorative sleep.</p>
          </div>

          <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl space-y-1">
            <span className="text-[10px] font-bold text-[#14213D] uppercase">Target 2</span>
            <h4 className="font-bold text-[#14213D] text-xs">Phone Across the Room</h4>
            <p className="text-[11px] text-gray-600">Plug your phone in on your study desk. Zero scrolling in bed. Read 5 pages of a book or stretch.</p>
          </div>

          <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl space-y-1">
            <span className="text-[10px] font-bold text-[#14213D] uppercase">Target 3</span>
            <h4 className="font-bold text-[#14213D] text-xs">Active Recovery Walk</h4>
            <p className="text-[11px] text-gray-600">Take a 20-minute slow walk through campus greenery with no headphones to decompress mental fatigue.</p>
          </div>
        </div>

        <div className="p-3 bg-[#F7F8F3] border border-[#ECEEE7] rounded-xl text-center text-gray-600 text-[11px]">
          Notice how your waking energy and focus transform by Thursday.
        </div>
      </div>
    </PageContainer>
  );
};

// Page 60: Week 4: Consistency & Lockdown
export const Page60WeekFourChallenge: React.FC = () => {
  return (
    <PageContainer
      pageNumber={60}
      partTitle="PART FIVE — THE 30-DAY CHALLENGE"
      category="Challenge Sprint"
      title="Week 4: Consistency & Lockdown"
      subtitle="Days 22–28: Cementing the blueprint for life"
    >
      <div className="flex-1 flex flex-col justify-between space-y-4 text-xs text-gray-700 leading-relaxed">
        <div className="p-3.5 bg-[#38B66B]/25 border border-[#38B66B]/60 rounded-xl">
          <h4 className="font-bold text-[#14213D] text-xs uppercase mb-1">
            Week 4 Mission: The Championship Round
          </h4>
          <p className="text-[11px] text-gray-700">
            You are now in the final 7 days of the 30-Day Challenge. This week is about cementing your personal rhythm into an automatic identity.
          </p>
        </div>

        <div className="space-y-3">
          <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl space-y-1">
            <span className="text-[10px] font-bold text-[#38B66B] uppercase">Target 1</span>
            <h4 className="font-bold text-[#14213D] text-xs">Execute the Full 3-Pillar Loop</h4>
            <p className="text-[11px] text-gray-600">MOVE (workout or 8k steps) + FUEL (balanced plate) + RECOVER (sleep curfew) every day.</p>
          </div>

          <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl space-y-1">
            <span className="text-[10px] font-bold text-[#38B66B] uppercase">Target 2</span>
            <h4 className="font-bold text-[#14213D] text-xs">Test Strength Progression</h4>
            <p className="text-[11px] text-gray-600">Compare your pushups and bodyweight squats today to your Day 1 baseline. Feel the real physical adaptation.</p>
          </div>

          <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl space-y-1">
            <span className="text-[10px] font-bold text-[#38B66B] uppercase">Target 3</span>
            <h4 className="font-bold text-[#14213D] text-xs">Zero Zero-Days</h4>
            <p className="text-[11px] text-gray-600">If assignments spike, execute the 10-minute Bad Day fallback. Finish the 30 days strong!</p>
          </div>
        </div>

        <div className="p-3 bg-[#14213D] text-white rounded-xl text-center">
          <p className="text-xs font-semibold text-[#F4C95D]">
            The finish line is in sight. Finish with pride.
          </p>
        </div>
      </div>
    </PageContainer>
  );
};

// Page 62: Daily Check-in (Visual Element #20)
export const Page62DailyCheckinTemplate: React.FC = () => {
  return (
    <PageContainer
      pageNumber={62}
      partTitle="PART FIVE — THE 30-DAY CHALLENGE"
      category="Journal Log"
      title="Daily Check-in"
      subtitle="Interactive daily reflection template (Visual Element #20)"
      badge="Visual Element #20"
    >
      <div className="flex-1 flex flex-col justify-between space-y-3 text-xs text-gray-700">
        <div className="p-3 bg-[#F7F8F3] rounded-xl border border-[#E5E7EB]">
          <p className="text-[11px] text-gray-600">
            Use this reusable daily check-in layout every evening. It takes exactly 60 seconds to complete:
          </p>
        </div>

        <div className="p-4 bg-white border border-[#E5E7EB] rounded-xl space-y-3">
          <div className="grid grid-cols-2 gap-3 pb-2 border-b border-[#ECEEE7]">
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase block">Today's Date:</span>
              <span className="font-bold text-xs text-[#14213D]">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-gray-400 uppercase block">Day Status:</span>
              <span className="font-bold text-xs text-[#38B66B]">On Track ✓</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2.5 bg-[#F7F8F3] rounded-lg">
              <span className="font-bold text-[#14213D] block">1. Movement</span>
              <span className="text-[10px] text-gray-500">Dorm circuit / 8,200 steps</span>
            </div>
            <div className="p-2.5 bg-[#F7F8F3] rounded-lg">
              <span className="font-bold text-[#14213D] block">2. Fuel</span>
              <span className="text-[10px] text-gray-500">Tuna rice bowl + 2L water</span>
            </div>
            <div className="p-2.5 bg-[#F7F8F3] rounded-lg">
              <span className="font-bold text-[#14213D] block">3. Recovery</span>
              <span className="text-[10px] text-gray-500">Phone off by 11:15 PM</span>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#14213D] uppercase mb-1">
              One thing that went well today:
            </label>
            <input
              type="text"
              placeholder="e.g. Took the stairs to 4th floor lecture and felt full of energy..."
              className="w-full bg-[#F7F8F3] border border-[#E5E7EB] rounded-lg px-3 py-1.5 text-xs text-[#14213D] focus:border-[#38B66B] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#14213D] uppercase mb-1">
              My #1 priority for tomorrow's campus rhythm:
            </label>
            <input
              type="text"
              placeholder="e.g. Complete 15m dorm pushups before 10 AM chemistry lab..."
              className="w-full bg-[#F7F8F3] border border-[#E5E7EB] rounded-lg px-3 py-1.5 text-xs text-[#14213D] focus:border-[#38B66B] focus:outline-none"
            />
          </div>
        </div>

        <div className="p-3 bg-[#38B66B]/15 border border-[#38B66B]/30 rounded-xl text-center text-[11px] font-semibold text-[#14213D]">
          Daily consistency creates compounded confidence.
        </div>
      </div>
    </PageContainer>
  );
};
