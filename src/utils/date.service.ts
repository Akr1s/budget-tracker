export class DateService {
  private static localMidnightToUTC(
    year: number,
    month: number,
    day: number,
  ): string {
    return new Date(year, month, day).toISOString();
  }

  static getToday(): string {
    const now = new Date();
    return DateService.localMidnightToUTC(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    );
  }

  static getTodayInputValue(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  static getCurrentMonthStart(): string {
    const now = new Date();
    return DateService.localMidnightToUTC(now.getFullYear(), now.getMonth(), 1);
  }

  static getNextMonthStart(): string {
    const now = new Date();
    return DateService.localMidnightToUTC(
      now.getFullYear(),
      now.getMonth() + 1,
      1,
    );
  }

  static toDisplayDate(isoString: string, locale?: string): string {
    return new Date(isoString).toLocaleDateString(
      locale ?? navigator.language,
    );
  }
}
