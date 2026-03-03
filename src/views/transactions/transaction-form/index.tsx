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
import { CurrencyEnum, LANGUAGE_CURRENCY_OPTIONS } from "@/utils/currency";
import { CategoryEnum } from "@/views/onboarding/utils/onboarding.enum";
import type { IOnboardingForm } from "@/views/onboarding/onboarding.type";
import {
  LocalStorageKeys,
  LocalStorageService,
} from "@/storage/local-storage.service";
import { useFormik } from "formik";
import type { ITransactionForm } from "./transaction-form.type";
import { initialValues } from "./utils/transaction-form.constant";
import { validationSchema } from "./utils/validation-schema.constant";
import { TransactionTypeEnum } from "./utils/transaction-form.enum";
import { DateService } from "@/utils/date.service";

interface IProps {
  onClose: () => void;
}

const TYPE_OPTIONS = Object.values(TransactionTypeEnum).map((type) => ({
  label: type.charAt(0).toUpperCase() + type.slice(1),
  value: type,
}));

const CATEGORY_OPTIONS = Object.values(CategoryEnum).map((c) => ({
  label: c.charAt(0).toUpperCase() + c.slice(1),
  value: c,
}));

export default function TransactionForm({ onClose }: IProps) {
  const onboardingData = LocalStorageService.getItem<IOnboardingForm>(
    LocalStorageKeys.ONBOARDING_DATA,
  );

  const currencyOptions = onboardingData
    ? LANGUAGE_CURRENCY_OPTIONS[onboardingData.language].map((c) => ({
        label: c.toUpperCase(),
        value: c,
      }))
    : [];

  const formInitialValues: ITransactionForm = {
    ...initialValues,
    currency: onboardingData?.currency || CurrencyEnum.USD,
    category: onboardingData?.categories[0] || CategoryEnum.HOUSING,
    date: DateService.getToday(),
  };

  const {
    values,
    errors,
    touched,
    setFieldValue,
    handleChange,
    handleBlur,
    handleSubmit,
    isValid,
  } = useFormik<ITransactionForm>({
    initialValues: formInitialValues,
    validationSchema,
    validateOnMount: true,
    onSubmit: (formValues) => {
      console.log(formValues);
    },
  });

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create Transaction</DialogTitle>
            <DialogDescription>Create a new transaction</DialogDescription>
            <hr className="border-gray-300 dark:border-gray-700" />
          </DialogHeader>

          <FieldGroup className="mt-4">
            <Field>
              <FieldLabel>Type</FieldLabel>
              <CustomRadioGroup
                className="flex flex-row gap-4"
                value={values.type}
                onValueChange={(value) =>
                  setFieldValue("type", value as TransactionTypeEnum)
                }
                items={TYPE_OPTIONS}
              />
            </Field>

            <Field>
              <FieldLabel>Amount *</FieldLabel>
              <div className="flex items-center gap-3">
                <CurrencyInput
                  currency={values.currency}
                  type="number"
                  min={0}
                  name="amount"
                  placeholder="0.00"
                  value={values.amount || ""}
                  onChange={(e) =>
                    setFieldValue("amount", parseFloat(e.target.value) || 0)
                  }
                  onBlur={handleBlur}
                  aria-invalid={touched.amount && !!errors.amount}
                />
                <CustomSelect
                  label="Currency"
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
              <FieldLabel>Category *</FieldLabel>
              <CustomSelect
                label="Category"
                value={values.category}
                options={CATEGORY_OPTIONS}
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
              <FieldLabel>Description</FieldLabel>
              <Input
                name="description"
                placeholder="Add a description..."
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Field>

            <Field>
              <FieldLabel>Date *</FieldLabel>
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
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!isValid}>
              Save Transaction
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
