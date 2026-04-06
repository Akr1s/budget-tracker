import CustomRadioGroup from "@/components/custom-radiogroup.component";
import CustomSelect from "@/components/custom-select.component";
import CurrencyInput from "@/components/currency-input.component";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { CategoryEnum } from "@/enums/category.enum";
import { useSettings } from "@/settings/use-settings.hook";
import { IndexedDBService } from "@/storage/index-db.service";
import { CurrencyEnum } from "@/utils/currency";
import { DateService } from "@/utils/date.service";
import type { IOnboardingPersistedData } from "@/views/onboarding/onboarding.type";
import {
  LocalStorageKeys,
  LocalStorageService,
} from "@/storage/local-storage.service";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import type { ITransaction, ITransactionForm } from "../transactions.type";
import { initialValues } from "./utils/transaction-form.constant";
import { createValidationSchema } from "./utils/validation-schema.constant";
import { TransactionTypeEnum } from "../utils/transaction.enum";

interface IProps {
  transaction?: ITransaction;
  resumeDraft?: ITransactionForm | null;
  onClose: (draft?: ITransactionForm) => void;
  onSuccess: (transaction: ITransaction) => void;
}

export default function TransactionForm({
  transaction,
  resumeDraft,
  onClose,
  onSuccess,
}: IProps) {
  const { t: tTransactions } = useTranslation("transactions");
  const { t: tCommon } = useTranslation("common");
  const { settings } = useSettings();

  const typeOptions = Object.values(TransactionTypeEnum).map((type) => ({
    label: tTransactions(`form.typeOptions.${type}`),
    value: type,
  }));

  const categoryOptions = Object.values(CategoryEnum).map((c) => ({
    label: tCommon(`categories.${c}`),
    value: c,
  }));

  const onboardingData = LocalStorageService.getItem<IOnboardingPersistedData>(
    LocalStorageKeys.ONBOARDING_DATA,
  );

  const currencyOptions = Object.values(CurrencyEnum).map((c) => ({
    label: tCommon(`currencies.${c}`),
    value: c,
  }));

  const isEditMode = !!transaction;

  const savedData = transaction || resumeDraft;

  const formInitialValues: ITransactionForm = savedData
    ? {
        type: savedData.type,
        amount: savedData.amount,
        currency: savedData.currency,
        category: savedData.category,
        description: savedData.description,
        date: savedData.date,
      }
    : {
        ...initialValues,
        currency: settings.displayCurrency,
        category: onboardingData?.categories[0] || CategoryEnum.HOUSING,
        date: DateService.getTodayInputValue(),
      };

  const {
    values,
    errors,
    touched,
    dirty,
    setFieldValue,
    handleChange,
    handleBlur,
    handleSubmit,
    isValid,
  } = useFormik<ITransactionForm>({
    initialValues: formInitialValues,
    validationSchema: createValidationSchema(tTransactions),
    validateOnMount: true,
    onSubmit,
  });

  const closeDialog = () => {
    const shouldSaveDraft = !isEditMode && (dirty || resumeDraft);
    onClose(shouldSaveDraft ? values : undefined);
  };

  async function onSubmit(formValues: ITransactionForm) {
    const action = isEditMode
      ? IndexedDBService.updateTransaction(transaction.id, formValues)
      : IndexedDBService.addTransaction(formValues);

    await action
      .then((result) => {
        onSuccess(result);
        onClose();
      })
      .catch(console.error);
  }

  return (
    <Dialog open onOpenChange={closeDialog}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {tTransactions(
                isEditMode ? "form.editTitle" : "form.createTitle",
              )}
            </DialogTitle>
            <DialogDescription>
              {tTransactions(
                isEditMode ? "form.editDescription" : "form.createDescription",
              )}
            </DialogDescription>
            <hr className="border-gray-300 dark:border-gray-700" />
          </DialogHeader>

          <FieldGroup className="mt-4">
            <Field>
              <FieldLabel>{tTransactions("form.fields.type")}</FieldLabel>
              <CustomRadioGroup
                className="flex flex-row gap-4"
                value={values.type}
                onValueChange={(value) =>
                  setFieldValue("type", value as TransactionTypeEnum)
                }
                items={typeOptions}
              />
            </Field>

            <Field>
              <FieldLabel>{tTransactions("form.fields.amount")}</FieldLabel>
              <div className="flex items-center gap-3">
                <CurrencyInput
                  currency={values.currency}
                  type="number"
                  min={0}
                  name="amount"
                  placeholder={tTransactions("form.placeholders.amount")}
                  value={values.amount || ""}
                  onChange={(e) =>
                    setFieldValue("amount", parseFloat(e.target.value) || 0)
                  }
                  onBlur={handleBlur}
                  aria-invalid={touched.amount && !!errors.amount}
                />
                <CustomSelect
                  label={tTransactions("form.fields.currency")}
                  value={values.currency}
                  options={currencyOptions}
                  onValueChange={(value) => setFieldValue("currency", value)}
                />
              </div>
              {touched.amount && errors.amount && (
                <FieldError>{errors.amount}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel>{tTransactions("form.fields.category")}</FieldLabel>
              <CustomSelect
                label={tTransactions("form.fields.category")}
                value={values.category}
                options={categoryOptions}
                className="w-full"
                onValueChange={(value) =>
                  setFieldValue("category", value as CategoryEnum)
                }
              />
              {touched.category && errors.category && (
                <FieldError>{errors.category}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel>
                {tTransactions("form.fields.description")}
              </FieldLabel>
              <Input
                name="description"
                placeholder={tTransactions("form.placeholders.description")}
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Field>

            <Field>
              <FieldLabel>{tTransactions("form.fields.date")}</FieldLabel>
              <Input
                type="date"
                name="date"
                value={values.date}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={touched.date && !!errors.date}
              />
              {touched.date && errors.date && (
                <FieldError>{errors.date}</FieldError>
              )}
            </Field>
          </FieldGroup>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={closeDialog}>
              {tTransactions("form.actions.cancel")}
            </Button>
            <Button type="submit" disabled={!isValid}>
              {tTransactions("form.actions.save")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
