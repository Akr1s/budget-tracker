import type { CurrencyEnum } from "@/utils/currency";
import type { TransactionTypeEnum } from "./utils/transaction.enum";
import type { CategoryEnum } from "@/enums/category.enum";

export interface ITransactionForm {
  type: TransactionTypeEnum;
  amount: number;
  currency: CurrencyEnum;
  category: CategoryEnum;
  description: string;
  date: string;
}

export interface ITransaction extends ITransactionForm {
  id: number;
  createdAt: string;
}
