import React from 'react';
import { PageContainer } from '../PageContainer';
import { useWorkbook } from '../../context/WorkbookContext';
import { Sparkles, Moon, RefreshCw, Layers, CheckSquare, ArrowRight, ShieldAlert, Plus, Trash2, BatteryCharging } from 'lucide-react';

interface PartFourProps {
  onJumpToPage: (page: number) => void;
}

// Page 41: Science of Student Habit Loops
export const Page41ScienceOfHabits: React.FC = () => {
  return (
    <PageContainer
      pageNumber={41}
      partTitle="PART FOUR — HABITS"
      category="Teaching"
      title="The Science of Student Habits"
      subtitle="How to automate healthy choices so they require zero willpower"
    >
      <div className="flex-1 flex flex-col justify-between space-y-4 text-xs text-gray-700 leading-relaxed">
        <p>
          Willpower is a finite battery that runs out after a 2-hour exam or a grueling lecture. If your fitness plan relies on "feeling motivated," it will fail by week two. We use <strong>neurobiological habit loops</strong> instead:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 bg-white border border-[#E5E7EB] rounded-xl space-y-1.5">
            <span className="text-[10px] font-bold text-[#38B66B] uppercase block">Phase 1</span>
            <h4 className="font-bold text-[#14213D] text-xs uppercase">The Cue (The Anchor)</h4>
            <p className="text-gray-600 text-[11px]">
              An existing automatic event in your university day. Example: Pouring your morning coffee, shutting your laptop after study, or arriving back in your dorm room.
            </p>
          </div>

          <div className="p-3.5 bg-white border border-[#E5E7EB] rounded-xl space-y-1.5">
            <span className="text-[10px] font-bold text-[#F4C95D] uppercase block">Phase 2</span>
            <h4 className="font-bold text-[#14213D] text-xs uppercase">The Routine (Low Friction)</h4>
            <p className="text-gray-600 text-[11px]">
              The micro-habit you attach to that cue. Keep it under 2 minutes to start. Example: Doing 10 squats or drinking a full glass of water.
            </p>
          </div>

          <div className="p-3.5 bg-white border border-[#E5E7EB] rounded-xl space-y-1.5">
            <span className="text-[10px] font-bold text-[#14213D] uppercase block">Phase 3</span>
            <h4 className="font-bold text-[#14213D] text-xs uppercase">The Reward (Dopamine)</h4>
            <p className="text-gray-600 text-[11px]">
              A moment of genuine internal satisfaction or checking off your 30-day challenge tracker. Your brain encodes the loop as valuable.
            </p>
          </div>
        </div>

        <div className="p-3.5 bg-[#14213D] text-white rounded-xl">
          <h4 className="text-xs font-bold text-[#F4C95D] uppercase mb-1">The 2-Minute Entry Rule:</h4>
          <p className="text-xs text-gray-200">
            When you don't feel like working out, tell yourself: <em>"I will put on my workout shoes and do just 2 minutes of stretching."</em> 85% of the time, once inertia is broken, you finish the full 15-minute circuit.
          </p>
        </div>
      </div>
    </PageContainer>
  );
};

// Page 42: Habit Stacking Worksheet (Visual Element #15)
export const Page42HabitStacking: React.FC = () => {
  const { state, updateHabitStack, addHabitStack, removeHabitStack } = useWorkbook();
  const stacks = state.habits.habitStacks;

  return (
    <PageContainer
      pageNumber={42}
      partTitle="PART FOUR — HABITS"
      category="Worksheet"
      title="Habit Stacking Worksheet"
      subtitle="Anchor fitness to your existing daily class routine (Visual Element #15)"
      badge="Visual Element #15"
    >
      <div className="flex-1 flex flex-col justify-between space-y-3 text-xs">
        <p className="text-[11px] text-gray-600">
          The formula is: <strong>"After [Current Campus Routine], I will [New Healthy Habit], then [Reward]."</strong> Customize your habit stacks below:
        </p>

        <div className="space-y-2.5 overflow-y-auto max-h-[580px] pr-1">
          {stacks.map((stack, idx) => (
            <div key={stack.id || idx} className="p-3 bg-white border border-[#E5E7EB] rounded-xl space-y-2 relative group">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#38B66B] text-[11px] uppercase tracking-wider">
                  Habit Stack #{idx + 1}
                </span>
                {stacks.length > 1 && (
                  <button
                    onClick={() => removeHabitStack(idx)}
                    className="text-gray-300 hover:text-red-500 transition-colors p-1"
                    title="Remove stack"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-0.5">
                    1. Current Routine (Cue):
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. After I pour morning tea..."
                    value={stack.existingRoutine}
                    onChange={(e) => updateHabitStack(idx, { existingRoutine: e.target.value })}
                    className="w-full bg-[#F7F8F3] border border-[#E5E7EB] rounded-md px-2 py-1 text-xs text-[#14213D] focus:border-[#38B66B] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#38B66B] uppercase mb-0.5">
                    2. New Habit (Action):
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. I will drink 500ml water..."
                    value={stack.newHabit}
                    onChange={(e) => updateHabitStack(idx, { newHabit: e.target.value })}
                    className="w-full bg-[#F7F8F3] border border-[#E5E7EB] rounded-md px-2 py-1 text-xs text-[#14213D] focus:border-[#38B66B] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#B88716] uppercase mb-0.5">
                    3. Reward / Check-off:
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Check off daily tracker..."
                    value={stack.reward}
                    onChange={(e) => updateHabitStack(idx, { reward: e.target.value })}
                    className="w-full bg-[#F7F8F3] border border-[#E5E7EB] rounded-md px-2 py-1 text-xs text-[#14213D] focus:border-[#38B66B] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-1">
          <button
            onClick={addHabitStack}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#38B66B] hover:text-[#2fa35e] bg-[#38B66B]/10 hover:bg-[#38B66B]/20 px-3 py-1.5 rounded-lg transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Another Stack</span>
          </button>
          <span className="text-[11px] text-gray-400">Aim for 3 clear habit stacks this week.</span>
        </div>
      </div>
    </PageContainer>
  );
};

// Page 43: Environment Reset Worksheet (Visual Element #16)
export const Page43EnvironmentReset: React.FC = () => {
  const { state, toggleDormResetItem } = useWorkbook();
  const list = state.habits.dormResetChecklist;

  const resetStations = [
    {
      title: 'Station 1: The Study Desk',
      key: 'deskCleared',
      desc: 'Clear empty snack wrappers and coffee cups every night. Keep a 1L water bottle centered on the desk ready for tomorrow morning.',
    },
    {
      title: 'Station 2: The Nightstand & Bed',
      key: 'phoneChargerAwayFromBed',
      desc: 'Move your phone charger at least 6 feet away from your mattress. Eliminates midnight doomscrolling and forces you to stand up to turn off your morning alarm.',
    },
    {
      title: 'Station 3: Dorm Floor & Chair',
      key: 'workoutClothesOut',
      desc: 'Lay out workout shorts, t-shirt, and sneakers on your desk chair before sleeping. Removes 100% of morning outfit decision fatigue.',
    },
    {
      title: 'Station 4: Mini-Fridge & Pantry',
      key: 'fruitOnDesk',
      desc: 'Place high-protein Greek yogurt, eggs, and fruit front-and-center in your fridge. Hide processed snacks on a high shelf out of sight.',
    },
  ];

  return (
    <PageContainer
      pageNumber={43}
      partTitle="PART FOUR — HABITS"
      category="Worksheet"
      title="Environment Reset Worksheet"
      subtitle="Optimizing dorm room, study desk & nightstand (Visual Element #16)"
      badge="Visual Element #16"
    >
      <div className="flex-1 flex flex-col justify-between space-y-3.5 text-xs">
        <p className="text-gray-600">
          Environment design beats willpower. When healthy choices are in your direct line of sight and junk choices are high friction, good habits happen on autopilot:
        </p>

        <div className="space-y-3 overflow-y-auto max-h-[580px] pr-1">
          {resetStations.map((s) => (
            <label
              key={s.key}
              className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                list[s.key] ? 'bg-[#38B66B]/10 border-[#38B66B]' : 'bg-white border-[#E5E7EB] hover:border-gray-300'
              }`}
            >
              <input
                type="checkbox"
                checked={!!list[s.key]}
                onChange={() => toggleDormResetItem(s.key)}
                className="w-4 h-4 rounded text-[#38B66B] accent-[#38B66B] shrink-0 mt-0.5"
              />
              <div className="space-y-0.5">
                <h4 className="font-bold text-[#14213D] text-xs uppercase">{s.title}</h4>
                <p className="text-[11px] text-gray-600 leading-normal">{s.desc}</p>
              </div>
            </label>
          ))}
        </div>

        <div className="p-3 bg-[#F7F8F3] border border-[#ECEEE7] rounded-xl flex items-center justify-between text-[11px] text-gray-600">
          <span>Environment Score: {Object.values(list).filter(Boolean).length} / 4 Reset</span>
          <span className="font-bold text-[#38B66B]">5-Minute Evening Reset Routine</span>
        </div>
      </div>
    </PageContainer>
  );
};

// Page 44: When Motivation Fails: Never Miss Twice
export const Page44NeverMissTwice: React.FC = () => {
  return (
    <PageContainer
      pageNumber={44}
      partTitle="PART FOUR — HABITS"
      category="Teaching"
      title="The 'Never Miss Twice' Rule"
      subtitle="How consistent students survive unexpected slumps"
    >
      <div className="flex-1 flex flex-col justify-between space-y-4 text-xs text-gray-700 leading-relaxed">
        <p>
          Missing a workout or having a bad day of eating does not make you a failure—it makes you a normal human being with university deadlines. What separates people who stay fit from those who quit is <strong>the immediate response</strong>.
        </p>

        <div className="p-4 bg-[#14213D] text-white rounded-xl space-y-2">
          <h4 className="text-xs font-bold text-[#F4C95D] uppercase tracking-wider">
            The Law of Never Missing Twice:
          </h4>
          <p className="text-xs text-gray-200">
            Missing once is an accident; missing twice is the start of a new, negative habit loop. When life interrupts your Tuesday workout, you do not wait until "next Monday" to fix it. You execute a 10-minute micro-action on Wednesday.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="p-3.5 bg-red-50/70 border border-red-200 rounded-xl space-y-1">
            <span className="text-red-700 font-bold text-xs uppercase block">The Death Spiral</span>
            <p className="text-[11px] text-gray-600">
              Miss 1 day → Feel guilty → Binge junk food → Miss 2nd day → Say "I fell off the wagon" → Quit for 2 months.
            </p>
          </div>

          <div className="p-3.5 bg-[#38B66B]/10 border border-[#38B66B]/30 rounded-xl space-y-1">
            <span className="text-[#38B66B] font-bold text-xs uppercase block">The Fit Student Rebound</span>
            <p className="text-[11px] text-gray-600">
              Miss 1 day → Acknowledge busy life without shame → Drink 500ml water → Do 10 pushups → Streak instantly protected.
            </p>
          </div>
        </div>

        <div className="p-3.5 bg-[#F7F8F3] border border-[#E5E7EB] rounded-xl text-center">
          <p className="text-xs font-bold text-[#14213D]">
            "Repetition doesn’t mean perfection. It means returning without drama."
          </p>
        </div>
      </div>
    </PageContainer>
  );
};

// Page 45: Reset-After-Falling-Off-Track Worksheet (Visual Element #17)
export const Page45ResetAfterFallingOffTrack: React.FC = () => {
  const { state, updateReboundProtocol } = useWorkbook();
  const rebound = state.habits.reboundProtocolAnswers;

  return (
    <PageContainer
      pageNumber={45}
      partTitle="PART FOUR — HABITS"
      category="Worksheet"
      title="Reset-After-Falling-Off-Track"
      subtitle="Compassionate post-slump recovery protocol (Visual Element #17)"
      badge="Visual Element #17"
    >
      <div className="flex-1 flex flex-col justify-between space-y-3.5 text-xs text-gray-700">
        <div className="p-3 bg-[#F7F8F3] rounded-xl border border-[#E5E7EB]">
          <p className="text-[11px] text-gray-600">
            Use this emergency protocol whenever you feel like you "blew your diet," missed three workouts during exam crunch, or had a wild weekend. No self-criticism allowed.
          </p>
        </div>

        <div className="space-y-3">
          <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl">
            <label className="block text-[11px] font-bold text-[#14213D] uppercase mb-1">
              Step 1: Identify the Trigger Objectively (What specifically happened?):
            </label>
            <input
              type="text"
              placeholder="e.g., Had 2 midterms on Thursday and Friday, slept 4 hours, ordered late-night pizza..."
              value={rebound.trigger}
              onChange={(e) => updateReboundProtocol({ trigger: e.target.value })}
              className="w-full bg-[#F7F8F3] border border-[#E5E7EB] rounded-lg px-3 py-1.5 text-xs text-[#14213D] focus:border-[#38B66B] focus:outline-none"
            />
          </div>

          <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl">
            <label className="block text-[11px] font-bold text-[#38B66B] uppercase mb-1">
              Step 2: Compassion Reframe (Neutral perspective):
            </label>
            <input
              type="text"
              value={rebound.compassionNote}
              onChange={(e) => updateReboundProtocol({ compassionNote: e.target.value })}
              className="w-full bg-[#F7F8F3] border border-[#E5E7EB] rounded-lg px-3 py-1.5 text-xs text-[#14213D] focus:border-[#38B66B] focus:outline-none"
            />
            <p className="text-[10px] text-gray-400 mt-1">Reminder: 3 off-track days cannot cancel out 30 days of consistent effort.</p>
          </div>

          <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl">
            <label className="block text-[11px] font-bold text-[#14213D] uppercase mb-1">
              Step 3: Immediate Next Action (Within the next 10 minutes):
            </label>
            <input
              type="text"
              value={rebound.immediateNextAction}
              onChange={(e) => updateReboundProtocol({ immediateNextAction: e.target.value })}
              className="w-full bg-[#F7F8F3] border border-[#E5E7EB] rounded-lg px-3 py-1.5 text-xs text-[#14213D] focus:border-[#38B66B] focus:outline-none"
            />
            <p className="text-[10px] text-gray-400 mt-1">Example: Drink a 500ml glass of water, walk outside for 10 minutes, take a warm shower.</p>
          </div>
        </div>

        <div className="p-3 bg-[#38B66B]/15 border border-[#38B66B]/30 rounded-xl text-center text-[11px] font-semibold text-[#14213D]">
          You are always exactly ONE good decision away from being back on track.
        </div>
      </div>
    </PageContainer>
  );
};

// Page 46: Sleep & Biological Recovery in University
export const Page46SleepBiologicalRecovery: React.FC = () => {
  return (
    <PageContainer
      pageNumber={46}
      partTitle="PART FOUR — HABITS"
      category="Teaching"
      title="Sleep & Biological Recovery"
      subtitle="Why 7.5 hours of sleep boosts GPA faster than all-night cramming"
    >
      <div className="flex-1 flex flex-col justify-between space-y-4 text-xs text-gray-700 leading-relaxed">
        <p>
          In college culture, sleep deprivation is worn like a badge of honor. In reality, sleeping 5 hours makes your prefrontal cortex operate at a cognitive equivalent to being legally intoxicated.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="p-3.5 bg-white border border-[#E5E7EB] rounded-xl space-y-1">
            <h4 className="font-bold text-[#14213D] text-xs uppercase">1. Memory Consolidation</h4>
            <p className="text-gray-600 text-[11px]">
              During Slow-Wave and REM sleep, short-term information learned in lectures is physically transferred into long-term cortical storage. Pulling an all-nighter deletes that consolidation window.
            </p>
          </div>

          <div className="p-3.5 bg-white border border-[#E5E7EB] rounded-xl space-y-1">
            <h4 className="font-bold text-[#14213D] text-xs uppercase">2. Hunger Hormones (Ghrelin & Leptin)</h4>
            <p className="text-gray-600 text-[11px]">
              Just one night of poor sleep increases ghrelin (the hunger hormone) by 25% and reduces leptin (fullness), driving intense cravings for sugary pastries and chips.
            </p>
          </div>

          <div className="p-3.5 bg-white border border-[#E5E7EB] rounded-xl space-y-1">
            <h4 className="font-bold text-[#14213D] text-xs uppercase">3. Muscle Growth & Recovery</h4>
            <p className="text-gray-600 text-[11px]">
              95% of human growth hormone (HGH) is secreted during deep sleep. Without sleep, your body breaks down muscle tissue for energy, leaving you weak and stiff.
            </p>
          </div>

          <div className="p-3.5 bg-white border border-[#E5E7EB] rounded-xl space-y-1">
            <h4 className="font-bold text-[#14213D] text-xs uppercase">4. Emotional Resilience</h4>
            <p className="text-gray-600 text-[11px]">
              Quality rest stabilizes the amygdala. You handle exam stress, presentation anxiety, and roommate disagreements with calm composure.
            </p>
          </div>
        </div>

        <div className="p-3 bg-[#14213D] text-white rounded-xl text-center">
          <p className="text-xs font-semibold text-[#F4C95D]">
            Sleep is not dead time. It is high-performance biological repair.
          </p>
        </div>
      </div>
    </PageContainer>
  );
};

// Page 47: Night Routine & Screen Curfew
export const Page47NightRoutine: React.FC = () => {
  return (
    <PageContainer
      pageNumber={47}
      partTitle="PART FOUR — HABITS"
      category="Concept"
      title="The Night Routine & Screen Curfew"
      subtitle="Transitioning smoothly from intense study mode into rest mode"
    >
      <div className="flex-1 flex flex-col justify-between space-y-4 text-xs text-gray-700 leading-relaxed">
        <p>
          You cannot go straight from high-stress studying or high-stimulation gaming into restorative sleep. Your nervous system requires an intentional 30-minute runway:
        </p>

        <div className="space-y-3">
          <div className="p-3 bg-[#F7F8F3] border-l-4 border-[#38B66B] rounded-r-xl">
            <span className="text-[10px] font-bold text-[#38B66B] uppercase tracking-wider block">
              T-Minus 45 Minutes: The Screen Curfew
            </span>
            <h4 className="font-bold text-[#14213D] text-xs">Put Laptop in Sleep Mode</h4>
            <p className="text-[11px] text-gray-600 mt-0.5">
              Turn off overhead fluorescent dorm lights. Switch on a warm desk lamp or fairy lights. Blue light suppresses melatonin for up to 90 minutes.
            </p>
          </div>

          <div className="p-3 bg-[#F7F8F3] border-l-4 border-[#F4C95D] rounded-r-xl">
            <span className="text-[10px] font-bold text-[#F4C95D] uppercase tracking-wider block">
              T-Minus 20 Minutes: The Brain Dump
            </span>
            <h4 className="font-bold text-[#14213D] text-xs">Jot Down Tomorrow’s Top 3 Tasks</h4>
            <p className="text-[11px] text-gray-600 mt-0.5">
              Write tomorrow’s 3 study priorities on a sticky note. Externalizing mental to-dos stops racing thoughts once your head hits the pillow.
            </p>
          </div>

          <div className="p-3 bg-[#F7F8F3] border-l-4 border-[#14213D] rounded-r-xl">
            <span className="text-[10px] font-bold text-[#14213D] uppercase tracking-wider block">
              T-Minus 5 Minutes: The Dorm Sanctuary
            </span>
            <h4 className="font-bold text-[#14213D] text-xs">Cool & Dark Environment</h4>
            <p className="text-[11px] text-gray-600 mt-0.5">
              Crack the window slightly if room is hot. Wear a sleep mask or earplugs if roommate schedules clash.
            </p>
          </div>
        </div>

        <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl flex items-center justify-between text-xs">
          <div>
            <span className="font-bold text-[#14213D]">The Wake-Time Anchor: </span>
            <span className="text-gray-600">Wake up at roughly the same hour (+/- 45m) even on weekends to anchor your circadian rhythm.</span>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

// Page 48: Recovery Planner (Visual Element #18)
export const Page48RecoveryPlanner: React.FC = () => {
  const { state, updateRecovery, toggleRecoveryHabit } = useWorkbook();
  const rec = state.recovery;

  const habits = [
    { key: 'noPhoneInBed', label: 'No phone in bed during wind-down' },
    { key: 'darkRoom', label: 'Room cool, quiet, and dark' },
    { key: 'hydrationMorning', label: 'Water bottle prepped on desk for morning' },
    { key: 'caffeineCurfew2PM', label: 'Caffeine cutoff adhered to by 2:00 PM' },
  ];

  return (
    <PageContainer
      pageNumber={48}
      partTitle="PART FOUR — HABITS"
      category="Planner"
      title="Recovery Planner"
      subtitle="Sleep architecture & stress decompression blueprint (Visual Element #18)"
      badge="Visual Element #18"
    >
      <div className="flex-1 flex flex-col justify-between space-y-3.5 text-xs text-gray-700">
        <p className="text-[11px] text-gray-600">
          Design your personal daily recovery timings to ensure your nervous system resets between heavy university days:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl">
            <label className="block text-[10px] font-bold text-[#14213D] uppercase mb-1">
              Target Wind-down Time:
            </label>
            <input
              type="text"
              value={rec.windDownTime}
              onChange={(e) => updateRecovery({ windDownTime: e.target.value })}
              className="w-full bg-[#F7F8F3] border border-[#E5E7EB] rounded-md px-2.5 py-1.5 text-xs text-[#14213D] focus:border-[#38B66B] focus:outline-none"
            />
          </div>

          <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl">
            <label className="block text-[10px] font-bold text-[#14213D] uppercase mb-1">
              Screen Curfew (Lights dim):
            </label>
            <input
              type="text"
              value={rec.screenCurfewTime}
              onChange={(e) => updateRecovery({ screenCurfewTime: e.target.value })}
              className="w-full bg-[#F7F8F3] border border-[#E5E7EB] rounded-md px-2.5 py-1.5 text-xs text-[#14213D] focus:border-[#38B66B] focus:outline-none"
            />
          </div>

          <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl">
            <label className="block text-[10px] font-bold text-[#14213D] uppercase mb-1">
              Target Morning Wake Time:
            </label>
            <input
              type="text"
              value={rec.targetWakeTime}
              onChange={(e) => updateRecovery({ targetWakeTime: e.target.value })}
              className="w-full bg-[#F7F8F3] border border-[#E5E7EB] rounded-md px-2.5 py-1.5 text-xs text-[#14213D] focus:border-[#38B66B] focus:outline-none"
            />
          </div>
        </div>

        {/* Checkable Habits */}
        <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl space-y-2">
          <h4 className="font-bold text-[#14213D] text-xs uppercase">Nightly Recovery Checklist</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {habits.map((h) => (
              <label key={h.key} className="flex items-center gap-2 cursor-pointer text-[11px] text-gray-700">
                <input
                  type="checkbox"
                  checked={!!rec.recoveryHabits[h.key]}
                  onChange={() => toggleRecoveryHabit(h.key)}
                  className="w-3.5 h-3.5 rounded text-[#38B66B] accent-[#38B66B]"
                />
                <span>{h.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-[#14213D] uppercase mb-1">
            My Top Stress-Busting Decompression Activities:
          </label>
          <textarea
            rows={2}
            value={rec.stressBusters}
            onChange={(e) => updateRecovery({ stressBusters: e.target.value })}
            className="w-full bg-[#F7F8F3] border border-[#E5E7EB] rounded-lg p-2 text-xs text-[#14213D] focus:border-[#38B66B] focus:outline-none"
          />
        </div>
      </div>
    </PageContainer>
  );
};

// Page 49: Mental Recharge Menu
export const Page49MentalRechargeMenu: React.FC = () => {
  return (
    <PageContainer
      pageNumber={49}
      partTitle="PART FOUR — HABITS"
      category="Worksheet"
      title="Mental Recharge & Anti-Burnout Menu"
      subtitle="Zero-cost campus de-stressors when academic overwhelm hits"
    >
      <div className="flex-1 flex flex-col justify-between space-y-3.5 text-xs text-gray-700">
        <p>
          When academic deadlines surge, don’t turn to 2 hours of numbing social media scrolling. Pick one high-leverage recharge activity from this menu:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3.5 bg-white border border-[#E5E7EB] rounded-xl space-y-1">
            <span className="text-[10px] font-bold text-[#38B66B] uppercase">Option 1 (10 Minutes)</span>
            <h4 className="font-bold text-[#14213D] text-xs uppercase">The Silent Campus Quad Walk</h4>
            <p className="text-[11px] text-gray-600">Leave headphones in your pocket. Walk around campus trees and look at the sky. Gives your auditory cortex a complete reset.</p>
          </div>

          <div className="p-3.5 bg-white border border-[#E5E7EB] rounded-xl space-y-1">
            <span className="text-[10px] font-bold text-[#38B66B] uppercase">Option 2 (15 Minutes)</span>
            <h4 className="font-bold text-[#14213D] text-xs uppercase">The Hot Shower Contrast</h4>
            <p className="text-[11px] text-gray-600">A warm shower washes away study tension, dilates blood vessels, and helps your core temperature drop afterward for better sleep.</p>
          </div>

          <div className="p-3.5 bg-white border border-[#E5E7EB] rounded-xl space-y-1">
            <span className="text-[10px] font-bold text-[#38B66B] uppercase">Option 3 (5 Minutes)</span>
            <h4 className="font-bold text-[#14213D] text-xs uppercase">Physiological Sigh Breathing</h4>
            <p className="text-[11px] text-gray-600">Two quick inhales through the nose, followed by one long, slow exhale through the mouth. Repeat 5 times. Instantly reduces heart rate.</p>
          </div>

          <div className="p-3.5 bg-white border border-[#E5E7EB] rounded-xl space-y-1">
            <span className="text-[10px] font-bold text-[#38B66B] uppercase">Option 4 (20 Minutes)</span>
            <h4 className="font-bold text-[#14213D] text-xs uppercase">Roommate Tea / Call Home</h4>
            <p className="text-[11px] text-gray-600">Make a cup of herbal chamomile tea and talk about anything other than assignments. Social connection dissolves academic isolation.</p>
          </div>
        </div>

        <div className="p-3 bg-[#38B66B]/15 border border-[#38B66B]/30 rounded-xl text-center text-[11px] font-semibold text-[#14213D]">
          "Rest is not a reward you earn after burning out. Rest is an essential prerequisite for doing good work."
        </div>
      </div>
    </PageContainer>
  );
};

// Page 50: Habit Action Plan & Quick Wins
export const Page50HabitActionPlan: React.FC<PartFourProps> = ({ onJumpToPage }) => {
  return (
    <PageContainer
      pageNumber={50}
      partTitle="PART FOUR — HABITS"
      category="Action Plan"
      title="Habit Action Plan & Quick Wins"
      subtitle="What to do next before launching Part Five (The 30-Day Challenge)"
    >
      <div className="flex-1 flex flex-col justify-between space-y-4 text-xs">
        <div className="p-3.5 bg-[#38B66B]/15 border border-[#38B66B]/30 rounded-xl">
          <h4 className="font-bold text-[#14213D] text-xs uppercase mb-1">
            Part Four Habit System Completed!
          </h4>
          <p className="text-gray-700 text-[11px]">
            You have now mastered the foundation: Reset (Part 1), Move (Part 2), Fuel (Part 3), and Habits (Part 4). You are 100% prepared to execute the 30-Day Blueprint.
          </p>
        </div>

        <div className="space-y-3">
          <div className="p-3.5 bg-white border border-[#E5E7EB] rounded-xl flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-[#14213D] text-white flex items-center justify-center font-bold text-xs shrink-0">
              1
            </span>
            <div>
              <h4 className="font-bold text-[#14213D] text-xs uppercase">Perform Tonight's 5-Minute Dorm Reset</h4>
              <p className="text-gray-600 text-[11px] mt-0.5">
                Plug your phone across the room, lay out your sneakers, and put your water bottle on your desk.
              </p>
            </div>
          </div>

          <div className="p-3.5 bg-white border border-[#E5E7EB] rounded-xl flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-[#14213D] text-white flex items-center justify-center font-bold text-xs shrink-0">
              2
            </span>
            <div>
              <h4 className="font-bold text-[#14213D] text-xs uppercase">Lock in Your First Habit Stack</h4>
              <p className="text-gray-600 text-[11px] mt-0.5">
                Commit to one simple pairing: e.g. "After my morning coffee, I will drink 500ml water."
              </p>
            </div>
          </div>

          <div className="p-3.5 bg-white border border-[#E5E7EB] rounded-xl flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-[#14213D] text-white flex items-center justify-center font-bold text-xs shrink-0">
              3
            </span>
            <div>
              <h4 className="font-bold text-[#14213D] text-xs uppercase">Prepare for Day 1 of the Challenge</h4>
              <p className="text-gray-600 text-[11px] mt-0.5">
                Turn the page to open the interactive 30-Day Calendar and start logging Day 1.
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-[#14213D] text-white rounded-xl flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold text-[#F4C95D] uppercase">What to do next:</h4>
            <p className="text-xs text-gray-200">Unlock Part Five: The 30-Day Interactive Challenge Calendar.</p>
          </div>
          <button
            onClick={() => onJumpToPage(51)}
            className="no-print bg-[#38B66B] hover:bg-[#2fa35e] text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <span>Launch Challenge</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </PageContainer>
  );
};
