import type { CurrencyEnum } from "@/utils/currency";
import type {
  CategoryEnum,
  IncomeSourceEnum,
  LanguageEnum,
} from "./utils/onboarding.enum";

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
