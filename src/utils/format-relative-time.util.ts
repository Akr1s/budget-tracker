import { DateService } from "@/utils/date.service";

export function formatRelativeTime(isoDate: string, locale: string): string {
  const date = new Date(isoDate);
  const time = date.getTime();

  const diffMs = Date.now() - time;
  if (diffMs < 0) {
    return DateService.toDisplayDate(isoDate, locale);
  }

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });

  const seconds = Math.floor(diffMs / 1000);
  if (seconds < 60) {
    return rtf.format(-seconds, "second");
  }

  const minutes = Math.floor(diffMs / 60_000);
  if (minutes < 60) {
    return rtf.format(-minutes, "minute");
  }

  const hours = Math.floor(diffMs / 3_600_000);
  if (hours < 24) {
    return rtf.format(-hours, "hour");
  }

  const days = Math.floor(diffMs / 86_400_000);
  if (days < 30) {
    return rtf.format(-days, "day");
  }

  const months = Math.floor(days / 30);
  if (months < 12) {
    return rtf.format(-months, "month");
  }

  const years = Math.floor(days / 365);
  return rtf.format(-years, "year");
}
