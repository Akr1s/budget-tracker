import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { IMonthYear } from "../hooks/use-month-selector";

interface MonthSelectorProps {
  selected: IMonthYear;
  canGoBack: boolean;
  canGoForward: boolean;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

function formatMonthYear(monthYear: IMonthYear, locale: string): string {
  const date = new Date(monthYear.year, monthYear.month, 1);
  return new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
  }).format(date);
}

export default function MonthSelector({
  selected,
  canGoBack,
  canGoForward,
  onPrevMonth,
  onNextMonth,
}: MonthSelectorProps) {
  const { t, i18n } = useTranslation("dashboard");

  const label = formatMonthYear(selected, i18n.language);

  return (
    <div className="flex items-center gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon-sm"
            onClick={onPrevMonth}
            disabled={!canGoBack}
            aria-label={t("monthSelector.previousMonth")}
          >
            <ChevronLeft className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>{t("monthSelector.previousMonth")}</TooltipContent>
      </Tooltip>

      <span
        className="min-w-[10rem] text-center text-sm font-medium capitalize"
        aria-live="polite"
      >
        {label}
      </span>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon-sm"
            onClick={onNextMonth}
            disabled={!canGoForward}
            aria-label={t("monthSelector.nextMonth")}
          >
            <ChevronRight className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>{t("monthSelector.nextMonth")}</TooltipContent>
      </Tooltip>
    </div>
  );
}
