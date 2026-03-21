import { useTranslation } from "react-i18next";

import type { IOnboardingForm } from "@/views/onboarding/onboarding.type";
import {
  LocalStorageKeys,
  LocalStorageService,
} from "@/storage/local-storage.service";
import { CurrencyEnum } from "@/utils/currency";
import MonthSelector from "./components/month-selector.component";
import SummaryCards from "./summary-cards";
import { useMonthSelector } from "./hooks/use-month-selector";
import { useMonthlyTransactions } from "./hooks/use-monthly-transactions";

export default function Dashboard() {
  const { t: tDashboard } = useTranslation("dashboard");
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

  const onboardingData = LocalStorageService.getItem<IOnboardingForm>(
    LocalStorageKeys.ONBOARDING_DATA,
  );
  const currency = onboardingData?.currency ?? CurrencyEnum.USD;

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
        transactions={transactions}
        currency={currency}
        isLoading={isLoading}
      />
    </div>
  );
}
