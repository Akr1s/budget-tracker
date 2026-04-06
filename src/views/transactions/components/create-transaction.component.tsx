import { Button } from "@/components/ui/button";
import {
  SessionStorageKeys,
  sessionWebStorage,
} from "@/storage/web-storage.constant";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import TransactionForm from "../transaction-form";
import type { ITransaction, ITransactionForm } from "../transactions.type";

interface IProps {
  onCreated: (transaction: ITransaction) => void;
}

export default function CreateTransaction({ onCreated }: IProps) {
  const { t: tTransactions } = useTranslation("transactions");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [resumeDraft, setResumeDraft] = useState<ITransactionForm | null>(() =>
    sessionWebStorage.get(SessionStorageKeys.TRANSACTION_DRAFT),
  );

  const handleFormClose = (draft?: ITransactionForm) => {
    setIsFormOpen(false);
    setResumeDraft(draft || null);

    if (draft) {
      sessionWebStorage.set(SessionStorageKeys.TRANSACTION_DRAFT, draft);
    } else {
      sessionWebStorage.remove(SessionStorageKeys.TRANSACTION_DRAFT);
    }
  };

  const handleClearDraft = () => {
    sessionWebStorage.remove(SessionStorageKeys.TRANSACTION_DRAFT);
    setResumeDraft(null);
  };

  const openNewTransactionForm = () => {
    handleClearDraft();
    setIsFormOpen(true);
  };

  const handleResumeDraft = () => {
    setIsFormOpen(true);
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        <Button onClick={openNewTransactionForm}>
          {tTransactions("createButton")}
        </Button>
        {!!resumeDraft && (
          <div
            className="flex flex-col gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-900/60 dark:bg-amber-950/40 sm:flex-row sm:items-center sm:justify-between"
            role="status"
          >
            <p className="text-sm text-amber-950 dark:text-amber-100">
              {tTransactions("draftBanner.message")}
            </p>
            <div className="flex flex-wrap gap-2">
              <Button type="button" size="sm" onClick={handleResumeDraft}>
                {tTransactions("draftBanner.resume")}
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={handleClearDraft}
              >
                {tTransactions("draftBanner.dismiss")}
              </Button>
            </div>
          </div>
        )}
      </div>

      {isFormOpen && (
        <TransactionForm
          resumeDraft={resumeDraft}
          onClose={handleFormClose}
          onSuccess={onCreated}
        />
      )}
    </>
  );
}
