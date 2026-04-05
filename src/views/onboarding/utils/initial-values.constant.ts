import { CurrencyEnum } from "@/utils/currency";
import { DateService } from "@/utils/date.service";
import type { IOnboardingForm } from "../onboarding.type";
import { LanguageEnum } from "@/enums/language.enum";
import { IncomeSourceEnum } from "./onboarding.enum";

export const initialValues: IOnboardingForm = {
  categories: [],
  currency: CurrencyEnum.USD,
  language: LanguageEnum.EN,
  primaryIncomeSource: IncomeSourceEnum.SALARY,
  primarySourceMonthlyAmount: 0,
  startingBalance: 0,
  startingDate: DateService.getToday(),
  budgetGoals: {},
};
