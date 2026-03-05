import { CurrencyEnum } from "@/utils/currency";
import { DateService } from "@/utils/date.service";
import type { IOnboardingForm } from "../onboarding.type";
import { IncomeSourceEnum, LanguageEnum } from "./onboarding.enum";
import { CategoryEnum } from "@/enums/category.enum";

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
  language: LanguageEnum.EN,
  currency: CurrencyEnum.USD,
  categories: [
    CategoryEnum.HOUSING,
    CategoryEnum.GROCERIES,
    CategoryEnum.TRANSPORTATION,
    CategoryEnum.HEALTHCARE,
    CategoryEnum.ENTERTAINMENT,
    CategoryEnum.SHOPPING,
    CategoryEnum.DEBT,
  ],
  primaryIncomeSource: IncomeSourceEnum.SALARY,
  primarySourceMonthlyAmount: 0,
  startingBalance: 0,
  startingDate: DateService.getToday(),
  budgetGoals: {},
};
