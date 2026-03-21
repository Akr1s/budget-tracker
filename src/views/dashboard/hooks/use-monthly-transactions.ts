import { useEffect, useState } from "react";

import { IndexedDBService } from "@/storage/index-db.service";
import { DateService } from "@/utils/date.service";
import type { ITransaction } from "@/views/transactions/transactions.type";
import type { IMonthYear } from "./use-month-selector";

function buildDateRange(year: number, month: number) {
  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0);

  return {
    startDate: DateService.toInputValue(startDate),
    endDate: DateService.toInputValue(endDate),
  };
}

export function useMonthlyTransactions(selected: IMonthYear) {
  const { year, month } = selected;

  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchTransactions() {
      setIsLoading(true);

      const { startDate, endDate } = buildDateRange(year, month);
      const data = await IndexedDBService.getTransactionsByDateRange(
        startDate,
        endDate,
      );

      if (!cancelled) {
        setTransactions(data);
        setIsLoading(false);
      }
    }

    fetchTransactions();

    return () => {
      cancelled = true;
    };
  }, [year, month]);

  return { transactions, isLoading };
}
