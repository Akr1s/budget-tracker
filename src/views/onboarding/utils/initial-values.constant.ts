import type { IOnboardingForm } from "../onboarding.type";

export const initialValues: IOnboardingForm = {
  categories: [],
  currency: "usd",
  language: "en",
  primaryIncomeSource: "",
  primarySourceMonthlyAmount: 0,
  startingBalance: 0,
  startingDate: "today",
  budgetGoals: {},
};
