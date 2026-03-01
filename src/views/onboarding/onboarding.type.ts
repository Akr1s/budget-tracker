import type { CurrencyCode } from "@/utils/currency";

export interface IOnboardingForm {
  categories: string[];
  currency: CurrencyCode;
  language: string;
  primaryIncomeSource: string;
  primarySourceMonthlyAmount: number;
  startingBalance: number;
  startingDate: "today" | "monthStart";
  budgetGoals: Record<string, number>;
}
