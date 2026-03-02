import CustomSelect from "@/components/custom-select.component";
import type { IOnboardingForm } from "../onboarding.type";
import type { FormikErrors, FormikTouched } from "formik";
import { useTranslation } from "react-i18next";
import CurrencyInput from "@/components/currency-input.component";
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
  const { t } = useTranslation();

  const incomeOptions = [
    { label: t("onboarding.income.sources.salary"), value: IncomeSourceEnum.SALARY },
    { label: t("onboarding.income.sources.freelance"), value: IncomeSourceEnum.FREELANCE },
    { label: t("onboarding.income.sources.donations"), value: IncomeSourceEnum.DONATIONS },
  ];

  return (
    <div>
      <p className="leading-7">{t("onboarding.income.heading")}</p>
      <p className="leading-7 mt-4">
        {t("onboarding.income.primarySourceLabel")}
      </p>
      <CustomSelect
        label={t("onboarding.income.primarySourcePlaceholder")}
        value={values.primaryIncomeSource}
        options={incomeOptions}
        onValueChange={(value) => setFieldValue("primaryIncomeSource", value)}
      />
      {touched.primaryIncomeSource && errors.primaryIncomeSource && (
        <p className="text-sm text-destructive mt-1">
          {errors.primaryIncomeSource}
        </p>
      )}

      <p className="leading-7 mt-4">
        {t("onboarding.income.monthlyAmountLabel")}
      </p>
      <CurrencyInput
        currency={values.currency}
        type="number"
        min={0}
        placeholder={t("onboarding.income.amountPlaceholder")}
        value={values.primarySourceMonthlyAmount || ""}
        onChange={(e) =>
          setFieldValue(
            "primarySourceMonthlyAmount",
            parseFloat(e.target.value) || 0,
          )
        }
      />
      {touched.primarySourceMonthlyAmount &&
        errors.primarySourceMonthlyAmount && (
          <p className="text-sm text-destructive mt-1">
            {errors.primarySourceMonthlyAmount}
          </p>
        )}
    </div>
  );
}
