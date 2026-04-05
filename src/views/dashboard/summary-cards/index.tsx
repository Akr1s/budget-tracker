import { useMemo } from "react";

import { Card } from "@/components/ui/card";
import type { CurrencyEnum } from "@/utils/currency";
import type { ITransaction } from "@/views/transactions/transactions.type";
import { TransactionTypeEnum } from "@/views/transactions/utils/transaction.enum";
import type { LucideIcon } from "lucide-react";
import { TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { formatPercent } from "@/utils/format-percent.util";
import { useTranslation } from "react-i18next";
import CardData from "./components/card-data.component";
import CardSkeleton from "./components/card-skeleton.component";

export interface ISummaryCard {
  title: string;
  amount: number;
  icon: LucideIcon;
  amountClass: string;
  iconClass: string;
  subtitle?: string;
}

interface IProps {
  transactions: ITransaction[];
  currency: CurrencyEnum;
  isLoading: boolean;
}

function computeTransactionTotals(transactions: ITransaction[]) {
  let income = 0;
  let expenses = 0;

  for (const tx of transactions) {
    if (tx.type === TransactionTypeEnum.INCOME) {
      income += tx.amount;
    } else {
      expenses += tx.amount;
    }
  }

  return {
    totalIncome: income,
    totalExpenses: expenses,
    remaining: income - expenses,
    expenseRatio: income > 0 ? (expenses / income) * 100 : 0,
  };
}

export default function SummaryCards({
  transactions,
  currency,
  isLoading,
}: IProps) {
  const { t: tDashboard, i18n } = useTranslation("dashboard");

  const { totalIncome, totalExpenses, remaining, expenseRatio } = useMemo(
    () => computeTransactionTotals(transactions),
    [transactions],
  );

  const cards = [
    {
      title: tDashboard("summary.income"),
      amount: totalIncome,
      icon: TrendingUp,
      amountClass: "text-emerald-600 dark:text-emerald-400",
      iconClass: "text-emerald-600 dark:text-emerald-400",
    },
    {
      title: tDashboard("summary.expenses"),
      amount: totalExpenses,
      icon: TrendingDown,
      amountClass: "text-red-600 dark:text-red-400",
      iconClass: "text-red-600 dark:text-red-400",
      subtitle: tDashboard("summary.ofIncome", {
        percent: formatPercent(expenseRatio, i18n.language),
      }),
    },
    {
      title: tDashboard("summary.remaining"),
      amount: remaining,
      icon: Wallet,
      amountClass:
        remaining >= 0
          ? "text-emerald-600 dark:text-emerald-400"
          : "text-red-600 dark:text-red-400",
      iconClass: "text-muted-foreground",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {cards.map((card) => (
        <Card key={card.title}>
          {isLoading ? (
            <CardSkeleton />
          ) : (
            <CardData
              card={card}
              currency={currency}
              locale={i18n.language}
            />
          )}
        </Card>
      ))}
    </div>
  );
}
