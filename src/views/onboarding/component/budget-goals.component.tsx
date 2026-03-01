import { Input } from "@/components/ui/input";
import type { IOnboardingForm } from "../onboarding.type";
import type { FormikErrors, FormikTouched } from "formik";

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
      <p className="leading-7">
        Set monthly spending limits for each category:
      </p>
      <p className="leading-7 mt-4">
        Monthly Income: ${values.primarySourceMonthlyAmount.toFixed(2)}
      </p>

      {values.categories.length === 0 ? (
        <p className="text-sm text-muted-foreground mt-2">
          No categories selected. Go back to step 2 to choose categories.
        </p>
      ) : (
        <div className="flex flex-col gap-2 mt-2">
          {values.categories.map((category) => (
            <div key={category} className="flex items-center gap-2">
              <p className="leading-7 w-32 shrink-0 capitalize">{category}</p>
              <Input
                type="number"
                min={0}
                placeholder="0.00"
                value={values.budgetGoals[category] || ''}
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
        Total Budgeted: ${totalBudgeted.toFixed(2)} / $
        {values.primarySourceMonthlyAmount.toFixed(2)}
      </p>
      <p className="leading-7">
        Remaining: ${remainingBudgeted.toFixed(2)} ({remainingPercentage}%) for
        savings/other
      </p>
    </div>
  );
}
