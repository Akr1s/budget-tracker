import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import TransactionForm from "../transaction-form";

interface IProps {
  onCreated: () => void;
}

export default function CreateTransaction({ onCreated }: IProps) {
  const { t } = useTranslation("transactions");
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsFormOpen(true)}>{t("createButton")}</Button>
      {isFormOpen && (
        <TransactionForm
          onClose={() => setIsFormOpen(false)}
          onCreated={onCreated}
        />
      )}
    </>
  );
}
