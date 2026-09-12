import React from 'react';

// Front Matter
import {
  CoverPage,
  CopyrightDisclaimerPage,
  TableOfContentsPage,
  FourFoundationsPage,
  HowToUsePage,
} from './pages/FrontMatterPages';

// Section Divider
import { SectionDividerPage } from './pages/SectionDividerPage';

// Part One
import {
  Page7UniversityReality,
  Page8AllOrNothing,
  Page9Day1Assessment,
  Page10LifestyleAudit,
  Page11GoalSetting,
  Page12MinimumCommitment,
  Page13SemesterBaseline,
  Page14FrictionPoints,
  Page15PartOneChecklist,
} from './pages/PartOnePages';

// Part Two
import {
  Page17MovementHierarchy,
  Page18CampusCommute,
  Page19DormTrainingRules,
  Page20NoEquipmentCard,
  Page21WorkoutTimeline,
  Page22CampusGymDemystification,
  Page23GymWorkoutFramework,
  Page24CardioWithoutBurnout,
  Page25WeeklyFitnessPlanner,
  Page26ProgressionWorksheet,
  Page27MovementActionPlan,
} from './pages/PartTwoPages';

// Part Three
import {
  Page29NutritionReality,
  Page30StudentMealFormula,
  Page31GroceryChecklist,
  Page32DormCookingRecipes,
  Page33DiningHallNavigator,
  Page34TakeoutNavigator,
  Page35HydrationCaffeine,
  Page36AlcoholSocialBalance,
  Page37WeeklyMealPlanner,
  Page38DormKitchenBatchPrep,
  Page39FuelActionPlan,
} from './pages/PartThreePages';

// Part Four
import {
  Page41ScienceOfHabits,
  Page42HabitStacking,
  Page43EnvironmentReset,
  Page44NeverMissTwice,
  Page45ResetAfterFallingOffTrack,
  Page46SleepBiologicalRecovery,
  Page47NightRoutine,
  Page48RecoveryPlanner,
  Page49MentalRechargeMenu,
  Page50HabitActionPlan,
} from './pages/PartFourPages';

// Part Five
import {
  Page52ChallengeRules,
  Page53ChallengeCalendar,
  Page54WeekOneChallenge,
  WeeklyScorecardPage,
  Page56WeekTwoChallenge,
  Page58WeekThreeChallenge,
  Page60WeekFourChallenge,
  Page62DailyCheckinTemplate,
} from './pages/PartFivePages';

// Part Six
import {
  Page64Beyond30Days,
  Page65PostReflection,
  Page66ExamPeriodGuide,
  Page67SemesterMaintenancePlan,
  Page68CertificateOfCompletion,
} from './pages/PartSixPages';

interface PageRendererProps {
  pageNumber: number;
  onJumpToPage?: (page: number) => void;
}

