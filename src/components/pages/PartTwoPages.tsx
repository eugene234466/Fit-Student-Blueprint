import React from 'react';
import { PageContainer } from '../PageContainer';
import { useWorkbook } from '../../context/WorkbookContext';
import { Flame, Clock, Dumbbell, Compass, CheckCircle2, TrendingUp, Calendar, ArrowRight, Zap, Play } from 'lucide-react';

interface PartTwoProps {
  onJumpToPage: (page: number) => void;
}

// Page 17: Teaching/Concept: The Student Movement Hierarchy
export const Page17MovementHierarchy: React.FC = () => {
  return (
    <PageContainer
      pageNumber={17}
      partTitle="PART TWO — MOVE"
      category="Concept"
      title="The Student Movement Hierarchy"
      subtitle="Where your physical energy generates the greatest return"
    >
      <div className="flex-1 flex flex-col justify-between space-y-3.5 text-xs text-gray-700 leading-relaxed">
        <p>
          Students often burn out because they prioritize grueling cardio over the foundational layers of human movement. Here is how to structure your training hierarchy:
        </p>

        {/* Pyramid/Tier Visual */}
        <div className="space-y-2.5">
          {/* Tier 1 (Base) */}
          <div className="p-3.5 bg-[#38B66B]/15 border-2 border-[#38B66B]/40 rounded-xl">
            <div className="flex items-center justify-between mb-1">
              <span className="font-extrabold text-[#14213D] text-xs uppercase tracking-wider">
                TIER 1 (THE FOUNDATION): Daily Campus Steps (NEAT)
              </span>
              <span className="text-[11px] font-bold text-[#38B66B] bg-white px-2 py-0.5 rounded">
                7,000 – 10,000 Steps
              </span>
            </div>
            <p className="text-gray-700 text-[11px]">
              Non-Exercise Activity Thermogenesis (walking across campus, stairs, library transitions). Burns 3x more calories than a 30-minute workout, cleanses mental fog, and creates zero fatigue debt.
            </p>
          </div>

          {/* Tier 2 (Middle) */}
          <div className="p-3.5 bg-[#14213D] text-white rounded-xl">
            <div className="flex items-center justify-between mb-1">
              <span className="font-extrabold text-[#F4C95D] text-xs uppercase tracking-wider">
                TIER 2: Short-Burst Resistance Training
              </span>
              <span className="text-[11px] font-bold text-[#14213D] bg-[#F4C95D] px-2 py-0.5 rounded">
                3x / Week (15–30 Mins)
              </span>
            </div>
            <p className="text-gray-200 text-[11px]">
              Dorm bodyweight circuits or campus gym weights. Preserves metabolic muscle, fixes poor desk posture, improves insulin sensitivity, and releases brain-derived neurotrophic factor (BDNF).
            </p>
          </div>

          {/* Tier 3 (Apex) */}
          <div className="p-3.5 bg-[#F7F8F3] border border-[#E5E7EB] rounded-xl">
            <div className="flex items-center justify-between mb-1">
              <span className="font-extrabold text-gray-800 text-xs uppercase tracking-wider">
                TIER 3: Conditioning & Recreational Cardio
              </span>
              <span className="text-[11px] font-bold text-gray-600 bg-white border border-[#E5E7EB] px-2 py-0.5 rounded">
                Optional & Fun
              </span>
            </div>
            <p className="text-gray-600 text-[11px]">
              Social basketball, casual 20-minute jog with friends, or cycling. Should be enjoyable and refreshing—never an agonizing punishment for eating pizza.
            </p>
          </div>
        </div>

        <div className="p-3 bg-[#F7F8F3] border-l-4 border-[#38B66B] rounded-r-xl">
          <p className="text-[11px] font-semibold text-[#14213D]">
            Rule of Thumb: If you only have energy for one thing today, hit your campus steps. Never sacrifice sleep to run on a treadmill at 6 AM.
          </p>
        </div>
      </div>
    </PageContainer>
  );
};

