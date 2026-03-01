import type { IOnboardingForm } from '../onboarding.type';

export const ONBOARDING_STEPS_COUNT = 6;

export const STEP_FIELDS: Record<number, (keyof IOnboardingForm)[]> = {
    1: ['language', 'currency'],
    2: ['categories'],
    3: ['primaryIncomeSource', 'primarySourceMonthlyAmount'],
    4: ['startingBalance', 'startingDate'],
    5: ['budgetGoals'],
    6: [],
};
