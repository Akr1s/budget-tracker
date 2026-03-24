import { Pie, PieChart, ResponsiveContainer, Sector, Tooltip } from "recharts";
import type { SectorProps } from "recharts";

import type { CurrencyEnum } from "@/utils/currency";
import { formatCurrency } from "@/utils/format-currency";
import type { ICategorySlice } from "..";

interface IProps {
  slices: ICategorySlice[];
  currency: CurrencyEnum;
}

function renderShape(props: SectorProps & { isActive: boolean }) {
  const outerRadius = props.isActive
    ? (props.outerRadius ?? 0) + 6
    : props.outerRadius;

  return <Sector {...props} outerRadius={outerRadius} />;
}

export default function CategoryChart({ slices, currency }: IProps) {
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
      <div className="mx-auto h-[200px] w-[200px] shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={slices}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              dataKey="amount"
              nameKey="label"
              shape={renderShape}
              stroke="none"
            />
            <Tooltip content={() => null} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <ul className="flex flex-1 flex-col gap-2" role="list">
        {slices.map((slice) => (
          <li
            key={slice.category}
            className="flex items-center justify-between gap-3 rounded-md px-2 py-1 text-sm transition-colors hover:bg-accent"
          >
            <div className="flex items-center gap-2">
              <span
                className="inline-block h-3 w-3 shrink-0 rounded-full"
                style={{ backgroundColor: slice.fill }}
              />
              <span className="text-muted-foreground">{slice.label}</span>
            </div>
            <div className="flex items-center gap-2 font-medium">
              <span>{formatCurrency(slice.amount, currency)}</span>
              <span className="w-10 text-right text-xs text-muted-foreground">
                {slice.percent}%
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
