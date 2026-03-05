import * as Yup from "yup";
import type { TFunction } from "i18next";
import { CurrencyEnum } from "@/utils/currency";
import { CategoryEnum } from "@/enums/category.enum";
import { IncomeSourceEnum, LanguageEnum } from "./onboarding.enum";

type OnboardingTFunction = TFunction<"onboarding">;

export const createValidationSchema = (tOnboarding: OnboardingTFunction) =>
  Yup.object().shape({
    categories: Yup.array()
      .of(
        Yup.string().oneOf(
          Object.values(CategoryEnum),
          tOnboarding("validation.categories.invalid"),
        ),
      )
      .min(1, tOnboarding("validation.categories.minOne")),
    currency: Yup.string()
      .oneOf(
        Object.values(CurrencyEnum),
        tOnboarding("validation.currency.invalid"),
      )
      .required(tOnboarding("validation.currency.required")),
    language: Yup.string()
      .oneOf(
        Object.values(LanguageEnum),
        tOnboarding("validation.language.invalid"),
      )
      .required(tOnboarding("validation.language.required")),
    primaryIncomeSource: Yup.string()
      .oneOf(
        Object.values(IncomeSourceEnum),
        tOnboarding("validation.primaryIncomeSource.invalid"),
      )
      .required(tOnboarding("validation.primaryIncomeSource.required")),
    primarySourceMonthlyAmount: Yup.number()
      .typeError(tOnboarding("validation.primarySourceMonthlyAmount.number"))
      .moreThan(
        0,
        tOnboarding("validation.primarySourceMonthlyAmount.positive"),
      )
      .required(tOnboarding("validation.primarySourceMonthlyAmount.required")),
    startingBalance: Yup.number()
      .typeError(tOnboarding("validation.startingBalance.number"))
      .moreThan(0, tOnboarding("validation.startingBalance.positive"))
      .required(tOnboarding("validation.startingBalance.required")),
    startingDate: Yup.string()
      .test(
        "is-valid-date",
        tOnboarding("validation.startingDate.invalid"),
        (value) => !isNaN(Date.parse(value ?? "")),
      )
      .required(tOnboarding("validation.startingDate.required")),
    budgetGoals: Yup.object(
      Object.fromEntries(
        Object.values(CategoryEnum).map((key) => [
          key,
          Yup.number()
            .typeError(tOnboarding("validation.budgetGoals.number"))
            .min(0, tOnboarding("validation.budgetGoals.negative")),
        ]),
      ),
    ),
  });
