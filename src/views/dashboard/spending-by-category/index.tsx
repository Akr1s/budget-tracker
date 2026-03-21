import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CATEGORY_COLORS } from "@/constants/category-colors.config";
import type { CategoryEnum } from "@/enums/category.enum";
import { getCurrencySymbol, type CurrencyEnum } from "@/utils/currency";
import type { ITransaction } from "@/views/transactions/transactions.type";
import { TransactionTypeEnum } from "@/views/transactions/utils/transaction.enum";
import CategoryChart from "./components/category-chart.component";
import CategoryChartSkeleton from "./components/category-chart-skeleton.component";

export interface ICategorySlice {
  category: CategoryEnum;
  label: string;
  amount: number;
  fill: string;
  percent: number;
}

interface IProps {
  transactions: ITransaction[];
  currency: CurrencyEnum;
  isLoading: boolean;
}

function buildCategoryData(
  transactions: ITransaction[],
  translateCategory: (key: CategoryEnum) => string,
): ICategorySlice[] {
  const totals = new Map<CategoryEnum, number>();

  for (const tx of transactions) {
    if (tx.type !== TransactionTypeEnum.EXPENSE) continue;
    totals.set(tx.category, (totals.get(tx.category) ?? 0) + tx.amount);
  }

  const totalExpenses = [...totals.values()].reduce((sum, val) => sum + val, 0);
  if (totalExpenses === 0) return [];

  return [...totals.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([category, amount]) => ({
      category,
      label: translateCategory(category),
      amount,
      fill: CATEGORY_COLORS[category],
      percent: Math.round((amount / totalExpenses) * 100),
    }));
}

export default function SpendingByCategory({
  transactions,
  currency,
  isLoading,
}: IProps) {
  const { t: tDashboard } = useTranslation("dashboard");
  const { t: tCommon } = useTranslation("common");

  const currencySymbol = getCurrencySymbol(currency);

  const slices = useMemo(
    () =>
      buildCategoryData(transactions, (key) => tCommon(`categories.${key}`)),
    [transactions, tCommon],
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          {tDashboard("spendingByCategory.title")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <CategoryChartSkeleton />
        ) : slices.length === 0 ? (
          <p className="py-10 text-center text-sm text-muted-foreground">
            {tDashboard("spendingByCategory.noData")}
          </p>
        ) : (
          <CategoryChart slices={slices} currencySymbol={currencySymbol} />
        )}
      </CardContent>
    </Card>
  );
}
