import CurrencyInput from "@/components/currency-input.component";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import type { IOnboardingForm } from "../onboarding.type";
import type { FormikErrors, FormikTouched } from "formik";
import { useTranslation } from "react-i18next";
import { getCurrencySymbol } from "@/utils/currency";

interface IProps {
  setFieldValue: (
    field: string,
    value: number,
    shouldValidate?: boolean | undefined,
  ) => Promise<void> | Promise<FormikErrors<IOnboardingForm>>;
  values: IOnboardingForm;
  errors: FormikErrors<IOnboardingForm>;
  touched: FormikTouched<IOnboardingForm>;
}

export default function BudgetGoals({ setFieldValue, values, errors }: IProps) {
  const { t } = useTranslation("onboarding");
  const { t: tCommon } = useTranslation("common");
  const currencySymbol = getCurrencySymbol(values.currency);

  const categoryLabels: Record<string, string> = {
    housing: tCommon("common.categories.housing"),
    groceries: tCommon("common.categories.groceries"),
    transportation: tCommon("common.categories.transportation"),
    healthcare: tCommon("common.categories.healthcare"),
    entertainment: tCommon("common.categories.entertainment"),
    shopping: tCommon("common.categories.shopping"),
    sports: tCommon("common.categories.sports"),
    travel: tCommon("common.categories.travel"),
    debt: tCommon("common.categories.debt"),
    savings: tCommon("common.categories.savings"),
    education: tCommon("common.categories.education"),
  };

  const totalBudgeted = Object.values(values.budgetGoals).reduce(
    (sum, v) => sum + (v || 0),
    0,
  );
  const remainingBudgeted = values.primarySourceMonthlyAmount - totalBudgeted;
  const remainingPercentage =
    values.primarySourceMonthlyAmount > 0
      ? Math.round(
          (remainingBudgeted / values.primarySourceMonthlyAmount) * 100,
        )
      : 0;

  return (
    <div>
      <p className="leading-7">{t("onboarding.budgetGoals.heading")}</p>
      <p className="leading-7 mt-4">
        {t("onboarding.budgetGoals.monthlyIncome", {
          symbol: currencySymbol,
          amount: values.primarySourceMonthlyAmount.toFixed(2),
        })}
      </p>

      {values.categories.length === 0 ? (
        <p className="text-sm text-muted-foreground mt-2">
          {t("onboarding.budgetGoals.noCategories")}
        </p>
      ) : (
        <FieldGroup className="mt-2">
          {values.categories.map((category) => (
            <Field key={category}>
              <FieldLabel>{categoryLabels[category]}</FieldLabel>
              <CurrencyInput
                currency={values.currency}
                type="number"
                min={0}
                placeholder="0.00"
                value={values.budgetGoals[category] || ""}
                onChange={(e) =>
                  setFieldValue(
                    `budgetGoals.${category}`,
                    parseFloat(e.target.value) || 0,
                  )
                }
              />
              {errors.budgetGoals?.[category] && (
                <FieldError>{errors.budgetGoals[category]}</FieldError>
              )}
            </Field>
          ))}
        </FieldGroup>
      )}

      <p className="leading-7 mt-4">
        {t("onboarding.budgetGoals.totalBudgeted", {
          symbol: currencySymbol,
          budgeted: totalBudgeted.toFixed(2),
          income: values.primarySourceMonthlyAmount.toFixed(2),
        })}
      </p>
      <p className="leading-7">
        {t("onboarding.budgetGoals.remaining", {
          symbol: currencySymbol,
          amount: remainingBudgeted.toFixed(2),
          percentage: remainingPercentage,
        })}
      </p>
    </div>
  );
}
