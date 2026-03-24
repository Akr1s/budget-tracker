import { useTranslation } from "react-i18next";
import { TrendingDown, TrendingUp } from "lucide-react";

import { CATEGORY_COLORS } from "@/constants/category-colors.config";
import type { CurrencyEnum } from "@/utils/currency";
import { DateService } from "@/utils/date.service";
import { formatCurrency } from "@/utils/format-currency";
import type { ITransaction } from "@/views/transactions/transactions.type";
import { TransactionTypeEnum } from "@/views/transactions/utils/transaction.enum";

interface IProps {
  transactions: ITransaction[];
  currency: CurrencyEnum;
}

export default function TransactionList({ transactions, currency }: IProps) {
  const { t: tCommon } = useTranslation("common");

  return (
    <ul className="flex flex-col divide-y" role="list">
      {transactions.map((tx) => {
        const isIncome = tx.type === TransactionTypeEnum.INCOME;
        const Icon = isIncome ? TrendingUp : TrendingDown;

        return (
          <li
            key={tx.id}
            className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
          >
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
              style={{ backgroundColor: `${CATEGORY_COLORS[tx.category]}20` }}
            >
              <Icon
                className="h-4 w-4"
                style={{ color: CATEGORY_COLORS[tx.category] }}
              />
            </span>

            <div className="flex-1 truncate">
              <p className="truncate text-sm font-medium">
                {tx.description || tCommon(`categories.${tx.category}`)}
              </p>
              <p className="text-xs text-muted-foreground">
                {tCommon(`categories.${tx.category}`)}
                {" · "}
                {DateService.toDisplayDate(tx.date)}
              </p>
            </div>

            <span
              className={`shrink-0 text-sm font-semibold ${
                isIncome
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {isIncome ? "+" : "-"}
              {formatCurrency(tx.amount, currency)}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
