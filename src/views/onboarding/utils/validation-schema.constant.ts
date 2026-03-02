import * as Yup from "yup";
import { CurrencyEnum } from "@/utils/currency";
import { CategoryEnum, IncomeSourceEnum, LanguageEnum } from "./onboarding.enum";

export const validationSchema = Yup.object().shape({
  categories: Yup.array()
    .of(Yup.string().oneOf(Object.values(CategoryEnum), "Invalid category"))
    .min(1, "Please select at least one category"),
  currency: Yup.string()
    .oneOf(Object.values(CurrencyEnum), "Invalid currency")
    .required("Currency is required"),
  language: Yup.string()
    .oneOf(Object.values(LanguageEnum), "Invalid language")
    .required("Language is required"),
  primaryIncomeSource: Yup.string()
    .oneOf(Object.values(IncomeSourceEnum), "Invalid income source")
    .required("Primary income source is required"),
  primarySourceMonthlyAmount: Yup.number()
    .typeError("Monthly amount must be a number")
    .moreThan(0, "Monthly amount must be greater than 0")
    .required("Monthly amount is required"),
  startingBalance: Yup.number()
    .typeError("Starting balance must be a number")
    .moreThan(0, "Starting balance must be greater than 0")
    .required("Starting balance is required"),
  startingDate: Yup.string()
    .test("is-valid-date", "Invalid date", (value) => !isNaN(Date.parse(value ?? "")))
    .required("Starting date is required"),
  budgetGoals: Yup.object(
    Object.fromEntries(
      Object.values(CategoryEnum).map((key) => [
        key,
        Yup.number()
          .typeError("Budget must be a number")
          .min(0, "Budget cannot be negative"),
      ]),
    ),
  ),
});
