import { BookPage } from '../types';

export const BOOK_PAGES: BookPage[] = [
  // Front Matter
  { id: 1, pageNumber: 1, part: 'frontmatter', partTitle: 'Welcome', title: 'The Fit Student Blueprint', subtitle: 'Cover', type: 'cover' },
  { id: 2, pageNumber: 2, part: 'frontmatter', partTitle: 'Welcome', title: 'Copyright & Medical Disclaimer', type: 'teaching' },
  { id: 3, pageNumber: 3, part: 'frontmatter', partTitle: 'Welcome', title: 'Table of Contents', type: 'concept' },
  { id: 4, pageNumber: 4, part: 'frontmatter', partTitle: 'Welcome', title: 'The Four Foundations Graphic', subtitle: 'MOVE • FUEL • RECOVER • REPEAT', type: 'concept' },
  { id: 5, pageNumber: 5, part: 'frontmatter', partTitle: 'Welcome', title: 'How to Use This Digital Workbook', type: 'teaching' },

  // PART ONE — RESET
  { id: 6, pageNumber: 6, part: 'part1', partTitle: 'PART ONE — RESET', title: 'Part One: Reset', subtitle: 'Section Divider', type: 'divider' },
  { id: 7, pageNumber: 7, part: 'part1', partTitle: 'PART ONE — RESET', title: 'The University Reality', subtitle: 'Why Student Health Breaks Down', type: 'teaching' },
  { id: 8, pageNumber: 8, part: 'part1', partTitle: 'PART ONE — RESET', title: 'The All-or-Nothing Fallacy', subtitle: 'Why 20% Beats 0% Every Time', type: 'teaching' },
  { id: 9, pageNumber: 9, part: 'part1', partTitle: 'PART ONE — RESET', title: 'Day 1 Fitness Assessment', subtitle: 'Establishing Your Honest Starting Line', type: 'worksheet' },
  { id: 10, pageNumber: 10, part: 'part1', partTitle: 'PART ONE — RESET', title: 'Lifestyle & Time Audit', subtitle: 'Where Your Hours & Energy Actually Go', type: 'worksheet' },
  { id: 11, pageNumber: 11, part: 'part1', partTitle: 'PART ONE — RESET', title: 'Goal-Setting Worksheet', subtitle: 'Defining the 30-Day Triangle', type: 'worksheet' },
  { id: 12, pageNumber: 12, part: 'part1', partTitle: 'PART ONE — RESET', title: 'Minimum Commitment Worksheet', subtitle: 'Your Non-Negotiable Bad Day Contract', type: 'worksheet' },
  { id: 13, pageNumber: 13, part: 'part1', partTitle: 'PART ONE — RESET', title: 'Designing Your Semester Baseline', subtitle: 'Classes, Deadlines & Movement Windows', type: 'concept' },
  { id: 14, pageNumber: 14, part: 'part1', partTitle: 'PART ONE — RESET', title: 'Identifying Your Friction Points', subtitle: 'Spotting Triggers Before They Derail You', type: 'reflection' },
  { id: 15, pageNumber: 15, part: 'part1', partTitle: 'PART ONE — RESET', title: 'Part One Readiness Checklist', subtitle: 'What to Do Next', type: 'checklist' },

  // PART TWO — MOVE
  { id: 16, pageNumber: 16, part: 'part2', partTitle: 'PART TWO — MOVE', title: 'Part Two: Move', subtitle: 'Section Divider', type: 'divider' },
  { id: 17, pageNumber: 17, part: 'part2', partTitle: 'PART TWO — MOVE', title: 'The Student Movement Hierarchy', subtitle: 'Steps > Resistance > Cardio', type: 'concept' },
  { id: 18, pageNumber: 18, part: 'part2', partTitle: 'PART TWO — MOVE', title: 'The Campus Commute Formula', subtitle: 'How to Hit 8,000 Steps Without Trying', type: 'teaching' },
  { id: 19, pageNumber: 19, part: 'part2', partTitle: 'PART TWO — MOVE', title: 'Dorm Room Training Rules', subtitle: 'No Gear, No Noise, High Impact', type: 'teaching' },
  { id: 20, pageNumber: 20, part: 'part2', partTitle: 'PART TWO — MOVE', title: 'No-Equipment Workout Card', subtitle: 'The 15-Minute Dorm Room Strength Routine', type: 'concept' },
  { id: 21, pageNumber: 21, part: 'part2', partTitle: 'PART TWO — MOVE', title: '20-Minute Workout Timeline', subtitle: 'Visual Flow from Warmup to Cooldown', type: 'concept' },
  { id: 22, pageNumber: 22, part: 'part2', partTitle: 'PART TWO — MOVE', title: 'Campus Gym Demystification', subtitle: 'Crushing Beginner Anxiety & Gymtimidation', type: 'teaching' },
  { id: 23, pageNumber: 23, part: 'part2', partTitle: 'PART TWO — MOVE', title: 'Gym Workout Framework', subtitle: 'The 3-Day Push / Pull / Legs System', type: 'concept' },
  { id: 24, pageNumber: 24, part: 'part2', partTitle: 'PART TWO — MOVE', title: 'Cardio Without Burnout', subtitle: 'Protecting Energy for Studies', type: 'teaching' },
  { id: 25, pageNumber: 25, part: 'part2', partTitle: 'PART TWO — MOVE', title: 'Weekly Fitness Planner', subtitle: 'Interactive Mon–Sun Movement Schedule', type: 'planner' },
  { id: 26, pageNumber: 26, part: 'part2', partTitle: 'PART TWO — MOVE', title: 'Progression Worksheet', subtitle: 'Tracking Strength, Reps & Energy Gains', type: 'worksheet' },
  { id: 27, pageNumber: 27, part: 'part2', partTitle: 'PART TWO — MOVE', title: 'Movement Action Plan & Quick Wins', subtitle: 'What to Do Next', type: 'checklist' },

  // PART THREE — FUEL
  { id: 28, pageNumber: 28, part: 'part3', partTitle: 'PART THREE — FUEL', title: 'Part Three: Fuel', subtitle: 'Section Divider', type: 'divider' },
  { id: 29, pageNumber: 29, part: 'part3', partTitle: 'PART THREE — FUEL', title: 'Student Nutrition Reality', subtitle: 'No Superfoods, No Extreme Counting', type: 'teaching' },
  { id: 30, pageNumber: 30, part: 'part3', partTitle: 'PART THREE — FUEL', title: 'Student Meal Formula Graphic', subtitle: 'Protein + Slow Carb + Color + Good Fat', type: 'concept' },
  { id: 31, pageNumber: 31, part: 'part3', partTitle: 'PART THREE — FUEL', title: 'Grocery Checklist', subtitle: 'The $35–$45 Master Student Grocery List', type: 'checklist' },
  { id: 32, pageNumber: 32, part: 'part3', partTitle: 'PART THREE — FUEL', title: '15-Minute Dorm Cooking', subtitle: '5 Budget Meals That Take Under 15 Minutes', type: 'teaching' },
  { id: 33, pageNumber: 33, part: 'part3', partTitle: 'PART THREE — FUEL', title: 'Dining Hall Survival Guide', subtitle: 'Building High-Energy Plates on Campus Meal Plans', type: 'teaching' },
  { id: 34, pageNumber: 34, part: 'part3', partTitle: 'PART THREE — FUEL', title: 'The Takeout & Fast-Food Navigator', subtitle: 'Realistic Damage Control for Late Nights', type: 'teaching' },
  { id: 35, pageNumber: 35, part: 'part3', partTitle: 'PART THREE — FUEL', title: 'Hydration & The Caffeine Protocol', subtitle: 'Ending the 3 PM Coffee Crash', type: 'concept' },
  { id: 36, pageNumber: 36, part: 'part3', partTitle: 'PART THREE — FUEL', title: 'Alcohol & Social Balance', subtitle: 'Staying Healthy Without Becoming a Recluse', type: 'teaching' },
  { id: 37, pageNumber: 37, part: 'part3', partTitle: 'PART THREE — FUEL', title: 'Weekly Meal Planner', subtitle: 'Plan Lunches, Dinners & Easy Prep', type: 'planner' },
  { id: 38, pageNumber: 38, part: 'part3', partTitle: 'PART THREE — FUEL', title: 'Dorm Kitchen & Batch Prep Worksheet', subtitle: '45-Minute Sunday Power Prep', type: 'worksheet' },
  { id: 39, pageNumber: 39, part: 'part3', partTitle: 'PART THREE — FUEL', title: 'Fuel Action Plan & Quick Wins', subtitle: 'What to Do Next', type: 'checklist' },

  // PART FOUR — HABITS
  { id: 40, pageNumber: 40, part: 'part4', partTitle: 'PART FOUR — HABITS', title: 'Part Four: Habits', subtitle: 'Section Divider', type: 'divider' },
  { id: 41, pageNumber: 41, part: 'part4', partTitle: 'PART FOUR — HABITS', title: 'The Science of Student Habits', subtitle: 'Cues, Friction & The 2-Minute Rule', type: 'teaching' },
  { id: 42, pageNumber: 42, part: 'part4', partTitle: 'PART FOUR — HABITS', title: 'Habit Stacking Worksheet', subtitle: 'Anchoring Wellness to Your Class Schedule', type: 'worksheet' },
  { id: 43, pageNumber: 43, part: 'part4', partTitle: 'PART FOUR — HABITS', title: 'Environment Reset Worksheet', subtitle: 'Optimizing Dorm Room, Desk & Fridge', type: 'worksheet' },
  { id: 44, pageNumber: 44, part: 'part4', partTitle: 'PART FOUR — HABITS', title: 'When Motivation Fails: The "Never Miss Twice" Rule', subtitle: 'How Consistency Actually Works', type: 'teaching' },
  { id: 45, pageNumber: 45, part: 'part4', partTitle: 'PART FOUR — HABITS', title: 'Reset-After-Falling-Off-Track Worksheet', subtitle: 'Compassionate Post-Slump Recovery Protocol', type: 'worksheet' },
  { id: 46, pageNumber: 46, part: 'part4', partTitle: 'PART FOUR — HABITS', title: 'Sleep & Biological Recovery in University', subtitle: 'Why Sleep Is Your Ultimate Grade Booster', type: 'teaching' },
  { id: 47, pageNumber: 47, part: 'part4', partTitle: 'PART FOUR — HABITS', title: 'The Night Routine & Screen Curfew', subtitle: 'Transitioning from Study Mode to Rest Mode', type: 'concept' },
  { id: 48, pageNumber: 48, part: 'part4', partTitle: 'PART FOUR — HABITS', title: 'Recovery Planner', subtitle: 'Active Rest, Stress Relief & Sleep Architecture', type: 'planner' },
  { id: 49, pageNumber: 49, part: 'part4', partTitle: 'PART FOUR — HABITS', title: 'Mental Recharge & Anti-Burnout Menu', subtitle: 'Emergency De-Stress Strategies', type: 'worksheet' },
  { id: 50, pageNumber: 50, part: 'part4', partTitle: 'PART FOUR — HABITS', title: 'Habit Action Plan & Quick Wins', subtitle: 'What to Do Next', type: 'checklist' },

  // PART FIVE — THE 30-DAY CHALLENGE
  { id: 51, pageNumber: 51, part: 'part5', partTitle: 'PART FIVE — THE 30-DAY CHALLENGE', title: 'Part Five: The 30-Day Challenge', subtitle: 'Section Divider', type: 'divider' },
  { id: 52, pageNumber: 52, part: 'part5', partTitle: 'PART FIVE — THE 30-DAY CHALLENGE', title: 'Challenge Architecture & The 3 Rules', subtitle: 'How to Win the Next 30 Days', type: 'teaching' },
  { id: 53, pageNumber: 53, part: 'part5', partTitle: 'PART FIVE — THE 30-DAY CHALLENGE', title: '30-Day Challenge Calendar', subtitle: 'Interactive Day-by-Day Habit Tracker', type: 'tracker' },
  { id: 54, pageNumber: 54, part: 'part5', partTitle: 'PART FIVE — THE 30-DAY CHALLENGE', title: 'Week 1: The Movement Anchor', subtitle: 'Days 1–7 Focus & Daily Habit Targets', type: 'challenge' },
  { id: 55, pageNumber: 55, part: 'part5', partTitle: 'PART FIVE — THE 30-DAY CHALLENGE', title: 'Weekly Scorecard — Week 1', subtitle: 'Reflect, Score & Adjust for Week 2', type: 'worksheet' },
  { id: 56, pageNumber: 56, part: 'part5', partTitle: 'PART FIVE — THE 30-DAY CHALLENGE', title: 'Week 2: Fuel Foundations', subtitle: 'Days 8–14 Focus & Nutrition Habits', type: 'challenge' },
  { id: 57, pageNumber: 57, part: 'part5', partTitle: 'PART FIVE — THE 30-DAY CHALLENGE', title: 'Weekly Scorecard — Week 2', subtitle: 'Reflect, Score & Adjust for Week 3', type: 'worksheet' },
  { id: 58, pageNumber: 58, part: 'part5', partTitle: 'PART FIVE — THE 30-DAY CHALLENGE', title: 'Week 3: Energy, Sleep & Recovery', subtitle: 'Days 15–21 Focus & Deep Rest', type: 'challenge' },
  { id: 59, pageNumber: 59, part: 'part5', partTitle: 'PART FIVE — THE 30-DAY CHALLENGE', title: 'Weekly Scorecard — Week 3', subtitle: 'Reflect, Score & Adjust for Week 4', type: 'worksheet' },
  { id: 60, pageNumber: 60, part: 'part5', partTitle: 'PART FIVE — THE 30-DAY CHALLENGE', title: 'Week 4: Consistency & Lockdown', subtitle: 'Days 22–28 Focus & Final Push', type: 'challenge' },
  { id: 61, pageNumber: 61, part: 'part5', partTitle: 'PART FIVE — THE 30-DAY CHALLENGE', title: 'Weekly Scorecard — Week 4', subtitle: 'Closing Week Assessment', type: 'worksheet' },
  { id: 62, pageNumber: 62, part: 'part5', partTitle: 'PART FIVE — THE 30-DAY CHALLENGE', title: 'Daily Check-in', subtitle: 'Interactive Daily Reflection Template', type: 'worksheet' },

  // PART SIX — KEEP GOING
  { id: 63, pageNumber: 63, part: 'part6', partTitle: 'PART SIX — KEEP GOING', title: 'Part Six: Keep Going', subtitle: 'Section Divider', type: 'divider' },
  { id: 64, pageNumber: 64, part: 'part6', partTitle: 'PART SIX — KEEP GOING', title: 'Day 1 vs Day 30 Comparison', subtitle: 'Celebrating Your 30-Day Evolution', type: 'worksheet' },
  { id: 65, pageNumber: 65, part: 'part6', partTitle: 'PART SIX — KEEP GOING', title: 'Personal Fitness System Worksheet', subtitle: 'Your Sustainable Rules for University & Beyond', type: 'worksheet' },
  { id: 66, pageNumber: 66, part: 'part6', partTitle: 'PART SIX — KEEP GOING', title: 'Next 30-Day Plan', subtitle: 'Semester Proofing & Long-Term Momentum', type: 'planner' },
  { id: 67, pageNumber: 67, part: 'part6', partTitle: 'PART SIX — KEEP GOING', title: 'Final Commitment Page', subtitle: 'Your Student Wellness Pledge & Signature', type: 'worksheet' },
  { id: 68, pageNumber: 68, part: 'part6', partTitle: 'PART SIX — KEEP GOING', title: 'KEEP GOING.', subtitle: 'Closing Manifesto', type: 'final' },
];

