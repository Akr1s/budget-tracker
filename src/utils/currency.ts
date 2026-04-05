import { LanguageEnum } from "@/enums/language.enum";

export enum CurrencyEnum {
  USD = "usd",
  EUR = "eur",
  JPY = "jpy",
  SAR = "sar",
}

const currencySymbols: Record<CurrencyEnum, string> = {
  [CurrencyEnum.USD]: "$",
  [CurrencyEnum.EUR]: "€",
  [CurrencyEnum.JPY]: "¥",
  [CurrencyEnum.SAR]: "ر.س",
};

export const LANGUAGE_CURRENCY_OPTIONS: Record<LanguageEnum, CurrencyEnum[]> = {
  [LanguageEnum.EN]: [CurrencyEnum.USD, CurrencyEnum.EUR],
  [LanguageEnum.DE]: [CurrencyEnum.EUR, CurrencyEnum.USD],
  [LanguageEnum.JA]: [CurrencyEnum.JPY, CurrencyEnum.USD, CurrencyEnum.EUR],
  [LanguageEnum.AR]: [CurrencyEnum.SAR, CurrencyEnum.USD, CurrencyEnum.EUR],
};

export const getCurrencySymbol = (code: CurrencyEnum): string =>
  currencySymbols[code] ?? code;
