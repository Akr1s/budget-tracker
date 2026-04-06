import { LanguageEnum } from "@/enums/language.enum";
import { DEFAULT_SETTINGS } from "@/settings/settings.constant";
import { CurrencyEnum } from "@/utils/currency";

import { LocalStorageKeys, LocalStorageService } from "./local-storage.service";

export function getSavedLanguage(): LanguageEnum {
  const storedLanguage = LocalStorageService.getPlainString(
    LocalStorageKeys.LANGUAGE,
  );

  return (storedLanguage ?? DEFAULT_SETTINGS.language) as LanguageEnum;
}

export function getSavedDisplayCurrency(): CurrencyEnum {
  const storedCurrency = LocalStorageService.getPlainString(
    LocalStorageKeys.DISPLAY_CURRENCY,
  );

  return (storedCurrency ?? DEFAULT_SETTINGS.displayCurrency) as CurrencyEnum;
}

export function saveLanguageAndCurrency(
  language: LanguageEnum,
  currency: CurrencyEnum,
): void {
  LocalStorageService.setItem(LocalStorageKeys.LANGUAGE, language);
  LocalStorageService.setItem(LocalStorageKeys.DISPLAY_CURRENCY, currency);
}
