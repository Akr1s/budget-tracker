import { Skeleton } from "@/components/ui/skeleton";

const BAR_HEIGHTS: [number, number][] = [
  [45, 35], [70, 55], [55, 40], [80, 60], [50, 45], [65, 50],
  [75, 55], [60, 45], [85, 65], [50, 40], [70, 50], [55, 42],
];

export default function TrendChartSkeleton() {
  return (
    <div className="flex h-[300px] items-end gap-2">
      {BAR_HEIGHTS.map(([income, expense], i) => (
        <div key={i} className="flex flex-1 items-end gap-1">
          <Skeleton className="w-1/2" style={{ height: `${income}%` }} />
          <Skeleton className="w-1/2" style={{ height: `${expense}%` }} />
        </div>
      ))}
    </div>
  );
}