export const PageRenderer: React.FC<PageRendererProps> = ({
  pageNumber,
  onJumpToPage = (_page: number) => {},
}) => {
  switch (pageNumber) {
    // Front Matter
    case 1:
      return <CoverPage onJumpToPage={onJumpToPage} />;
    case 2:
      return <CopyrightDisclaimerPage />;
    case 3:
      return <TableOfContentsPage onJumpToPage={onJumpToPage} />;
    case 4:
      return <FourFoundationsPage />;
    case 5:
      return <HowToUsePage onJumpToPage={onJumpToPage} />;

    // Part One: RESET (Pages 6–15)
    case 6:
      return (
        <SectionDividerPage
          pageNumber={6}
          partNumber="PART ONE"
          title="RESET"
          subtitle="The Mindset, The Honest Baseline & Your Fallback Plan"
          quote="You do not rise to the level of your goals. You fall to the level of your systems."
          quoteAuthor="James Clear"
          objectives={[
            'Overcome the student all-or-nothing trap',
            'Audit your true semester energy and time leaks',
            'Establish your Day 1 fitness baseline',
            'Design your Bad-Day Minimum Viable Fallback',
          ]}
          imageUrl="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80"
          imageCaption="University Library — Building mental clarity before physical momentum"
          onNextPage={() => onJumpToPage(7)}
        />
      );
    case 7:
      return <Page7UniversityReality />;
    case 8:
      return <Page8AllOrNothing />;
    case 9:
      return <Page9Day1Assessment />;
    case 10:
      return <Page10LifestyleAudit />;
    case 11:
      return <Page11GoalSetting />;
    case 12:
      return <Page12MinimumCommitment />;
    case 13:
      return <Page13SemesterBaseline />;
    case 14:
      return <Page14FrictionPoints />;
    case 15:
      return <Page15PartOneChecklist onJumpToPage={onJumpToPage} />;

    // Part Two: MOVE (Pages 16–27)
    case 16:
      return (
        <SectionDividerPage
          pageNumber={16}
          partNumber="PART TWO"
          title="MOVE"
          subtitle="The Student Movement Hierarchy & Dorm Room Strength"
          quote="Action creates motivation, not the other way around. Move for 10 minutes, and the rest follows."
          quoteAuthor="The Fit Student Blueprint"
          objectives={[
            'Master the Student Movement Hierarchy (Steps > Weights > Cardio)',
            'Bank 8,000+ campus steps without deliberate gym visits',
            'Execute the 15-Minute No-Equipment Dorm Routine',
            'Demystify the campus recreation gym with a 3-Day Split',
          ]}
          imageUrl="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80"
          imageCaption="Dorm & Gym Training — High density, zero noise, maximum efficiency"
          onNextPage={() => onJumpToPage(17)}
        />
      );
    case 17:
      return <Page17MovementHierarchy />;
    case 18:
      return <Page18CampusCommute />;
    case 19:
      return <Page19DormTrainingRules />;
    case 20:
      return <Page20NoEquipmentCard />;
    case 21:
      return <Page21WorkoutTimeline />;
    case 22:
      return <Page22CampusGymDemystification />;
    case 23:
      return <Page23GymWorkoutFramework />;
    case 24:
      return <Page24CardioWithoutBurnout />;
    case 25:
      return <Page25WeeklyFitnessPlanner />;
    case 26:
      return <Page26ProgressionWorksheet />;
    case 27:
      return <Page27MovementActionPlan onJumpToPage={onJumpToPage} />;

    // Part Three: FUEL (Pages 28–39)
    case 28:
      return (
        <SectionDividerPage
          pageNumber={28}
          partNumber="PART THREE"
          title="FUEL"
          subtitle="Affordable Student Nutrition, Master Grocery Lists & Fast Meals"
          quote="Eat to fuel your brain through lectures, not to comfort temporary stress."
          quoteAuthor="The Fit Student Blueprint"
          objectives={[
            'Master the 4-Quadrant Student Meal Formula without food scales',
            'Shop the $35–$45 master grocery list for high-protein dorm living',
            'Cook 4 delicious 15-minute dorm meals with 1 pan',
            'Navigate dining halls, fast-food takeout & campus social drinks',
          ]}
          imageUrl="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80"
          imageCaption="Simple, High-Protein Student Fuel — Sustaining mental stamina all semester"
          onNextPage={() => onJumpToPage(29)}
        />
      );
    case 29:
      return <Page29NutritionReality />;
    case 30:
      return <Page30StudentMealFormula />;
    case 31:
      return <Page31GroceryChecklist />;
    case 32:
      return <Page32DormCookingRecipes />;
    case 33:
      return <Page33DiningHallNavigator />;
    case 34:
      return <Page34TakeoutNavigator />;
    case 35:
      return <Page35HydrationCaffeine />;
    case 36:
      return <Page36AlcoholSocialBalance />;
    case 37:
      return <Page37WeeklyMealPlanner />;
    case 38:
      return <Page38DormKitchenBatchPrep />;
    case 39:
      return <Page39FuelActionPlan onJumpToPage={onJumpToPage} />;

    // Part Four: HABITS (Pages 40–50)
    case 40:
      return (
        <SectionDividerPage
          pageNumber={40}
          partNumber="PART FOUR"
          title="HABITS"
          subtitle="Habit Stacking, Environment Architecture & Deep Sleep"
          quote="Environment is the invisible hand that shapes human behavior."
          quoteAuthor="James Clear"
          objectives={[
            'Automate fitness using the Cue-Routine-Reward student loop',
            'Perform the 5-minute dorm and desk environment reset',
            'Execute the compassionate Never-Miss-Twice rebound protocol',
            'Lock in 7.5 hours of restorative sleep to boost academic GPA',
          ]}
          imageUrl="https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?auto=format&fit=crop&w=1200&q=80"
          imageCaption="Evening Decompression — Setting up tomorrow's victories tonight"
          onNextPage={() => onJumpToPage(41)}
        />
      );
    case 41:
      return <Page41ScienceOfHabits />;
    case 42:
      return <Page42HabitStacking />;
    case 43:
      return <Page43EnvironmentReset />;
    case 44:
      return <Page44NeverMissTwice />;
    case 45:
      return <Page45ResetAfterFallingOffTrack />;
    case 46:
      return <Page46SleepBiologicalRecovery />;
    case 47:
      return <Page47NightRoutine />;
    case 48:
      return <Page48RecoveryPlanner />;
    case 49:
      return <Page49MentalRechargeMenu />;
    case 50:
      return <Page50HabitActionPlan onJumpToPage={onJumpToPage} />;

    // Part Five: THE 30-DAY CHALLENGE (Pages 51–62)
    case 51:
      return (
        <SectionDividerPage
          pageNumber={51}
          partNumber="PART FIVE"
          title="THE 30-DAY CHALLENGE"
          subtitle="Your Interactive Operating System & Daily Execution Tracker"
          quote="We don't need a single heroic day. We need 30 days of quiet, ordinary consistency."
          quoteAuthor="The Fit Student Blueprint"
          objectives={[
            'Log 30 daily days of Move, Fuel & Recovery habits',
            'Sprint through 4 progressive weekly habit themes',
            'Complete Sunday scorecards to review wins and friction',
            'Master the 60-second daily check-in routine',
          ]}
          imageUrl="https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1200&q=80"
          imageCaption="Campus Quad — The 30-day journey from intention to permanent habit"
          onNextPage={() => onJumpToPage(52)}
        />
      );
    case 52:
      return <Page52ChallengeRules />;
    case 53:
      return <Page53ChallengeCalendar />;
    case 54:
      return <Page54WeekOneChallenge />;
    case 55:
      return (
        <WeeklyScorecardPage
          pageNumber={55}
          weekNumber={1}
          title="Weekly Scorecard — Week 1"
          subtitle="The Movement Anchor Review"
        />
      );
    case 56:
      return <Page56WeekTwoChallenge />;
    case 57:
      return (
        <WeeklyScorecardPage
          pageNumber={57}
          weekNumber={2}
          title="Weekly Scorecard — Week 2"
          subtitle="Fuel Foundations Review"
        />
      );
    case 58:
      return <Page58WeekThreeChallenge />;
    case 59:
      return (
        <WeeklyScorecardPage
          pageNumber={59}
          weekNumber={3}
          title="Weekly Scorecard — Week 3"
          subtitle="Sleep & Energy Review"
        />
      );
    case 60:
      return <Page60WeekFourChallenge />;
    case 61:
      return (
        <WeeklyScorecardPage
          pageNumber={61}
          weekNumber={4}
          title="Weekly Scorecard — Week 4"
          subtitle="Championship Lockdown Review"
        />
      );
    case 62:
      return <Page62DailyCheckinTemplate />;

    // Part Six: KEEP GOING (Pages 63–68)
    case 63:
      return (
        <SectionDividerPage
          pageNumber={63}
          partNumber="PART SIX"
          title="KEEP GOING"
          subtitle="The Sustainable Semester System & Official Certificate"
          quote="You did not change for 30 days. You changed who you are."
          quoteAuthor="The Fit Student Blueprint"
          objectives={[
            'Transition from 30-day sprint to lifelong semester maintenance',
            'Audit your transformation in strength, stamina, and GPA focus',
            'Deploy the Exam Period Survival Guide during high-stress finals',
            'Receive your Official Verified Certificate of Completion',
          ]}
          imageUrl="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80"
          imageCaption="University Commencement — Lifelong health, lifelong confidence"
          onNextPage={() => onJumpToPage(64)}
        />
      );
    case 64:
      return <Page64Beyond30Days />;
    case 65:
      return <Page65PostReflection />;
    case 66:
      return <Page66ExamPeriodGuide />;
    case 67:
      return <Page67SemesterMaintenancePlan />;
    case 68:
      return <Page68CertificateOfCompletion />;

    default:
      return <CoverPage onJumpToPage={onJumpToPage} />;
  }
};
