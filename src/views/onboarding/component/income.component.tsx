import CustomSelect from "@/components/custom-select.component";
import CurrencyInput from "@/components/currency-input.component";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import type { IOnboardingForm } from "../onboarding.type";
import type { FormikErrors, FormikTouched } from "formik";
import { useTranslation } from "react-i18next";
import { IncomeSourceEnum } from "../utils/onboarding.enum";

interface IProps {
  setFieldValue: (
    field: keyof IOnboardingForm,
    value: string | number,
    shouldValidate?: boolean | undefined,
  ) => Promise<void> | Promise<FormikErrors<IOnboardingForm>>;
  values: IOnboardingForm;
  errors: FormikErrors<IOnboardingForm>;
  touched: FormikTouched<IOnboardingForm>;
}

export default function Income({
  setFieldValue,
  values,
  errors,
  touched,
}: IProps) {
  const { t: tOnboarding } = useTranslation("onboarding");

  const incomeOptions = [
    { label: tOnboarding("income.sources.salary"), value: IncomeSourceEnum.SALARY },
    { label: tOnboarding("income.sources.freelance"), value: IncomeSourceEnum.FREELANCE },
    { label: tOnboarding("income.sources.donations"), value: IncomeSourceEnum.DONATIONS },
  ];

  return (
    <div>
      <p className="leading-7">{tOnboarding("income.heading")}</p>

      <FieldGroup className="mt-4">
        <Field>
          <FieldLabel>{tOnboarding("income.primarySourceLabel")}</FieldLabel>
          <CustomSelect
            label={tOnboarding("income.primarySourcePlaceholder")}
            value={values.primaryIncomeSource}
            options={incomeOptions}
            onValueChange={(value) => setFieldValue("primaryIncomeSource", value)}
          />
          {touched.primaryIncomeSource && errors.primaryIncomeSource && (
            <FieldError>{errors.primaryIncomeSource}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel>{tOnboarding("income.monthlyAmountLabel")}</FieldLabel>
          <CurrencyInput
            currency={values.currency}
            type="number"
            min={0}
            placeholder={tOnboarding("income.amountPlaceholder")}
            value={values.primarySourceMonthlyAmount || ""}
            onChange={(e) =>
              setFieldValue(
                "primarySourceMonthlyAmount",
                parseFloat(e.target.value) || 0,
              )
            }
          />
          {touched.primarySourceMonthlyAmount && errors.primarySourceMonthlyAmount && (
            <FieldError>{errors.primarySourceMonthlyAmount}</FieldError>
          )}
        </Field>
      </FieldGroup>
    </div>
  );
}
