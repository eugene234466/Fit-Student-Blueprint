export type PageCategory = 
  | 'frontmatter'
  | 'part1'
  | 'part2'
  | 'part3'
  | 'part4'
  | 'part5'
  | 'part6';

export type PageType = 
  | 'cover'
  | 'teaching'
  | 'concept'
  | 'worksheet'
  | 'checklist'
  | 'tracker'
  | 'planner'
  | 'challenge'
  | 'reflection'
  | 'divider'
  | 'final';

export interface BookPage {
  id: number;
  pageNumber: number;
  part: PageCategory;
  partTitle: string;
  title: string;
  subtitle?: string;
  type: PageType;
  estimatedReadTime?: string;
  badge?: string;
}

export interface UserAssessmentData {
  energyLevel: number; // 1-10
  currentActivity: string;
  sleepHours: string;
  mealsQuality: string;
  biggestObstacle: string;
  pushupsCount: string;
  bodyweightSquats: string;
  plankSeconds: string;
  dailyStepEstimate: string;
  physicalComfortNotes: string;
  day1Date: string;
}

export interface UserGoalsData {
  coreWhy: string;
  thirtyDayPhysicalGoal: string;
  thirtyDayHabitGoal: string;
  thirtyDayMentalGoal: string;
  examPeriodStrategy: string;
  rewardForCompletion: string;
}

export interface UserMinimumCommitmentData {
  badDayWorkout: string;
  badDayMeal: string;
  badDayBedtime: string;
  accountabilityPartner: string;
  signature: string;
  date: string;
}

export interface UserWorkoutPlannerData {
  schedule: {
    [key: string]: {
      day: string;
      activity: string;
      duration: string;
      location: string;
      completed: boolean;
    };
  };
}

export interface UserMealPlannerData {
  budgetPerWeek: string;
  batchCookDay: string;
  plannedMeals: {
    [key: string]: {
      day: string;
      lunch: string;
      dinner: string;
      snack: string;
    };
  };
  groceryChecklist: { [key: string]: boolean };
}

export interface UserHabitData {
  habitStacks: Array<{
    id: string;
    existingRoutine: string;
    newHabit: string;
    reward: string;
  }>;
  dormResetChecklist: { [key: string]: boolean };
  reboundProtocolAnswers: {
    trigger: string;
    compassionNote: string;
    immediateNextAction: string;
  };
}

export interface UserRecoveryData {
  windDownTime: string;
  screenCurfewTime: string;
  targetWakeTime: string;
  recoveryHabits: { [key: string]: boolean };
  stressBusters: string;
}

export interface ChallengeDayRecord {
  day: number;
  date?: string;
  completed: boolean;
  workoutDone: boolean;
  fuelDone: boolean;
  recoveryDone: boolean;
  energyRating: number; // 1-5
  note: string;
}

export interface WeeklyScorecardData {
  weekNumber: number;
  workoutsCompleted: number;
  targetWorkouts: number;
  mealsCooked: number;
  targetMeals: number;
  avgSleepHours: number;
  energyRating: number; // 1-10
  biggestWin: string;
  biggestChallenge: string;
  adjustmentForNextWeek: string;
}

export interface UserWorkbookState {
  version: number;
  assessment: UserAssessmentData;
  goals: UserGoalsData;
  minimumCommitment: UserMinimumCommitmentData;
  fitnessPlanner: UserWorkoutPlannerData;
  mealPlanner: UserMealPlannerData;
  habits: UserHabitData;
  recovery: UserRecoveryData;
  challengeDays: { [dayNumber: number]: ChallengeDayRecord };
  weeklyScorecards: { [weekNumber: number]: WeeklyScorecardData };
  progressionNotes: { [exercise: string]: string };
  day1VsDay30: {
    day1Energy: string;
    day30Energy: string;
    day1Strength: string;
    day30Strength: string;
    day1HabitConsistency: string;
    day30HabitConsistency: string;
    biggestTransformation: string;
    adviceToPastSelf: string;
  };
  personalSystem: {
    nonNegotiableMovement: string;
    goToStudentMeals: string;
    recoveryRule: string;
    semesterSurvivalTactic: string;
  };
  nextThirtyDays: {
    focusArea: string;
    targetMilestones: string;
    contingencyPlan: string;
  };
  finalCommitment: {
    studentName: string;
    pledgeDate: string;
    signed: boolean;
  };
  customNotes: { [pageId: number]: string };
  completedPages: { [pageId: number]: boolean };
  bookmarkedPages: number[];
}
