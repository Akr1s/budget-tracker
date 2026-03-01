import type { IOnboardingForm } from "../onboarding.type";

interface IProps {
  values: IOnboardingForm;
}

const startingDateLabels: Record<IOnboardingForm["startingDate"], string> = {
  today: "Today",
  monthStart: "Beginning of this month",
};

export default function Summary({ values }: IProps) {
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
      <p className="leading-7">Here's your budget overview:</p>

      <div>
        <p className="font-semibold">MONTHLY SUMMARY</p>
        <p className="leading-7">
          Income: ${values.primarySourceMonthlyAmount.toFixed(2)} (
          {values.primaryIncomeSource})
        </p>
        <p className="leading-7">Budget: ${totalBudgeted.toFixed(2)}</p>
        <p className="leading-7">
          Savings Goal: ${savingsGoal.toFixed(2)} ({savingsPercentage}%)
        </p>
      </div>

      <div>
        <p className="font-semibold">
          CATEGORIES ({values.categories.length} active)
        </p>
        {values.categories.length > 0 ? (
          <ul className="list-disc list-inside">
            {values.categories.map((cat) => (
              <li key={cat} className="leading-7 capitalize">
                {cat}
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
            No categories selected.
          </p>
        )}
      </div>

      <div>
        <p className="font-semibold">STARTING BALANCE</p>
        <p className="leading-7">${values.startingBalance.toFixed(2)}</p>
        <p className="leading-7 text-sm text-muted-foreground">
          Tracking from: {startingDateLabels[values.startingDate]}
        </p>
      </div>

      <div>
        <p className="font-semibold">PREFERENCES</p>
        <p className="leading-7 capitalize">
          Language: {values.language} · Currency:{" "}
          {values.currency.toUpperCase()}
        </p>
      </div>

      <div>
        <p className="font-semibold">NEXT STEPS</p>
        <ul className="list-disc list-inside">
          <li className="leading-7">Add your first transaction</li>
          <li className="leading-7">Set up recurring bills</li>
          <li className="leading-7">Explore reports and analytics</li>
        </ul>
      </div>
    </div>
  );
}
