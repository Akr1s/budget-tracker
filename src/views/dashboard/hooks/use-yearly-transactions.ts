import { useEffect, useState } from "react";

import { IndexedDBService } from "@/storage/index-db.service";
import { DateService } from "@/utils/date.service";
import type { ITransaction } from "@/views/transactions/transactions.type";

export const MONTHS_BACK = 11;

function buildYearRange() {
  const now = new Date();
  const startDate = new Date(now.getFullYear(), now.getMonth() - MONTHS_BACK, 1);
  const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  return {
    startDate: DateService.toInputValue(startDate),
    endDate: DateService.toInputValue(endDate),
  };
}

export function useYearlyTransactions() {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetch() {
      setIsLoading(true);
      const { startDate, endDate } = buildYearRange();
      const data = await IndexedDBService.getTransactionsByDateRange(
        startDate,
        endDate,
      );

      if (!cancelled) {
        setTransactions(data);
        setIsLoading(false);
      }
    }

    fetch();
    return () => {
      cancelled = true;
    };
  }, []);

  return { transactions, isLoading };
}
