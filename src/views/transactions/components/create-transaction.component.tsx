import { Button } from "@/components/ui/button";
import { useState } from "react";
import TransactionForm from "../transaction-form";

export default function CreateTransaction() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsFormOpen(true)}>Create Transaction</Button>
      {isFormOpen && <TransactionForm onClose={() => setIsFormOpen(false)} />}
    </>
  );
}