export const PART_INFO = [
  { key: 'frontmatter', number: '', title: 'Welcome & Introduction', pageStart: 1, pageEnd: 5, color: '#14213D', desc: 'Cover, philosophy, disclaimers and how to navigate.' },
  { key: 'part1', number: 'PART ONE', title: 'RESET', pageStart: 6, pageEnd: 15, color: '#14213D', desc: 'Understanding student reality, baselines, assessments, and minimum commitments.' },
  { key: 'part2', number: 'PART TWO', title: 'MOVE', pageStart: 16, pageEnd: 27, color: '#38B66B', desc: 'No-equipment dorm circuits, campus step strategies, gym frameworks and weekly planning.' },
  { key: 'part3', number: 'PART THREE', title: 'FUEL', pageStart: 28, pageEnd: 39, color: '#F4C95D', desc: 'Affordable grocery lists, meal formulas, 15-minute dorm recipes and dining hall guides.' },
  { key: 'part4', number: 'PART FOUR', title: 'HABITS', pageStart: 40, pageEnd: 50, color: '#38B66B', desc: 'Habit stacking, environment resets, bouncing back from slumps and sleep recovery.' },
  { key: 'part5', number: 'PART FIVE', title: 'THE 30-DAY CHALLENGE', pageStart: 51, pageEnd: 62, color: '#14213D', desc: 'The 30-day interactive calendar, weekly scorecards, and daily check-ins.' },
  { key: 'part6', number: 'PART SIX', title: 'KEEP GOING', pageStart: 63, pageEnd: 68, color: '#14213D', desc: 'Day 1 vs Day 30 audit, lifetime system blueprint, and the final commitment.' },
];
