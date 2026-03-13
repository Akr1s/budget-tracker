import { useMemo, useState } from "react";

export interface IMonthYear {
  year: number;
  month: number;
}

const MONTH_RANGE = 6;

function isSameMonth(a: IMonthYear, b: IMonthYear): boolean {
  return a.year === b.year && a.month === b.month;
}

function isBeforeMonth(a: IMonthYear, b: IMonthYear): boolean {
  return a.year < b.year || (a.year === b.year && a.month < b.month);
}

function addMonths(base: IMonthYear, offset: number): IMonthYear {
  const date = new Date(base.year, base.month + offset, 1);
  return { year: date.getFullYear(), month: date.getMonth() };
}

export function useMonthSelector() {
  const current: IMonthYear = useMemo(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  }, []);

  const [selected, setSelected] = useState<IMonthYear>(current);

  const minMonth = useMemo(() => addMonths(current, -MONTH_RANGE), [current]);
  const maxMonth = useMemo(() => addMonths(current, MONTH_RANGE), [current]);

  const canGoBack =
    !isSameMonth(selected, minMonth) && !isBeforeMonth(selected, minMonth);
  const canGoForward =
    !isSameMonth(selected, maxMonth) && !isBeforeMonth(maxMonth, selected);

  function goToPrevMonth() {
    if (!canGoBack) return;
    setSelected((prev) => addMonths(prev, -1));
  }

  function goToNextMonth() {
    if (!canGoForward) return;
    setSelected((prev) => addMonths(prev, 1));
  }

  const monthStart = new Date(selected.year, selected.month, 1).toISOString();
  const monthEnd = new Date(selected.year, selected.month + 1, 1).toISOString();

  return {
    selected,
    monthStart,
    monthEnd,
    canGoBack,
    canGoForward,
    goToPrevMonth,
    goToNextMonth,
  };
}
