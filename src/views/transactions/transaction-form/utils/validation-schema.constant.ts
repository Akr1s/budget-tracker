import * as Yup from "yup";
import { CurrencyEnum } from "@/utils/currency";
import { CategoryEnum } from "@/views/onboarding/utils/onboarding.enum";
import { TransactionTypeEnum } from "./transaction-form.enum";

export const validationSchema = Yup.object().shape({
  type: Yup.string()
    .oneOf(Object.values(TransactionTypeEnum), "Invalid transaction type")
    .required("Transaction type is required"),
  amount: Yup.number()
    .typeError("Amount must be a number")
    .moreThan(0, "Amount must be greater than 0")
    .required("Amount is required"),
  currency: Yup.string()
    .oneOf(Object.values(CurrencyEnum), "Invalid currency")
    .required("Currency is required"),
  category: Yup.string()
    .oneOf(Object.values(CategoryEnum), "Invalid category")
    .required("Category is required"),
  description: Yup.string().optional(),
  date: Yup.string()
    .test("is-valid-date", "Invalid date", (value) => !isNaN(Date.parse(value ?? "")))
    .required("Date is required"),
});
