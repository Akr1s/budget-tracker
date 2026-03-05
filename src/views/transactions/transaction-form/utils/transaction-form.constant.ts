import { CurrencyEnum } from "@/utils/currency";
import { CategoryEnum } from "@/enums/category.enum";
import type { ITransactionForm } from "../../transactions.type";
import { TransactionTypeEnum } from "../../utils/transaction.enum";

export const initialValues: ITransactionForm = {
  type: TransactionTypeEnum.EXPENSE,
  amount: 0,
  currency: CurrencyEnum.USD,
  category: CategoryEnum.HOUSING,
  description: "",
  date: "",
};
