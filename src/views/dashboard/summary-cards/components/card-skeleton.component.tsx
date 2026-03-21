import {
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function CardSkeleton() {
  return (
    <>
      <CardHeader className="pb-2">
        <Skeleton className="h-4 w-24" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-7 w-32" />
        <Skeleton className="mt-2 h-3 w-20" />
      </CardContent>
    </>
  );
}
