import { useEffect, useReducer, useState } from "react";
import { IndexedDBService } from "@/storage/index-db.service";
import CreateTransaction from "./components/create-transaction.component";
import TransactionsTable from "./components/transactions-table.component";
import type { ITransaction } from "./transactions.type";

export default function Transactions() {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [refreshKey, triggerRefresh] = useReducer((x: number) => x + 1, 0);

  useEffect(() => {
    let cancelled = false;

    IndexedDBService.getAllTransactions().then((data) => {
      if (!cancelled) setTransactions(data);
    });

    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  return (
    <div className="space-y-6 p-4">
      <CreateTransaction onCreated={triggerRefresh} />
      <TransactionsTable transactions={transactions} />
    </div>
  );
}
