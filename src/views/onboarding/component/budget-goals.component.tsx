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
  const { t: tOnboarding } = useTranslation("onboarding");
  const { t: tCommon } = useTranslation("common");
  const currencySymbol = getCurrencySymbol(values.currency);

  const categoryLabels: Record<string, string> = {
    housing: tCommon("categories.housing"),
    groceries: tCommon("categories.groceries"),
    transportation: tCommon("categories.transportation"),
    healthcare: tCommon("categories.healthcare"),
    entertainment: tCommon("categories.entertainment"),
    shopping: tCommon("categories.shopping"),
    sports: tCommon("categories.sports"),
    travel: tCommon("categories.travel"),
    debt: tCommon("categories.debt"),
    savings: tCommon("categories.savings"),
    education: tCommon("categories.education"),
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
      <p className="leading-7">{tOnboarding("budgetGoals.heading")}</p>
      <p className="leading-7 mt-4">
        {tOnboarding("budgetGoals.monthlyIncome", {
          symbol: currencySymbol,
          amount: values.primarySourceMonthlyAmount.toFixed(2),
        })}
      </p>

      {values.categories.length === 0 ? (
        <p className="text-sm text-muted-foreground mt-2">
          {tOnboarding("budgetGoals.noCategories")}
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
        {tOnboarding("budgetGoals.totalBudgeted", {
          symbol: currencySymbol,
          budgeted: totalBudgeted.toFixed(2),
          income: values.primarySourceMonthlyAmount.toFixed(2),
        })}
      </p>
      <p className="leading-7">
        {tOnboarding("budgetGoals.remaining", {
          symbol: currencySymbol,
          amount: remainingBudgeted.toFixed(2),
          percentage: remainingPercentage,
        })}
      </p>
    </div>
  );
}
