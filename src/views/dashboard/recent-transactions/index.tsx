import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RoutesEnum } from "@/routes/routes.enum";
import type { CurrencyEnum } from "@/utils/currency";
import type { ITransaction } from "@/views/transactions/transactions.type";
import TransactionList from "./components/transaction-list.component";
import TransactionListSkeleton from "./components/transaction-list-skeleton.component";

const MAX_RECENT = 5;

interface IProps {
  transactions: ITransaction[];
  currency: CurrencyEnum;
  isLoading: boolean;
}

function getRecentTransactions(transactions: ITransaction[]): ITransaction[] {
  return [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, MAX_RECENT);
}

export default function RecentTransactions({
  transactions,
  currency,
  isLoading,
}: IProps) {
  const { t: tDashboard } = useTranslation("dashboard");

  const recent = useMemo(
    () => getRecentTransactions(transactions),
    [transactions],
  );

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          {tDashboard("recentTransactions.title")}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        {isLoading ? (
          <TransactionListSkeleton />
        ) : recent.length === 0 ? (
          <p className="py-10 text-center text-sm text-muted-foreground">
            {tDashboard("recentTransactions.noData")}
          </p>
        ) : (
          <TransactionList transactions={recent} currency={currency} />
        )}
      </CardContent>
      {!isLoading && recent.length > 0 && (
        <CardFooter className="border-t pt-4">
          <Link
            to={`/${RoutesEnum.TRANSACTIONS}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            {tDashboard("recentTransactions.viewAll")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </CardFooter>
      )}
    </Card>
  );
}
