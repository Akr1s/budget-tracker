import { Skeleton } from "@/components/ui/skeleton";

const LEGEND_ROWS = 4;

export default function CategoryChartSkeleton() {
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
      <Skeleton className="mx-auto h-[200px] w-[200px] shrink-0 rounded-full" />

      <div className="flex flex-1 flex-col gap-3">
        {Array.from({ length: LEGEND_ROWS }).map((_, i) => (
          <div key={i} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Skeleton className="h-3 w-3 rounded-full" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-4 w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}
