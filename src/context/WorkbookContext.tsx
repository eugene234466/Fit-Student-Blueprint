import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserWorkbookState, ChallengeDayRecord, WeeklyScorecardData } from '../types';
import { initialWorkbookState, sampleFilledState } from '../data/defaultState';

const STORAGE_KEY = 'the_fit_student_blueprint_state_v1';
const PAGE_STORAGE_KEY = 'the_fit_student_blueprint_page_v1';
export const UNLOCKED_STORAGE_KEY = 'the_fit_student_blueprint_unlocked_v1';
export const PARTNER_REVIEW_KEY = 'the_fit_student_blueprint_partner_review_v1';
export const FREE_SAMPLE_MAX_PAGE = 8;

interface WorkbookContextType {
  state: UserWorkbookState;
  currentPage: number;
  totalPages: number;
  isUnlocked: boolean;
  isPartnerReview: boolean;
  FREE_SAMPLE_MAX_PAGE: number;
  unlockFullAccess: (buyerInfo?: { email?: string; reference?: string; tier?: string }) => void;
  lockAccess: () => void;
  activatePartnerReviewPass: () => void;
  deactivatePartnerReviewPass: () => void;
  setCurrentPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  markPageCompleted: (pageId: number) => void;
  updateAssessment: (data: Partial<UserWorkbookState['assessment']>) => void;
  updateGoals: (data: Partial<UserWorkbookState['goals']>) => void;
  updateMinimumCommitment: (data: Partial<UserWorkbookState['minimumCommitment']>) => void;
  updateFitnessScheduleDay: (key: string, data: Partial<UserWorkbookState['fitnessPlanner']['schedule']['mon']>) => void;
  updateMealPlanner: (data: Partial<UserWorkbookState['mealPlanner']>) => void;
  toggleGroceryItem: (itemKey: string) => void;
  updateHabitStack: (index: number, data: Partial<UserWorkbookState['habits']['habitStacks'][0]>) => void;
  addHabitStack: () => void;
  removeHabitStack: (index: number) => void;
  toggleDormResetItem: (itemKey: string) => void;
  updateReboundProtocol: (data: Partial<UserWorkbookState['habits']['reboundProtocolAnswers']>) => void;
  updateRecovery: (data: Partial<UserWorkbookState['recovery']>) => void;
  toggleRecoveryHabit: (key: string) => void;
  updateChallengeDay: (dayNumber: number, data: Partial<ChallengeDayRecord>) => void;
  updateWeeklyScorecard: (weekNumber: number, data: Partial<WeeklyScorecardData>) => void;
  updateProgressionNote: (key: string, val: string) => void;
  updateDay1VsDay30: (data: Partial<UserWorkbookState['day1VsDay30']>) => void;
  updatePersonalSystem: (data: Partial<UserWorkbookState['personalSystem']>) => void;
  updateNextThirtyDays: (data: Partial<UserWorkbookState['nextThirtyDays']>) => void;
  updateFinalCommitment: (data: Partial<UserWorkbookState['finalCommitment']>) => void;
  setPageNote: (pageId: number, note: string) => void;
  togglePageCompleted: (pageId: number) => void;
  toggleBookmark: (pageId: number) => void;
  loadSampleData: () => void;
  resetAllData: () => void;
  exportDataJSON: () => void;
  importDataJSON: (jsonStr: string) => boolean;
  completionPercentage: number;
}

const WorkbookContext = createContext<WorkbookContextType | undefined>(undefined);

