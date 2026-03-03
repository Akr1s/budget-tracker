import { useTranslation } from "react-i18next";
import type { IOnboardingForm } from "../onboarding.type";
import { getCurrencySymbol } from "@/utils/currency";
import { DateService } from "@/utils/date.service";

interface IProps {
  values: IOnboardingForm;
}

export default function Summary({ values }: IProps) {
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
            symbol: currencySymbol,
            amount: values.primarySourceMonthlyAmount.toFixed(2),
            source: values.primaryIncomeSource,
          })}
        </p>
        <p className="leading-7">
          {t("onboarding.summary.budget", {
            symbol: currencySymbol,
            amount: totalBudgeted.toFixed(2),
          })}
        </p>
        <p className="leading-7">
          {t("onboarding.summary.savingsGoal", {
            symbol: currencySymbol,
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
                    — {currencySymbol}
                    {values.budgetGoals[cat].toFixed(2)}
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
        <p className="leading-7">
          {currencySymbol}
          {values.startingBalance.toFixed(2)}
        </p>
        <p className="leading-7 text-sm text-muted-foreground">
          {t("onboarding.summary.trackingFrom", {
            date: DateService.toDisplayDate(values.startingDate, values.language),
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
