import { LanguageEnum } from "@/enums/language.enum";
import {
  getSavedDisplayCurrency,
  getSavedLanguage,
} from "@/storage/app-preferences.util";
import { CurrencyEnum } from "@/utils/currency";
import { DateService } from "@/utils/date.service";
import type { IOnboardingForm } from "../onboarding.type";
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

export function getOnboardingInitialValues(): IOnboardingForm {
  return {
    ...initialValues,
    language: getSavedLanguage(),
    currency: getSavedDisplayCurrency(),
  };
}
