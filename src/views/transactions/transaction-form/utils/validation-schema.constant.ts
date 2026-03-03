import * as Yup from "yup";
import type { TFunction } from "i18next";

type TransactionsTFunction = TFunction<"transactions">;
import { CurrencyEnum } from "@/utils/currency";
import { CategoryEnum } from "@/views/onboarding/utils/onboarding.enum";
import { TransactionTypeEnum } from "./transaction-form.enum";

export const createValidationSchema = (t: TransactionsTFunction) =>
  Yup.object().shape({
    type: Yup.string()
      .oneOf(Object.values(TransactionTypeEnum), t("transactions.form.validation.typeInvalid"))
      .required(t("transactions.form.validation.typeRequired")),
    amount: Yup.number()
      .typeError(t("transactions.form.validation.amountNumber"))
      .moreThan(0, t("transactions.form.validation.amountPositive"))
      .required(t("transactions.form.validation.amountRequired")),
    currency: Yup.string()
      .oneOf(Object.values(CurrencyEnum), t("transactions.form.validation.currencyInvalid"))
      .required(t("transactions.form.validation.currencyRequired")),
    category: Yup.string()
      .oneOf(Object.values(CategoryEnum), t("transactions.form.validation.categoryInvalid"))
      .required(t("transactions.form.validation.categoryRequired")),
    description: Yup.string().optional(),
    date: Yup.string()
      .test("is-valid-date", t("transactions.form.validation.dateInvalid"), (value) =>
        !isNaN(Date.parse(value ?? "")),
      )
      .required(t("transactions.form.validation.dateRequired")),
  });
