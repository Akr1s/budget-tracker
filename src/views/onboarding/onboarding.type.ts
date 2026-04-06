import type { CategoryEnum } from "@/enums/category.enum";
import type { LanguageEnum } from "@/enums/language.enum";
import type { CurrencyEnum } from "@/utils/currency";
import type { IncomeSourceEnum } from "./utils/onboarding.enum";

export interface IOnboardingForm {
  categories: CategoryEnum[];
  currency: CurrencyEnum;
  language: LanguageEnum;
  primaryIncomeSource: IncomeSourceEnum;
  primarySourceMonthlyAmount: number;
  startingBalance: number;
  startingDate: string;
  budgetGoals: Partial<Record<CategoryEnum, number>>;
}

export type IOnboardingPersistedData = Omit<
  IOnboardingForm,
  "language" | "currency"
>;
