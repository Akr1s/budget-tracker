import { useTranslation } from "react-i18next";
import type { IOnboardingForm } from "../onboarding.type";
import { DateService } from "@/utils/date.service";
import { formatCurrency } from "@/utils/format-currency.util";
import { formatNumber } from "@/utils/format-number.util";
import { formatPercent } from "@/utils/format-percent.util";

interface IProps {
  values: IOnboardingForm;
}

export default function Summary({ values }: IProps) {
  const { t: tOnboarding } = useTranslation("onboarding");
  const { t: tCommon } = useTranslation("common");

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
  const savingsGoal = values.primarySourceMonthlyAmount - totalBudgeted;
  const savingsPercentage =
    values.primarySourceMonthlyAmount > 0
      ? Math.round((savingsGoal / values.primarySourceMonthlyAmount) * 100)
      : 0;

  return (
    <div className="flex flex-col gap-3">
      <p className="leading-7">{tOnboarding("summary.overview")}</p>

      <div>
        <p className="font-semibold">
          {tOnboarding("summary.monthlySummaryHeading")}
        </p>
        <p className="leading-7">
          {tOnboarding("summary.income", {
            amount: formatCurrency(
              values.primarySourceMonthlyAmount,
              values.currency,
              values.language,
            ),
            source: values.primaryIncomeSource,
          })}
        </p>
        <p className="leading-7">
          {tOnboarding("summary.budget", {
            amount: formatCurrency(
              totalBudgeted,
              values.currency,
              values.language,
            ),
          })}
        </p>
        <p className="leading-7">
          {tOnboarding("summary.savingsGoal", {
            amount: formatCurrency(
              savingsGoal,
              values.currency,
              values.language,
            ),
            percentage: formatPercent(savingsPercentage, values.language),
          })}
        </p>
      </div>

      <div>
        <p className="font-semibold">
          {tOnboarding("summary.categoriesHeading", {
            count: values.categories.length,
            countFormatted: formatNumber(
              values.categories.length,
              values.language,
            ),
          })}
        </p>
        {values.categories.length > 0 ? (
          <ul className="list-disc list-inside">
            {values.categories.map((cat) => (
              <li key={cat} className="leading-7">
                {categoryLabels[cat]}
                {values.budgetGoals[cat] !== undefined && (
                  <span className="text-muted-foreground">
                    {" "}
                    —{" "}
                    {formatCurrency(
                      values.budgetGoals[cat] ?? 0,
                      values.currency,
                      values.language,
                    )}
                  </span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground text-sm">
            {tOnboarding("summary.noCategories")}
          </p>
        )}
      </div>

      <div>
        <p className="font-semibold">
          {tOnboarding("summary.startingBalanceHeading")}
        </p>
        <p className="leading-7">
          {formatCurrency(
            values.startingBalance,
            values.currency,
            values.language,
          )}
        </p>
        <p className="leading-7 text-sm text-muted-foreground">
          {tOnboarding("summary.trackingFrom", {
            date: DateService.toDisplayDate(
              values.startingDate,
              values.language,
            ),
          })}
        </p>
      </div>

      <div>
        <p className="font-semibold">
          {tOnboarding("summary.preferencesHeading")}
        </p>
        <p className="leading-7">
          {tOnboarding("summary.languageCurrency", {
            language: values.language,
            currency: values.currency.toUpperCase(),
          })}
        </p>
      </div>

      <div>
        <p className="font-semibold">
          {tOnboarding("summary.nextStepsHeading")}
        </p>
        <ul className="list-disc list-inside">
          <li className="leading-7">{tOnboarding("summary.nextStep1")}</li>
          <li className="leading-7">{tOnboarding("summary.nextStep2")}</li>
          <li className="leading-7">{tOnboarding("summary.nextStep3")}</li>
        </ul>
      </div>
    </div>
  );
}
