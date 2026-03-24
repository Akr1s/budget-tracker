import { CurrencyEnum } from "@/utils/currency";

const CURRENCY_LOCALE_MAP: Record<CurrencyEnum, string> = {
  [CurrencyEnum.USD]: "en-US",
  [CurrencyEnum.EUR]: "de-DE",
  [CurrencyEnum.JPY]: "ja-JP",
  [CurrencyEnum.SAR]: "ar-SA",
};

export function formatCurrency(amount: number, currency: CurrencyEnum): string {
  return new Intl.NumberFormat(CURRENCY_LOCALE_MAP[currency], {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount);
}
