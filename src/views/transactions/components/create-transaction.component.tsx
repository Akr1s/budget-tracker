import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import TransactionForm from "../transaction-form";
import type { ITransaction } from "../transactions.type";

interface IProps {
  onCreated: (transaction: ITransaction) => void;
}

export default function CreateTransaction({ onCreated }: IProps) {
  const { t: tTransactions } = useTranslation("transactions");

  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsFormOpen(true)}>
        {tTransactions("createButton")}
      </Button>
      {isFormOpen && (
        <TransactionForm
          onClose={() => setIsFormOpen(false)}
          onSuccess={onCreated}
        />
      )}
    </>
  );
}
