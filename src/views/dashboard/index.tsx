import { useTranslation } from "react-i18next";

import MonthSelector from "./components/month-selector.component";
import { useMonthSelector } from "./hooks/use-month-selector";

export default function Dashboard() {
  const { t: tDashboard } = useTranslation("dashboard");
  const { selected, canGoBack, canGoForward, goToPrevMonth, goToNextMonth } =
    useMonthSelector();

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
          onPrevMonth={goToPrevMonth}
          onNextMonth={goToNextMonth}
        />
      </div>
    </div>
  );
}
