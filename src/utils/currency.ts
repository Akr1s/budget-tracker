export const CURRENCIES = {
  usd: { symbol: "$" },
  eur: { symbol: "€" },
  jpy: { symbol: "¥" },
  sar: { symbol: "ر.س" },
} as const;

export type CurrencyCode = keyof typeof CURRENCIES;

export const LANGUAGE_CURRENCY_OPTIONS: Record<string, CurrencyCode[]> = {
  en: ["usd", "eur"],
  de: ["eur", "usd"],
  ja: ["jpy", "usd", "eur"],
  ar: ["sar", "usd", "eur"],
};

export const getCurrencySymbol = (code: CurrencyCode): string =>
  CURRENCIES[code]?.symbol ?? code;