// Page 18: Campus Commute Steps
export const Page18CampusCommute: React.FC = () => {
  return (
    <PageContainer
      pageNumber={18}
      partTitle="PART TWO — MOVE"
      category="Teaching"
      title="The Campus Commute Formula"
      subtitle="How to hit 8,000+ steps effortlessly without a treadmill"
    >
      <div className="flex-1 flex flex-col justify-between space-y-4 text-xs text-gray-700 leading-relaxed">
        <p>
          You don’t need to pay for a treadmill membership to get your steps in. University campuses are built for walking. With a few subtle tweaks to your daily route, you can bank 8,000 steps automatically.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="p-3.5 bg-white border border-[#E5E7EB] rounded-xl space-y-1.5">
            <span className="text-[10px] font-bold text-[#38B66B] uppercase tracking-wider">Strategy 01</span>
            <h4 className="font-bold text-[#14213D] text-xs">The 10-Minute Morning Loop</h4>
            <p className="text-gray-600 text-[11px]">
              Instead of immediately sitting down with your phone in bed, grab your water bottle and walk a quick 10-minute lap around your residence hall or campus quad. Banks <strong>1,200 steps</strong> and resets your circadian clock.
            </p>
          </div>

          <div className="p-3.5 bg-white border border-[#E5E7EB] rounded-xl space-y-1.5">
            <span className="text-[10px] font-bold text-[#38B66B] uppercase tracking-wider">Strategy 02</span>
            <h4 className="font-bold text-[#14213D] text-xs">The Floor-3 Elevator Rule</h4>
            <p className="text-gray-600 text-[11px]">
              Never take the elevator for anything under 4 floors. Climbing stairs burns 3x more energy than walking flat ground and builds knee/glute endurance. Banks <strong>500–800 steps</strong> daily.
            </p>
          </div>

          <div className="p-3.5 bg-white border border-[#E5E7EB] rounded-xl space-y-1.5">
            <span className="text-[10px] font-bold text-[#38B66B] uppercase tracking-wider">Strategy 03</span>
            <h4 className="font-bold text-[#14213D] text-xs">Audio Lecture & Podcast Walks</h4>
            <p className="text-gray-600 text-[11px]">
              Have recorded lectures or readings to review? Pop in your headphones and walk outside across campus while listening. Turn passive study time into <strong>3,000 active steps</strong>.
            </p>
          </div>

          <div className="p-3.5 bg-white border border-[#E5E7EB] rounded-xl space-y-1.5">
            <span className="text-[10px] font-bold text-[#38B66B] uppercase tracking-wider">Strategy 04</span>
            <h4 className="font-bold text-[#14213D] text-xs">The Post-Lunch Library Stroll</h4>
            <p className="text-gray-600 text-[11px]">
              Avoid the 2 PM food coma. A brisk 12-minute walk immediately following lunch shuttles glucose into muscle cells and prevents study lethargy. Banks <strong>1,400 steps</strong>.
            </p>
          </div>
        </div>

        <div className="p-3.5 bg-[#14213D] text-white rounded-xl text-center">
          <p className="text-xs font-semibold text-[#F4C95D]">
            Daily Step Math: 1,200 + 800 + 3,000 + 1,400 + Normal Commute = 8,000+ Steps effortlessly!
          </p>
        </div>
      </div>
    </PageContainer>
  );
};

// Page 19: Dorm Room Training Rules
export const Page19DormTrainingRules: React.FC = () => {
  return (
    <PageContainer
      pageNumber={19}
      partTitle="PART TWO — MOVE"
      category="Teaching"
      title="Dorm Room Training Rules"
      subtitle="Small spaces, shared floors, zero noise & maximum results"
    >
      <div className="flex-1 flex flex-col justify-between space-y-4 text-xs text-gray-700 leading-relaxed">
        <p>
          Dorm rooms are notoriously compact, and jumping jacks will quickly irritate the roommates living beneath you. Follow these four fundamental principles for dorm training:
        </p>

        <div className="space-y-3">
          <div className="p-3 bg-[#F7F8F3] border border-[#E5E7EB] rounded-xl flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-[#14213D] text-[#38B66B] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              1
            </div>
            <div>
              <h4 className="font-bold text-[#14213D] text-xs uppercase">The "Quiet Sole" Rule (No Impact Exercises)</h4>
              <p className="text-gray-600 text-[11px] mt-0.5">
                Swap burpees and jump squats for slow-tempo bodyweight squats (3-second descent), reverse lunges, and paused pushups. You create greater muscle tension with zero thumping.
              </p>
            </div>
          </div>

          <div className="p-3 bg-[#F7F8F3] border border-[#E5E7EB] rounded-xl flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-[#14213D] text-[#38B66B] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              2
            </div>
            <div>
              <h4 className="font-bold text-[#14213D] text-xs uppercase">Furniture as Training Stations</h4>
              <p className="text-gray-600 text-[11px] mt-0.5">
                Your sturdy desk edge is perfect for incline pushups. A standard dorm chair supports tricep dips or Bulgarian split squats. A bathroom towel under your feet turns dorm linoleum into a slider for hamstring curls.
              </p>
            </div>
          </div>

          <div className="p-3 bg-[#F7F8F3] border border-[#E5E7EB] rounded-xl flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-[#14213D] text-[#38B66B] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              3
            </div>
            <div>
              <h4 className="font-bold text-[#14213D] text-xs uppercase">The Backpack Micro-Load</h4>
              <p className="text-gray-600 text-[11px] mt-0.5">
                Don’t have dumbbells? Place 3–4 heavy textbooks or water bottles into your backpack, zip it securely, and wear it on your back or chest to immediately increase squat or pushup intensity.
              </p>
            </div>
          </div>
        </div>

        <div className="p-3 bg-[#38B66B]/10 border border-[#38B66B]/30 rounded-xl text-center">
          <span className="font-bold text-[#14213D] text-xs">Required Space: </span>
          <span className="text-gray-700">A 6ft x 3ft patch of floor between your bed and desk is all you need.</span>
        </div>
      </div>
    </PageContainer>
  );
};

