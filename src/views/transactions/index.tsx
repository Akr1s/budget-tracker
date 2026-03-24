import { useEffect, useState } from "react";
import { IndexedDBService } from "@/storage/index-db.service";
import CreateTransaction from "./components/create-transaction.component";
import TransactionsTable from "./components/transactions-table.component";
import type { ITransaction } from "./transactions.type";

export default function Transactions() {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  useEffect(() => {
    let cancelled = false;

    IndexedDBService.getAllTransactions().then((data) => {
      if (!cancelled) setTransactions(data);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  function handleAdd(transaction: ITransaction) {
    setTransactions((prev) => [...prev, transaction]);
  }

  function handleEdit(transaction: ITransaction) {
    setTransactions((prev) =>
      prev.map((t) => (t.id === transaction.id ? transaction : t)),
    );
  }

  function handleDelete(id: number) {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 min-h-0">
      <CreateTransaction onCreated={handleAdd} />
      <TransactionsTable
        transactions={transactions}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
