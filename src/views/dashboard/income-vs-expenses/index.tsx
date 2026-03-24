import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrencySymbol, type CurrencyEnum } from "@/utils/currency";
import { convertTransactions } from "@/utils/currency-converter";
import type { ITransaction } from "@/views/transactions/transactions.type";
import { TransactionTypeEnum } from "@/views/transactions/utils/transaction.enum";
import {
  MONTHS_BACK,
  useYearlyTransactions,
} from "../hooks/use-yearly-transactions";
import TrendChart from "./components/trend-chart.component";
import TrendChartSkeleton from "./components/trend-chart-skeleton.component";

export interface IMonthlyTrend {
  month: string;
  income: number;
  expenses: number;
}

interface IProps {
  currency: CurrencyEnum;
}

function buildMonthlyTrend(
  transactions: ITransaction[],
  formatMonth: (date: Date) => string,
): IMonthlyTrend[] {
  const now = new Date();
  const months: IMonthlyTrend[] = [];

  for (let i = MONTHS_BACK; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      month: formatMonth(date),
      income: 0,
      expenses: 0,
    });
  }

  for (const tx of transactions) {
    const txDate = new Date(tx.date);
    const offset =
      (txDate.getFullYear() - now.getFullYear()) * 12 +
      (txDate.getMonth() - now.getMonth()) +
      MONTHS_BACK;

    if (offset < 0 || offset > MONTHS_BACK) continue;

    if (tx.type === TransactionTypeEnum.INCOME) {
      months[offset].income += tx.amount;
    } else {
      months[offset].expenses += tx.amount;
    }
  }

  return months;
}

export default function IncomeVsExpenses({ currency }: IProps) {
  const { t: tDashboard } = useTranslation("dashboard");
  const { transactions, isLoading } = useYearlyTransactions();

  const currencySymbol = getCurrencySymbol(currency);

  const converted = useMemo(
    () => convertTransactions(transactions, currency),
    [transactions, currency],
  );

  const data = useMemo(
    () =>
      buildMonthlyTrend(converted, (date) =>
        date.toLocaleDateString(navigator.language, {
          month: "short",
          year: "2-digit",
        }),
      ),
    [converted],
  );

  const hasData = data.some((d) => d.income > 0 || d.expenses > 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          {tDashboard("incomeVsExpenses.title")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <TrendChartSkeleton />
        ) : !hasData ? (
          <p className="py-10 text-center text-sm text-muted-foreground">
            {tDashboard("incomeVsExpenses.noData")}
          </p>
        ) : (
          <TrendChart
            data={data}
            currencySymbol={currencySymbol}
            incomeLabel={tDashboard("incomeVsExpenses.income")}
            expensesLabel={tDashboard("incomeVsExpenses.expenses")}
          />
        )}
      </CardContent>
    </Card>
  );
}