// Page 20: No-Equipment Workout Card (Visual Element #7)
export const Page20NoEquipmentCard: React.FC = () => {
  return (
    <PageContainer
      pageNumber={20}
      partTitle="PART TWO — MOVE"
      category="Visual Card"
      title="No-Equipment Workout Card"
      subtitle="The 15-Minute Dorm Strength Routine (Visual Element #7)"
      badge="Visual Element #7"
    >
      <div className="flex-1 flex flex-col justify-between space-y-3.5 text-xs">
        <div className="p-3 bg-[#14213D] text-white rounded-xl flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-[#F4C95D] uppercase tracking-wider block">Circuit Protocol:</span>
            <span className="font-bold text-xs">3 Rounds • 40s Work / 20s Rest between movements</span>
          </div>
          <span className="text-xs bg-[#38B66B] text-white px-2.5 py-1 rounded-md font-bold">15 Mins Total</span>
        </div>

        {/* 5 Core Movements Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {/* Exercise 1 */}
          <div className="p-3 bg-[#F7F8F3] border border-[#E5E7EB] rounded-xl space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-[#14213D] text-xs uppercase">1. Tempo Bodyweight Squats</span>
              <span className="text-[10px] font-bold text-[#38B66B]">Quads & Glutes</span>
            </div>
            <p className="text-[11px] text-gray-600">Lower down for 3 seconds, pause 1 second at the bottom, stand up strong. Keep chest proud.</p>
            <p className="text-[10px] text-gray-400 font-mono">12–15 Reps or 40 seconds</p>
          </div>

          {/* Exercise 2 */}
          <div className="p-3 bg-[#F7F8F3] border border-[#E5E7EB] rounded-xl space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-[#14213D] text-xs uppercase">2. Pushups (Floor or Desk)</span>
              <span className="text-[10px] font-bold text-[#38B66B]">Chest, Triceps & Core</span>
            </div>
            <p className="text-[11px] text-gray-600">Elbows at a 45-degree angle. If standard floor pushups are tough, incline hands on your study desk.</p>
            <p className="text-[10px] text-gray-400 font-mono">8–12 Reps or 40 seconds</p>
          </div>

          {/* Exercise 3 */}
          <div className="p-3 bg-[#F7F8F3] border border-[#E5E7EB] rounded-xl space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-[#14213D] text-xs uppercase">3. Glute Bridges</span>
              <span className="text-[10px] font-bold text-[#38B66B]">Posterior Chain</span>
            </div>
            <p className="text-[11px] text-gray-600">Lie on back, knees bent, drive hips upward and squeeze glutes hard for 2 seconds at the peak.</p>
            <p className="text-[10px] text-gray-400 font-mono">15 Reps with 2s pause</p>
          </div>

          {/* Exercise 4 */}
          <div className="p-3 bg-[#F7F8F3] border border-[#E5E7EB] rounded-xl space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-[#14213D] text-xs uppercase">4. Prone Y-T-W Raises</span>
              <span className="text-[10px] font-bold text-[#38B66B]">Upper Back & Posture</span>
            </div>
            <p className="text-[11px] text-gray-600">Lie chest-down on dorm carpet. Raise arms in Y, T, and W shapes to reverse computer-desk hunch.</p>
            <p className="text-[10px] text-gray-400 font-mono">10 reps each letter</p>
          </div>
        </div>

        {/* Core Finisher */}
        <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl flex items-center justify-between">
          <div>
            <span className="font-extrabold text-[#14213D] text-xs uppercase block">5. Core Anchor: Forearm Plank</span>
            <p className="text-[11px] text-gray-600">Pull belly button in, squeeze thighs and glutes. Breathe smoothly.</p>
          </div>
          <span className="text-xs font-mono font-bold text-[#14213D] bg-[#F7F8F3] px-3 py-1.5 rounded-lg border border-[#E5E7EB]">
            30–45 Sec Hold
          </span>
        </div>

        <div className="p-2.5 bg-[#38B66B]/15 text-[#14213D] rounded-xl text-center text-[11px] font-semibold">
          Pro Tip: Screenshot or bookmark this page on your phone for immediate dorm sessions.
        </div>
      </div>
    </PageContainer>
  );
};

