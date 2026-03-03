import type { CurrencyEnum } from "@/utils/currency";
import type { TransactionTypeEnum } from "./utils/transaction-form.enum";
import type { CategoryEnum } from "@/views/onboarding/utils/onboarding.enum";

export interface ITransactionForm {
  type: TransactionTypeEnum;
  amount: number;
  currency: CurrencyEnum;
  category: CategoryEnum;
  description: string;
  date: string;
}
