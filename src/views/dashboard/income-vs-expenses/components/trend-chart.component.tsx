import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { CurrencyEnum } from "@/utils/currency";
import { formatCurrency } from "@/utils/format-currency";
import type { IMonthlyTrend } from "..";

interface IProps {
  data: IMonthlyTrend[];
  locale: string;
  currency: CurrencyEnum;
  incomeLabel: string;
  expensesLabel: string;
}

export default function TrendChart({
  data,
  locale,
  currency,
  incomeLabel,
  expensesLabel,
}: IProps) {
  const axisCurrency = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency.toUpperCase(),
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 1,
  });

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barGap={2} barCategoryGap="20%">
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            className="stroke-border"
          />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            className="text-xs fill-muted-foreground"
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            width={60}
            tickFormatter={(value: number) => axisCurrency.format(value)}
            className="text-xs fill-muted-foreground"
          />
          <Tooltip
            cursor={{ className: "fill-muted/30" }}
            contentStyle={{
              borderRadius: "0.5rem",
              border: "1px solid var(--color-border)",
              backgroundColor: "var(--color-card)",
              fontSize: "0.875rem",
            }}
            formatter={(value, name) => [
              formatCurrency(Number(value), currency, locale),
              name,
            ]}
          />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: "0.875rem", paddingTop: "0.5rem" }}
          />
          <Bar
            dataKey="income"
            name={incomeLabel}
            fill="#22c55e"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="expenses"
            name={expensesLabel}
            fill="#ef4444"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
