import { CurrencyEnum } from "@/utils/currency";

export function formatCurrency(
  amount: number,
  currency: CurrencyEnum,
  locale: string,
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount);
}
