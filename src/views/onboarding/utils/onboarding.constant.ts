import type { IOnboardingForm } from "../onboarding.type";

export const ONBOARDING_STEPS_COUNT = 6;

export const STEP_FIELDS: Record<number, (keyof IOnboardingForm)[]> = {
  1: ["language", "currency"],
  2: ["categories"],
  3: ["primaryIncomeSource", "primarySourceMonthlyAmount"],
  4: ["startingBalance", "startingDate"],
  5: ["budgetGoals"],
  6: [],
};

export const defaultOnboardingData: IOnboardingForm = {
  language: navigator.language.split("-")[0] || "en",
  currency: "usd",
  categories: [
    "housing",
    "groceries",
    "transportation",
    "healthcare",
    "entertainment",
    "shopping",
    "debt",
  ],
  primaryIncomeSource: "",
  primarySourceMonthlyAmount: 0,
  startingBalance: 0,
  startingDate: "today",
  budgetGoals: {},
};
