import { LanguageEnum } from "@/enums/language.enum";
import { DEFAULT_SETTINGS } from "@/settings/settings.constant";
import { CurrencyEnum } from "@/utils/currency";

import { LocalStorageKeys, localWebStorage } from "./web-storage.constant";

export function getSavedLanguage(): LanguageEnum {
  const storedLanguage = localWebStorage.get(LocalStorageKeys.LANGUAGE);

  return (storedLanguage ?? DEFAULT_SETTINGS.language) as LanguageEnum;
}

export function getSavedDisplayCurrency(): CurrencyEnum {
  const storedCurrency = localWebStorage.get(LocalStorageKeys.DISPLAY_CURRENCY);

  return (storedCurrency ?? DEFAULT_SETTINGS.displayCurrency) as CurrencyEnum;
}

export function saveLanguageAndCurrency(
  language: LanguageEnum,
  currency: CurrencyEnum,
): void {
  localWebStorage.set(LocalStorageKeys.LANGUAGE, language);
  localWebStorage.set(LocalStorageKeys.DISPLAY_CURRENCY, currency);
}
