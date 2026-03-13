import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";
import { IndexedDBService } from "@/storage/index-db.service";
import TransactionForm from "../transaction-form";
import { useState } from "react";
import type { ITransaction } from "../transactions.type";

interface IProps {
  transaction: ITransaction;
  onEdit: (transaction: ITransaction) => void;
  onDelete: (id: number) => void;
}

export default function TransactionsTableActions({
  transaction,
  onEdit,
  onDelete,
}: IProps) {
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  function handleDelete() {
    IndexedDBService.deleteTransaction(transaction.id)
      .then(() => onDelete(transaction.id))
      .catch(console.error);
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          aria-label="Edit"
          onClick={() => setIsEditFormOpen(true)}
        >
          <PencilIcon />
        </Button>
        <Button
          variant="outline"
          size="icon"
          aria-label="Delete"
          onClick={handleDelete}
        >
          <TrashIcon />
        </Button>
      </div>

      {isEditFormOpen && (
        <TransactionForm
          transaction={transaction}
          onClose={() => setIsEditFormOpen(false)}
          onSuccess={onEdit}
        />
      )}
    </>
  );
}
