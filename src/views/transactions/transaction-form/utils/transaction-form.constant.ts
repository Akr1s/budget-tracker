import { CurrencyEnum } from "@/utils/currency";
import { CategoryEnum } from "@/views/onboarding/utils/onboarding.enum";
import { DateService } from "@/utils/date.service";
import type { ITransactionForm } from "../transaction-form.type";
import { TransactionTypeEnum } from "./transaction-form.enum";

export const initialValues: ITransactionForm = {
  type: TransactionTypeEnum.EXPENSE,
  amount: 0,
  currency: CurrencyEnum.USD,
  category: CategoryEnum.HOUSING,
  description: "",
  date: DateService.getToday(),
};
