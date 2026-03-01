import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  categories: Yup.array()
    .of(Yup.string())
    .min(1, "Please select at least one category"),
  currency: Yup.string().required("Currency is required"),
  language: Yup.string().required("Language is required"),
  primaryIncomeSource: Yup.string().required(
    "Primary income source is required",
  ),
  primarySourceMonthlyAmount: Yup.number()
    .typeError("Monthly amount must be a number")
    .moreThan(0, "Monthly amount must be greater than 0")
    .required("Monthly amount is required"),
  startingBalance: Yup.number()
    .typeError("Starting balance must be a number")
    .moreThan(0, "Starting balance must be greater than 0")
    .required("Starting balance is required"),
  startingDate: Yup.string()
    .oneOf(["today", "monthStart"])
    .required("Starting date is required"),
  budgetGoals: Yup.lazy((obj) =>
    Yup.object(
      Object.fromEntries(
        Object.keys(obj ?? {}).map((key) => [
          key,
          Yup.number()
            .typeError("Budget must be a number")
            .min(0, "Budget cannot be negative"),
        ]),
      ),
    ),
  ),
});