// Page 21: 20-Minute Workout Timeline (Visual Element #8)
export const Page21WorkoutTimeline: React.FC = () => {
  return (
    <PageContainer
      pageNumber={21}
      partTitle="PART TWO — MOVE"
      category="Visual Concept"
      title="20-Minute Workout Timeline"
      subtitle="Visual flow from warmup to cooldown (Visual Element #8)"
      badge="Visual Element #8"
    >
      <div className="flex-1 flex flex-col justify-between space-y-4 text-xs text-gray-700">
        <p>
          When you know exactly what happens in every 5-minute block, workout resistance disappears. Here is the exact master timeline:
        </p>

        {/* Visual Flow Timeline */}
        <div className="space-y-3">
          {/* Phase 1 */}
          <div className="p-3.5 bg-[#F7F8F3] border-l-4 border-[#F4C95D] rounded-r-xl flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-[#F4C95D] uppercase tracking-wider block">
                MINUTES 00:00 – 03:00 (Warmup & Joint Awakening)
              </span>
              <h4 className="font-bold text-[#14213D] text-xs">Cat-Cow, Hip Openers & Arm Circles</h4>
              <p className="text-[11px] text-gray-600 mt-0.5">
                Lubricate spine and hips after hours of library sitting. Elevates core body temperature smoothly.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-gray-500 shrink-0 ml-4">3 Mins</span>
          </div>

          {/* Phase 2 */}
          <div className="p-3.5 bg-[#38B66B]/10 border-l-4 border-[#38B66B] rounded-r-xl flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-[#38B66B] uppercase tracking-wider block">
                MINUTES 03:00 – 16:00 (Main Strength Circuit)
              </span>
              <h4 className="font-bold text-[#14213D] text-xs">High-Density Bodyweight Rounds</h4>
              <p className="text-[11px] text-gray-600 mt-0.5">
                3 Rounds: Squats → Pushups → Glute Bridges → Prone Rows → Plank. 40s work, 20s rest. Heart rate elevated, muscles engaged.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-[#38B66B] shrink-0 ml-4">13 Mins</span>
          </div>

          {/* Phase 3 */}
          <div className="p-3.5 bg-[#14213D]/5 border-l-4 border-[#14213D] rounded-r-xl flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-[#14213D] uppercase tracking-wider block">
                MINUTES 16:00 – 20:00 (Cooldown & Parasympathetic Reset)
              </span>
              <h4 className="font-bold text-[#14213D] text-xs">Chest Stretch & Box Breathing</h4>
              <p className="text-[11px] text-gray-600 mt-0.5">
                Doorway chest stretch, hip flexor stretch, and 2 minutes of 4-second box breathing to bring your nervous system back to calm focus.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-[#14213D] shrink-0 ml-4">4 Mins</span>
          </div>
        </div>

        <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Clock className="w-5 h-5 text-[#38B66B]" />
            <div>
              <p className="font-bold text-[#14213D] text-xs">Total Session Investment: Exactly 20 Minutes</p>
              <p className="text-[10px] text-gray-500">Zero commute time to gym required. Fits between any two classes.</p>
            </div>
          </div>
          <span className="text-xs font-bold text-[#38B66B] uppercase">High ROI</span>
        </div>
      </div>
    </PageContainer>
  );
};

// Page 22: Campus Gym Demystification
export const Page22CampusGymDemystification: React.FC = () => {
  return (
    <PageContainer
      pageNumber={22}
      partTitle="PART TWO — MOVE"
      category="Teaching"
      title="Campus Gym Demystification"
      subtitle="Crushing beginner anxiety & 'gymtimidation' once and for all"
    >
      <div className="flex-1 flex flex-col justify-between space-y-4 text-xs text-gray-700 leading-relaxed">
        <p>
          Walking into a crowded university gym for the first time can feel overwhelming. Barbells clanging, people posing, confusing machines. Remember: <strong>no one is judging you</strong>. Everyone is focused on their own workout and music.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 bg-white border border-[#E5E7EB] rounded-xl">
            <span className="text-[10px] font-bold text-[#38B66B] uppercase block mb-1">Principle 1</span>
            <h4 className="font-bold text-[#14213D] text-xs uppercase mb-1">Pick Off-Peak Windows</h4>
            <p className="text-gray-600 text-[11px]">
              Campus gyms are packed between 4:30 PM and 7:30 PM. Go early (7:30–9 AM) or mid-afternoon (1:30–3 PM) when machines are wide open.
            </p>
          </div>

          <div className="p-3.5 bg-white border border-[#E5E7EB] rounded-xl">
            <span className="text-[10px] font-bold text-[#F4C95D] uppercase block mb-1">Principle 2</span>
            <h4 className="font-bold text-[#14213D] text-xs uppercase mb-1">Start with Dumbbells</h4>
            <p className="text-gray-600 text-[11px]">
              You don’t need a complicated squat rack on day one. A single pair of light dumbbells lets you perform presses, goblet squats, and rows in one spot.
            </p>
          </div>

          <div className="p-3.5 bg-white border border-[#E5E7EB] rounded-xl">
            <span className="text-[10px] font-bold text-[#14213D] uppercase block mb-1">Principle 3</span>
            <h4 className="font-bold text-[#14213D] text-xs uppercase mb-1">The 3-Item Armor</h4>
            <p className="text-gray-600 text-[11px]">
              Bring three items: (1) Noise-canceling headphones with an energizing playlist, (2) your water bottle, and (3) a small towel. Focus inward.
            </p>
          </div>
        </div>

        <div className="p-3.5 bg-[#F7F8F3] border border-[#E5E7EB] rounded-xl">
          <h4 className="font-bold text-[#14213D] text-xs uppercase mb-1">Gym Etiquette Golden Rules:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-gray-600">
            <p>✓ Always wipe down equipment with spray after use</p>
            <p>✓ Re-rack dumbbells in their correct numeric slots</p>
            <p>✓ Share equipment politely between sets if asked</p>
            <p>✓ Don't sit on a machine scrolling Instagram for 10 mins</p>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

// Page 23: Gym Workout Framework (Visual Element #9)
export const Page23GymWorkoutFramework: React.FC = () => {
  return (
    <PageContainer
      pageNumber={23}
      partTitle="PART TWO — MOVE"
      category="Visual Framework"
      title="Gym Workout Framework"
      subtitle="The 3-Day Push / Pull / Legs System for Campus Rec (Visual Element #9)"
      badge="Visual Element #9"
    >
      <div className="flex-1 flex flex-col justify-between space-y-3 text-xs">
        <p className="text-gray-600">
          When you want to train at the campus gym, use this foolproof 3-day split. Each session takes 30–35 minutes:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Day A: Push */}
          <div className="p-3 bg-[#F7F8F3] border border-[#E5E7EB] rounded-xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="font-extrabold text-[#14213D] text-xs uppercase">DAY A: PUSH</span>
                <span className="text-[9px] bg-[#38B66B]/20 text-[#38B66B] px-1.5 py-0.5 rounded font-bold">Chest / Shldr</span>
              </div>
              <ul className="space-y-1.5 text-[11px] text-gray-700 mt-2">
                <li>• Dumbbell Bench Press (3x10)</li>
                <li>• Seated Dumbbell Shoulder Press (3x10)</li>
                <li>• Incline Pushups or Cable Fly (3x12)</li>
                <li>• Cable Tricep Rope Pushdowns (3x12)</li>
              </ul>
            </div>
            <div className="mt-2 pt-2 border-t border-[#ECEEE7] text-[10px] text-gray-500">
              Rest: 60s between sets
            </div>
          </div>

          {/* Day B: Pull */}
          <div className="p-3 bg-[#F7F8F3] border border-[#E5E7EB] rounded-xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="font-extrabold text-[#14213D] text-xs uppercase">DAY B: PULL</span>
                <span className="text-[9px] bg-[#F4C95D]/30 text-[#B88716] px-1.5 py-0.5 rounded font-bold">Back / Biceps</span>
              </div>
              <ul className="space-y-1.5 text-[11px] text-gray-700 mt-2">
                <li>• Lat Pulldown Machine (3x10)</li>
                <li>• Seated Cable Row or DB Row (3x10)</li>
                <li>• Face Pulls (Posture builder) (3x15)</li>
                <li>• Dumbbell Bicep Curls (3x12)</li>
              </ul>
            </div>
            <div className="mt-2 pt-2 border-t border-[#ECEEE7] text-[10px] text-gray-500">
              Rest: 60s between sets
            </div>
          </div>

          {/* Day C: Legs */}
          <div className="p-3 bg-[#F7F8F3] border border-[#E5E7EB] rounded-xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="font-extrabold text-[#14213D] text-xs uppercase">DAY C: LEGS</span>
                <span className="text-[9px] bg-[#14213D]/20 text-[#14213D] px-1.5 py-0.5 rounded font-bold">Legs / Core</span>
              </div>
              <ul className="space-y-1.5 text-[11px] text-gray-700 mt-2">
                <li>• Goblet Squat with Dumbbell (3x10)</li>
                <li>• Romanian Deadlift (DBs) (3x10)</li>
                <li>• Walking Dumbbell Lunges (3x10/leg)</li>
                <li>• Hanging Knee Raises or Plank (3x30s)</li>
              </ul>
            </div>
            <div className="mt-2 pt-2 border-t border-[#ECEEE7] text-[10px] text-gray-500">
              Rest: 75s between sets
            </div>
          </div>
        </div>

        <div className="p-3 bg-white border border-[#38B66B]/30 rounded-xl flex items-center justify-between text-xs">
          <div>
            <span className="font-bold text-[#14213D]">Progressive Overload Rule: </span>
            <span className="text-gray-600">When you can perform all 3 sets with great form at the top rep range, move up by 1–2 kg.</span>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

// Page 24: Cardio Without Burnout
export const Page24CardioWithoutBurnout: React.FC = () => {
  return (
    <PageContainer
      pageNumber={24}
      partTitle="PART TWO — MOVE"
      category="Teaching"
      title="Cardio Without Burnout"
      subtitle="Protecting your cognitive stamina for lectures & exams"
    >
      <div className="flex-1 flex flex-col justify-between space-y-4 text-xs text-gray-700 leading-relaxed">
        <p>
          Students often make the mistake of running until they feel sick, hoping to "burn off" weekend beers. High-intensity cardio creates immense central nervous system fatigue and spikes appetite, leading to library bingeing.
        </p>

        <div className="p-3.5 bg-white border border-[#E5E7EB] rounded-xl space-y-2">
          <h4 className="font-bold text-[#14213D] text-xs uppercase">The Zone-2 Student Cardio Model</h4>
          <p className="text-[11px] text-gray-600">
            Zone 2 cardio is aerobic work where you can still speak in full sentences without gasping. It builds mitochondrial density, burns fat efficiently, and leaves you feeling mentally refreshed rather than exhausted.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-center">
            <div className="p-2 bg-[#F7F8F3] rounded-lg">
              <span className="font-bold text-[#14213D] text-xs block">Incline Treadmill Walk</span>
              <span className="text-[10px] text-gray-500">12% incline, 4.5 km/h, 20m</span>
            </div>
            <div className="p-2 bg-[#F7F8F3] rounded-lg">
              <span className="font-bold text-[#14213D] text-xs block">Outdoor Campus Jog</span>
              <span className="text-[10px] text-gray-500">Conversational pace, 20m</span>
            </div>
            <div className="p-2 bg-[#F7F8F3] rounded-lg">
              <span className="font-bold text-[#14213D] text-xs block">Stationary Rec Bike</span>
              <span className="text-[10px] text-gray-500">Read flashcards while pedaling</span>
            </div>
          </div>
        </div>

        <div className="p-3.5 bg-[#38B66B]/10 border border-[#38B66B]/30 rounded-xl">
          <h4 className="font-bold text-[#14213D] text-xs uppercase mb-1">
            The Flashcard Cardio Hack:
          </h4>
          <p className="text-gray-700 text-[11px]">
            Hop on a stationary gym bike or stair stepper at low resistance, open your Anki flashcards or lecture slides, and study while moving. 20 minutes flies by and your memory retention is boosted by active blood flow.
          </p>
        </div>
      </div>
    </PageContainer>
  );
};

// Page 25: Weekly Fitness Planner (Visual Element #10)
export const Page25WeeklyFitnessPlanner: React.FC = () => {
  const { state, updateFitnessScheduleDay } = useWorkbook();
  const schedule = state.fitnessPlanner.schedule;

  const daysKey = [
    { key: 'mon', label: 'Mon' },
    { key: 'tue', label: 'Tue' },
    { key: 'wed', label: 'Wed' },
    { key: 'thu', label: 'Thu' },
    { key: 'fri', label: 'Fri' },
    { key: 'sat', label: 'Sat' },
    { key: 'sun', label: 'Sun' },
  ];

  return (
    <PageContainer
      pageNumber={25}
      partTitle="PART TWO — MOVE"
      category="Planner"
      title="Weekly Fitness Planner"
      subtitle="Interactive Mon–Sun movement schedule (Visual Element #10)"
      badge="Visual Element #10"
    >
      <div className="flex-1 flex flex-col justify-between space-y-3 text-xs">
        <p className="text-[11px] text-gray-600">
          Click any day to adjust your planned session, time, or location. Check the box when completed:
        </p>

        <div className="space-y-2 overflow-y-auto max-h-[620px] pr-1">
          {daysKey.map(({ key, label }) => {
            const item = schedule[key] || { day: label, activity: '', duration: '', location: '', completed: false };
            return (
              <div
                key={key}
                className={`p-2.5 rounded-xl border transition-all flex items-center justify-between gap-2.5 ${
                  item.completed ? 'bg-[#38B66B]/10 border-[#38B66B]' : 'bg-white border-[#E5E7EB]'
                }`}
              >
                <div className="flex items-center gap-3 flex-1">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={(e) => updateFitnessScheduleDay(key, { completed: e.target.checked })}
                    className="w-4 h-4 rounded text-[#38B66B] accent-[#38B66B] cursor-pointer"
                  />
                  <span className="w-10 font-extrabold text-[#14213D] text-xs">{item.day.slice(0, 3)}</span>

                  <input
                    type="text"
                    placeholder="Activity (e.g. Dorm Circuit)"
                    value={item.activity}
                    onChange={(e) => updateFitnessScheduleDay(key, { activity: e.target.value })}
                    className="flex-1 bg-[#F7F8F3] border border-[#E5E7EB] rounded-md px-2 py-1 text-xs text-[#14213D] focus:border-[#38B66B] focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="20 min"
                    value={item.duration}
                    onChange={(e) => updateFitnessScheduleDay(key, { duration: e.target.value })}
                    className="w-16 bg-[#F7F8F3] border border-[#E5E7EB] rounded-md px-1.5 py-1 text-xs text-center text-gray-700 focus:border-[#38B66B] focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Dorm / Gym"
                    value={item.location}
                    onChange={(e) => updateFitnessScheduleDay(key, { location: e.target.value })}
                    className="w-24 bg-[#F7F8F3] border border-[#E5E7EB] rounded-md px-1.5 py-1 text-xs text-center text-gray-700 focus:border-[#38B66B] focus:outline-none hidden sm:block"
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-2.5 bg-[#F7F8F3] border border-[#E5E7EB] rounded-xl flex items-center justify-between text-[11px] text-gray-600">
          <span>Target: 3 Strength Sessions + Daily Campus Steps</span>
          <span className="font-bold text-[#38B66B]">
            Completed: {(Object.values(schedule) as { completed?: boolean }[]).filter(d => d.completed).length} / 7 Days
          </span>
        </div>
      </div>
    </PageContainer>
  );
};

// Page 26: Progression Worksheet (Visual Element #11)
export const Page26ProgressionWorksheet: React.FC = () => {
  const { state, updateProgressionNote } = useWorkbook();
  const notes = state.progressionNotes;

  return (
    <PageContainer
      pageNumber={26}
      partTitle="PART TWO — MOVE"
      category="Worksheet"
      title="Progression Worksheet"
      subtitle="Tracking strength, reps & energy gains over time (Visual Element #11)"
      badge="Visual Element #11"
    >
      <div className="flex-1 flex flex-col justify-between space-y-3.5 text-xs">
        <p className="text-gray-600">
          Progress is not just weight on a barbell. For students, progress is feeling lighter on your feet, climbing stairs without panting, and doing more pushups in your dorm. Record your progress notes:
        </p>

        <div className="space-y-3">
          <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl">
            <label className="block text-[11px] font-bold text-[#14213D] uppercase mb-1">
              Pushup Progression (Week 1 vs Current):
            </label>
            <input
              type="text"
              placeholder="e.g., Started with 6 on knees -> Now doing 12 clean floor pushups"
              value={notes.pushups || ''}
              onChange={(e) => updateProgressionNote('pushups', e.target.value)}
              className="w-full bg-[#F7F8F3] border border-[#E5E7EB] rounded-lg px-3 py-1.5 text-xs text-[#14213D] focus:border-[#38B66B] focus:outline-none"
            />
          </div>

          <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl">
            <label className="block text-[11px] font-bold text-[#14213D] uppercase mb-1">
              Squat & Lower Body Strength / Form:
            </label>
            <input
              type="text"
              placeholder="e.g., Deeper squat depth, knees feel stable, added 5kg dumbbell goblet squat"
              value={notes.squats || ''}
              onChange={(e) => updateProgressionNote('squats', e.target.value)}
              className="w-full bg-[#F7F8F3] border border-[#E5E7EB] rounded-lg px-3 py-1.5 text-xs text-[#14213D] focus:border-[#38B66B] focus:outline-none"
            />
          </div>

          <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl">
            <label className="block text-[11px] font-bold text-[#14213D] uppercase mb-1">
              Daily Campus Step Average Progression:
            </label>
            <input
              type="text"
              placeholder="e.g., Week 1 average was 4,200 steps -> Week 3 averaging 8,500 steps"
              value={notes.stepsAvg || ''}
              onChange={(e) => updateProgressionNote('stepsAvg', e.target.value)}
              className="w-full bg-[#F7F8F3] border border-[#E5E7EB] rounded-lg px-3 py-1.5 text-xs text-[#14213D] focus:border-[#38B66B] focus:outline-none"
            />
          </div>

          <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl">
            <label className="block text-[11px] font-bold text-[#14213D] uppercase mb-1">
              Energy & Mental Stamina During Lectures:
            </label>
            <textarea
              rows={2}
              placeholder="e.g., No longer getting the 3 PM lecture eye-droop; feeling alert and focused..."
              value={notes.energyNotes || ''}
              onChange={(e) => updateProgressionNote('energyNotes', e.target.value)}
              className="w-full bg-[#F7F8F3] border border-[#E5E7EB] rounded-lg p-2 text-xs text-[#14213D] focus:border-[#38B66B] focus:outline-none"
            />
          </div>
        </div>

        <div className="p-3 bg-[#38B66B]/15 border border-[#38B66B]/30 rounded-xl text-center text-[11px] font-semibold text-[#14213D]">
          Celebrate every single rep increase. Consistency compound interest is real.
        </div>
      </div>
    </PageContainer>
  );
};

// Page 27: Movement Action Plan & Quick Wins
export const Page27MovementActionPlan: React.FC<PartTwoProps> = ({ onJumpToPage }) => {
  return (
    <PageContainer
      pageNumber={27}
      partTitle="PART TWO — MOVE"
      category="Action Plan"
      title="Movement Action Plan & Quick Wins"
      subtitle="What to do next before entering Part Three (Fuel)"
    >
      <div className="flex-1 flex flex-col justify-between space-y-4 text-xs">
        <div className="p-3.5 bg-[#38B66B]/15 border border-[#38B66B]/30 rounded-xl">
          <h4 className="font-bold text-[#14213D] text-xs uppercase mb-1">
            Part Two Movement Action Protocol:
          </h4>
          <p className="text-gray-700 text-[11px]">
            You now possess the complete movement playbook: no-equipment dorm circuits, the campus commute step formula, and gym demystification. Lock in your next 3 moves:
          </p>
        </div>

        <div className="space-y-3">
          <div className="p-3.5 bg-white border border-[#E5E7EB] rounded-xl flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-[#14213D] text-white flex items-center justify-center font-bold text-xs shrink-0">
              1
            </span>
            <div>
              <h4 className="font-bold text-[#14213D] text-xs uppercase">Pick Your 3 Movement Days</h4>
              <p className="text-gray-600 text-[11px] mt-0.5">
                Block three 20-minute slots on your weekly schedule (e.g. Mon / Wed / Fri at 8:30 AM). Put them in your phone calendar as non-negotiable study appointments with yourself.
              </p>
            </div>
          </div>

          <div className="p-3.5 bg-white border border-[#E5E7EB] rounded-xl flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-[#14213D] text-white flex items-center justify-center font-bold text-xs shrink-0">
              2
            </span>
            <div>
              <h4 className="font-bold text-[#14213D] text-xs uppercase">Complete Your First 15-Minute Dorm Circuit Today</h4>
              <p className="text-gray-600 text-[11px] mt-0.5">
                Don't wait for "next Monday." Perform 1 round of squats, pushups, glute bridges, and plank right now in your room. Break inertia.
              </p>
            </div>
          </div>

          <div className="p-3.5 bg-white border border-[#E5E7EB] rounded-xl flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-[#14213D] text-white flex items-center justify-center font-bold text-xs shrink-0">
              3
            </span>
            <div>
              <h4 className="font-bold text-[#14213D] text-xs uppercase">Turn On Step Tracking</h4>
              <p className="text-gray-600 text-[11px] mt-0.5">
                Make sure your phone’s built-in Health / Google Fit app is enabled so you can watch your campus steps climb toward 8,000 every day.
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-[#14213D] text-white rounded-xl flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold text-[#F4C95D] uppercase">What to do next:</h4>
            <p className="text-xs text-gray-200">Unlock Part Three: Student Fuel, Master Grocery Lists & 15-Minute Meals.</p>
          </div>
          <button
            onClick={() => onJumpToPage(28)}
            className="no-print bg-[#38B66B] hover:bg-[#2fa35e] text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <span>Enter Part Three</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </PageContainer>
  );
};
