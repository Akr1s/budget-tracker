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

import type { IMonthlyTrend } from "..";

interface IProps {
  data: IMonthlyTrend[];
  currencySymbol: string;
  incomeLabel: string;
  expensesLabel: string;
}

export default function TrendChart({
  data,
  currencySymbol,
  incomeLabel,
  expensesLabel,
}: IProps) {
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
            tickFormatter={(value: number) =>
              `${currencySymbol}${value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value}`
            }
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
              `${currencySymbol}${Number(value).toFixed(2)}`,
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
