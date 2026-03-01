import { useTranslation } from "react-i18next";
import type { IOnboardingForm } from "../onboarding.type";

interface IProps {
  values: IOnboardingForm;
}

export default function Summary({ values }: IProps) {
  const { t } = useTranslation();

  const startingDateLabels: Record<IOnboardingForm["startingDate"], string> = {
    today: t("onboarding.summary.startingDates.today"),
    monthStart: t("onboarding.summary.startingDates.monthStart"),
  };

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
  const savingsGoal = values.primarySourceMonthlyAmount - totalBudgeted;
  const savingsPercentage =
    values.primarySourceMonthlyAmount > 0
      ? Math.round((savingsGoal / values.primarySourceMonthlyAmount) * 100)
      : 0;

  return (
    <div className="flex flex-col gap-3">
      <p className="leading-7">{t("onboarding.summary.overview")}</p>

      <div>
        <p className="font-semibold">
          {t("onboarding.summary.monthlySummaryHeading")}
        </p>
        <p className="leading-7">
          {t("onboarding.summary.income", {
            amount: values.primarySourceMonthlyAmount.toFixed(2),
            source: values.primaryIncomeSource,
          })}
        </p>
        <p className="leading-7">
          {t("onboarding.summary.budget", { amount: totalBudgeted.toFixed(2) })}
        </p>
        <p className="leading-7">
          {t("onboarding.summary.savingsGoal", {
            amount: savingsGoal.toFixed(2),
            percentage: savingsPercentage,
          })}
        </p>
      </div>

      <div>
        <p className="font-semibold">
          {t("onboarding.summary.categoriesHeading", {
            count: values.categories.length,
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
                    — ${values.budgetGoals[cat].toFixed(2)}
                  </span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground text-sm">
            {t("onboarding.summary.noCategories")}
          </p>
        )}
      </div>

      <div>
        <p className="font-semibold">
          {t("onboarding.summary.startingBalanceHeading")}
        </p>
        <p className="leading-7">${values.startingBalance.toFixed(2)}</p>
        <p className="leading-7 text-sm text-muted-foreground">
          {t("onboarding.summary.trackingFrom", {
            date: startingDateLabels[values.startingDate],
          })}
        </p>
      </div>

      <div>
        <p className="font-semibold">
          {t("onboarding.summary.preferencesHeading")}
        </p>
        <p className="leading-7">
          {t("onboarding.summary.languageCurrency", {
            language: values.language,
            currency: values.currency.toUpperCase(),
          })}
        </p>
      </div>

      <div>
        <p className="font-semibold">
          {t("onboarding.summary.nextStepsHeading")}
        </p>
        <ul className="list-disc list-inside">
          <li className="leading-7">{t("onboarding.summary.nextStep1")}</li>
          <li className="leading-7">{t("onboarding.summary.nextStep2")}</li>
          <li className="leading-7">{t("onboarding.summary.nextStep3")}</li>
        </ul>
      </div>
    </div>
  );
}