export const WorkbookProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const totalPages = 68;

  // Initialize currentPage with URL hash fallback, localStorage fallback, and default to 1
  const [currentPage, setCurrentPageState] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      try {
        // 1. Check URL hash (e.g. #page-12 or #12)
        const hashMatch = window.location.hash.match(/#?(?:page-)?(\d+)/i);
        if (hashMatch) {
          const p = parseInt(hashMatch[1], 10);
          if (p >= 1 && p <= totalPages) {
            return p;
          }
        }
        // 2. Check localStorage
        const savedPage = localStorage.getItem(PAGE_STORAGE_KEY);
        if (savedPage) {
          const p = parseInt(savedPage, 10);
          if (p >= 1 && p <= totalPages) {
            return p;
          }
        }
      } catch {
        // ignore
      }
    }
    return 1;
  });

  const [isPartnerReview, setIsPartnerReview] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(PARTNER_REVIEW_KEY);
        return saved === 'true';
      } catch {
        return false;
      }
    }
    return false;
  });

  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      try {
        const partner = localStorage.getItem(PARTNER_REVIEW_KEY);
        if (partner === 'true') return true;
        const saved = localStorage.getItem(UNLOCKED_STORAGE_KEY);
        if (saved === 'true') return true;
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed?.unlocked) return true;
        }
        const hash = window.location.hash;
        const search = window.location.search;
        if (
          hash.includes('payment-success=true') ||
          search.includes('trxref=') ||
          search.includes('reference=')
        ) {
          localStorage.setItem(
            UNLOCKED_STORAGE_KEY,
            JSON.stringify({ unlocked: true, timestamp: Date.now() })
          );
          return true;
        }
      } catch {
        // ignore
      }
    }
    return false;
  });

  const unlockFullAccess = (buyerInfo?: { email?: string; reference?: string; tier?: string }) => {
    setIsUnlocked(true);
    try {
      localStorage.setItem(
        UNLOCKED_STORAGE_KEY,
        JSON.stringify({
          unlocked: true,
          timestamp: Date.now(),
          ...buyerInfo,
        })
      );
    } catch {
      // ignore
    }
  };

  const activatePartnerReviewPass = () => {
    setIsPartnerReview(true);
    setIsUnlocked(true);
    try {
      localStorage.setItem(PARTNER_REVIEW_KEY, 'true');
      localStorage.setItem(
        UNLOCKED_STORAGE_KEY,
        JSON.stringify({
          unlocked: true,
          isPartnerReview: true,
          timestamp: Date.now(),
          tier: 'partner_review',
        })
      );
    } catch {
      // ignore
    }
  };

  const deactivatePartnerReviewPass = () => {
    setIsPartnerReview(false);
    setIsUnlocked(false);
    try {
      localStorage.removeItem(PARTNER_REVIEW_KEY);
      localStorage.removeItem(UNLOCKED_STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const lockAccess = () => {
    setIsUnlocked(false);
    setIsPartnerReview(false);
    try {
      localStorage.removeItem(UNLOCKED_STORAGE_KEY);
      localStorage.removeItem(PARTNER_REVIEW_KEY);
    } catch {
      // ignore
    }
  };

  const [state, setState] = useState<UserWorkbookState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.version === 1) {
          return { ...initialWorkbookState, ...parsed };
        }
      }
    } catch {
      // ignore
    }
    return initialWorkbookState;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [state]);

  const updateAssessment = (data: Partial<UserWorkbookState['assessment']>) => {
    setState(prev => ({
      ...prev,
      assessment: { ...prev.assessment, ...data }
    }));
  };

  const updateGoals = (data: Partial<UserWorkbookState['goals']>) => {
    setState(prev => ({
      ...prev,
      goals: { ...prev.goals, ...data }
    }));
  };

  const updateMinimumCommitment = (data: Partial<UserWorkbookState['minimumCommitment']>) => {
    setState(prev => ({
      ...prev,
      minimumCommitment: { ...prev.minimumCommitment, ...data }
    }));
  };

  const updateFitnessScheduleDay = (key: string, data: Partial<UserWorkbookState['fitnessPlanner']['schedule']['mon']>) => {
    setState(prev => ({
      ...prev,
      fitnessPlanner: {
        ...prev.fitnessPlanner,
        schedule: {
          ...prev.fitnessPlanner.schedule,
          [key]: {
            ...prev.fitnessPlanner.schedule[key],
            ...data
          }
        }
      }
    }));
  };

  const updateMealPlanner = (data: Partial<UserWorkbookState['mealPlanner']>) => {
    setState(prev => ({
      ...prev,
      mealPlanner: { ...prev.mealPlanner, ...data }
    }));
  };

  const toggleGroceryItem = (itemKey: string) => {
    setState(prev => ({
      ...prev,
      mealPlanner: {
        ...prev.mealPlanner,
        groceryChecklist: {
          ...prev.mealPlanner.groceryChecklist,
          [itemKey]: !prev.mealPlanner.groceryChecklist[itemKey]
        }
      }
    }));
  };

  const updateHabitStack = (index: number, data: Partial<UserWorkbookState['habits']['habitStacks'][0]>) => {
    setState(prev => {
      const nextStacks = [...prev.habits.habitStacks];
      if (nextStacks[index]) {
        nextStacks[index] = { ...nextStacks[index], ...data };
      }
      return {
        ...prev,
        habits: { ...prev.habits, habitStacks: nextStacks }
      };
    });
  };

  const addHabitStack = () => {
    setState(prev => ({
      ...prev,
      habits: {
        ...prev.habits,
        habitStacks: [
          ...prev.habits.habitStacks,
          { id: String(Date.now()), existingRoutine: '', newHabit: '', reward: '' }
        ]
      }
    }));
  };

  const removeHabitStack = (index: number) => {
    setState(prev => {
      const nextStacks = prev.habits.habitStacks.filter((_, i) => i !== index);
      return {
        ...prev,
        habits: { ...prev.habits, habitStacks: nextStacks }
      };
    });
  };

  const toggleDormResetItem = (itemKey: string) => {
    setState(prev => ({
      ...prev,
      habits: {
        ...prev.habits,
        dormResetChecklist: {
          ...prev.habits.dormResetChecklist,
          [itemKey]: !prev.habits.dormResetChecklist[itemKey]
        }
      }
    }));
  };

  const updateReboundProtocol = (data: Partial<UserWorkbookState['habits']['reboundProtocolAnswers']>) => {
    setState(prev => ({
      ...prev,
      habits: {
        ...prev.habits,
        reboundProtocolAnswers: { ...prev.habits.reboundProtocolAnswers, ...data }
      }
    }));
  };

  const updateRecovery = (data: Partial<UserWorkbookState['recovery']>) => {
    setState(prev => ({
      ...prev,
      recovery: { ...prev.recovery, ...data }
    }));
  };

  const toggleRecoveryHabit = (key: string) => {
    setState(prev => ({
      ...prev,
      recovery: {
        ...prev.recovery,
        recoveryHabits: {
          ...prev.recovery.recoveryHabits,
          [key]: !prev.recovery.recoveryHabits[key]
        }
      }
    }));
  };

  const updateChallengeDay = (dayNumber: number, data: Partial<ChallengeDayRecord>) => {
    setState(prev => {
      const existing = prev.challengeDays[dayNumber] || {
        day: dayNumber,
        completed: false,
        workoutDone: false,
        fuelDone: false,
        recoveryDone: false,
        energyRating: 3,
        note: '',
      };
      const updated = { ...existing, ...data };
      if (updated.workoutDone && updated.fuelDone && updated.recoveryDone) {
        updated.completed = true;
      }
      return {
        ...prev,
        challengeDays: {
          ...prev.challengeDays,
          [dayNumber]: updated
        }
      };
    });
  };

  const updateWeeklyScorecard = (weekNumber: number, data: Partial<WeeklyScorecardData>) => {
    setState(prev => ({
      ...prev,
      weeklyScorecards: {
        ...prev.weeklyScorecards,
        [weekNumber]: {
          ...(prev.weeklyScorecards[weekNumber] || {
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
          }),
          ...data
        }
      }
    }));
  };

  const updateProgressionNote = (key: string, val: string) => {
    setState(prev => ({
      ...prev,
      progressionNotes: {
        ...prev.progressionNotes,
        [key]: val
      }
    }));
  };

  const updateDay1VsDay30 = (data: Partial<UserWorkbookState['day1VsDay30']>) => {
    setState(prev => ({
      ...prev,
      day1VsDay30: { ...prev.day1VsDay30, ...data }
    }));
  };

  const updatePersonalSystem = (data: Partial<UserWorkbookState['personalSystem']>) => {
    setState(prev => ({
      ...prev,
      personalSystem: { ...prev.personalSystem, ...data }
    }));
  };

  const updateNextThirtyDays = (data: Partial<UserWorkbookState['nextThirtyDays']>) => {
    setState(prev => ({
      ...prev,
      nextThirtyDays: { ...prev.nextThirtyDays, ...data }
    }));
  };

  const updateFinalCommitment = (data: Partial<UserWorkbookState['finalCommitment']>) => {
    setState(prev => ({
      ...prev,
      finalCommitment: { ...prev.finalCommitment, ...data }
    }));
  };

  const setCurrentPage = (page: number) => {
    const bounded = Math.max(1, Math.min(totalPages, Math.round(page)));
    setCurrentPageState(bounded);
    try {
      localStorage.setItem(PAGE_STORAGE_KEY, String(bounded));
      if (typeof window !== 'undefined' && window.history?.replaceState) {
        window.history.replaceState(null, '', `#page-${bounded}`);
      }
    } catch {
      // ignore
    }
  };

  const markPageCompleted = (pageId: number) => {
    setState(prev => ({
      ...prev,
      completedPages: {
        ...prev.completedPages,
        [pageId]: true
      }
    }));
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      markPageCompleted(currentPage);
      setCurrentPage(currentPage + 1);
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  // Sync with browser back/forward buttons or external hash changes
  useEffect(() => {
    const handleHashChange = () => {
      if (typeof window !== 'undefined') {
        const hashMatch = window.location.hash.match(/#?(?:page-)?(\d+)/i);
        if (hashMatch) {
          const p = parseInt(hashMatch[1], 10);
          if (p >= 1 && p <= totalPages && p !== currentPage) {
            setCurrentPageState(p);
          }
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentPage, totalPages]);

  const setPageNote = (pageId: number, note: string) => {
    setState(prev => ({
      ...prev,
      customNotes: { ...prev.customNotes, [pageId]: note }
    }));
  };

  const togglePageCompleted = (pageId: number) => {
    setState(prev => ({
      ...prev,
      completedPages: {
        ...prev.completedPages,
        [pageId]: !prev.completedPages[pageId]
      }
    }));
  };

  const toggleBookmark = (pageId: number) => {
    setState(prev => {
      const exists = prev.bookmarkedPages.includes(pageId);
      return {
        ...prev,
        bookmarkedPages: exists
          ? prev.bookmarkedPages.filter(id => id !== pageId)
          : [...prev.bookmarkedPages, pageId]
      };
    });
  };

  const loadSampleData = () => {
    setState(sampleFilledState);
  };

  const resetAllData = () => {
    setState(initialWorkbookState);
    localStorage.removeItem(STORAGE_KEY);
  };

  const exportDataJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(state, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'TheFitStudentBlueprint_Progress.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importDataJSON = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed && typeof parsed === 'object') {
        setState({ ...initialWorkbookState, ...parsed });
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  // Calculate completion percentage
  let filledPoints = 0;
  const totalPoints = 25; // key milestones
  if (state.assessment.energyLevel > 0) filledPoints++;
  if (state.assessment.pushupsCount) filledPoints++;
  if (state.goals.coreWhy) filledPoints++;
  if (state.goals.thirtyDayPhysicalGoal) filledPoints++;
  if (state.minimumCommitment.badDayWorkout) filledPoints++;
  if (state.minimumCommitment.signature) filledPoints++;
  if (state.mealPlanner.budgetPerWeek) filledPoints++;
  if (state.recovery.windDownTime) filledPoints++;
  
  // count challenge days completed
  const completedChallengeDays = (Object.values(state.challengeDays) as ChallengeDayRecord[]).filter(d => d.completed || d.workoutDone).length;
  if (completedChallengeDays >= 1) filledPoints += 2;
  if (completedChallengeDays >= 7) filledPoints += 3;
  if (completedChallengeDays >= 14) filledPoints += 3;
  if (completedChallengeDays >= 21) filledPoints += 3;
  if (completedChallengeDays >= 30) filledPoints += 4;
  
  if (state.day1VsDay30.biggestTransformation) filledPoints += 2;
  if (state.finalCommitment.signed) filledPoints += 3;

  const completionPercentage = Math.min(100, Math.round((filledPoints / totalPoints) * 100));

  return (
    <WorkbookContext.Provider
      value={{
        state,
        currentPage,
        totalPages,
        setCurrentPage,
        nextPage,
        prevPage,
        markPageCompleted,
        updateAssessment,
        updateGoals,
        updateMinimumCommitment,
        updateFitnessScheduleDay,
        updateMealPlanner,
        toggleGroceryItem,
        updateHabitStack,
        addHabitStack,
        removeHabitStack,
        toggleDormResetItem,
        updateReboundProtocol,
        updateRecovery,
        toggleRecoveryHabit,
        updateChallengeDay,
        updateWeeklyScorecard,
        updateProgressionNote,
        updateDay1VsDay30,
        updatePersonalSystem,
        updateNextThirtyDays,
        updateFinalCommitment,
        setPageNote,
        togglePageCompleted,
        toggleBookmark,
        loadSampleData,
        resetAllData,
        exportDataJSON,
        importDataJSON,
        completionPercentage,
        isUnlocked,
        isPartnerReview,
        FREE_SAMPLE_MAX_PAGE,
        unlockFullAccess,
        lockAccess,
        activatePartnerReviewPass,
        deactivatePartnerReviewPass,
      }}
    >
      {children}
    </WorkbookContext.Provider>
  );
};

export const useWorkbook = () => {
  const context = useContext(WorkbookContext);
  if (!context) {
    throw new Error('useWorkbook must be used within a WorkbookProvider');
  }
  return context;
};
