import * as Yup from "yup";
import type { TFunction } from "i18next";

type TransactionsTFunction = TFunction<"transactions">;
import { CurrencyEnum } from "@/utils/currency";
import { CategoryEnum } from "@/enums/category.enum";
import { TransactionTypeEnum } from "../../utils/transaction.enum";

export const createValidationSchema = (tTransactions: TransactionsTFunction) =>
  Yup.object().shape({
    type: Yup.string()
      .oneOf(
        Object.values(TransactionTypeEnum),
        tTransactions("form.validation.typeInvalid"),
      )
      .required(tTransactions("form.validation.typeRequired")),
    amount: Yup.number()
      .typeError(tTransactions("form.validation.amountNumber"))
      .moreThan(0, tTransactions("form.validation.amountPositive"))
      .required(tTransactions("form.validation.amountRequired")),
    currency: Yup.string()
      .oneOf(
        Object.values(CurrencyEnum),
        tTransactions("form.validation.currencyInvalid"),
      )
      .required(tTransactions("form.validation.currencyRequired")),
    category: Yup.string()
      .oneOf(
        Object.values(CategoryEnum),
        tTransactions("form.validation.categoryInvalid"),
      )
      .required(tTransactions("form.validation.categoryRequired")),
    description: Yup.string().optional(),
    date: Yup.string()
      .test(
        "is-valid-date",
        tTransactions("form.validation.dateInvalid"),
        (value) => !isNaN(Date.parse(value ?? "")),
      )
      .required(tTransactions("form.validation.dateRequired")),
  });
