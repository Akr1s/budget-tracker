import { Input } from "@/components/ui/input";
import type { IOnboardingForm } from "../onboarding.type";
import type { FormikErrors, FormikTouched } from "formik";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  const categoryLabels: Record<string, string> = {
    housing: t("onboarding.categories.items.housing"),
    groceries: t("onboarding.categories.items.groceries"),
    transportation: t("onboarding.categories.items.transportation"),
    healthcare: t("onboarding.categories.items.healthcare"),
    entertainment: t("onboarding.categories.items.entertainment"),
    shopping: t("onboarding.categories.items.shopping"),
    sports: t("onboarding.categories.items.sports"),
    travel: t("onboarding.categories.items.travel"),
    debt: t("onboarding.categories.items.debt"),
    savings: t("onboarding.categories.items.savings"),
    education: t("onboarding.categories.items.education"),
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
          amount: values.primarySourceMonthlyAmount.toFixed(2),
        })}
      </p>

      {values.categories.length === 0 ? (
        <p className="text-sm text-muted-foreground mt-2">
          {t("onboarding.budgetGoals.noCategories")}
        </p>
      ) : (
        <div className="flex flex-col gap-2 mt-2">
          {values.categories.map((category) => (
            <div key={category} className="flex items-center gap-2">
              <p className="leading-7 w-32 shrink-0">
                {categoryLabels[category]}
              </p>
              <Input
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
                <p className="text-sm text-destructive">
                  {errors.budgetGoals[category]}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      <p className="leading-7 mt-4">
        {t("onboarding.budgetGoals.totalBudgeted", {
          budgeted: totalBudgeted.toFixed(2),
          income: values.primarySourceMonthlyAmount.toFixed(2),
        })}
      </p>
      <p className="leading-7">
        {t("onboarding.budgetGoals.remaining", {
          amount: remainingBudgeted.toFixed(2),
          percentage: remainingPercentage,
        })}
      </p>
    </div>
  );
}
