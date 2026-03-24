import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { useSettings } from "@/settings/use-settings.hook";
import { convertTransactions } from "@/utils/currency-converter";
import MonthSelector from "./components/month-selector.component";
import IncomeVsExpenses from "./income-vs-expenses";
import RecentTransactions from "./recent-transactions";
import SummaryCards from "./summary-cards";
import SpendingByCategory from "./spending-by-category";
import { useMonthSelector } from "./hooks/use-month-selector";
import { useMonthlyTransactions } from "./hooks/use-monthly-transactions";

export default function Dashboard() {
  const { t: tDashboard } = useTranslation("dashboard");
  const { settings } = useSettings();
  const {
    selected,
    canGoBack,
    canGoForward,
    isCurrentMonth,
    goToPrevMonth,
    goToNextMonth,
    goToCurrentMonth,
  } = useMonthSelector();
  const { transactions, isLoading } = useMonthlyTransactions(selected);

  const converted = useMemo(
    () => convertTransactions(transactions, settings.displayCurrency),
    [transactions, settings.displayCurrency],
  );

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">
          {tDashboard("title")}
        </h1>
        <MonthSelector
          selected={selected}
          canGoBack={canGoBack}
          canGoForward={canGoForward}
          isCurrentMonth={isCurrentMonth}
          onPrevMonth={goToPrevMonth}
          onNextMonth={goToNextMonth}
          onGoToCurrentMonth={goToCurrentMonth}
        />
      </div>
      <SummaryCards
        transactions={converted}
        currency={settings.displayCurrency}
        isLoading={isLoading}
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <SpendingByCategory
          transactions={converted}
          currency={settings.displayCurrency}
          isLoading={isLoading}
        />
        <RecentTransactions
          transactions={converted}
          currency={settings.displayCurrency}
          isLoading={isLoading}
        />
      </div>
      <IncomeVsExpenses currency={settings.displayCurrency} />
    </div>
  );
}
