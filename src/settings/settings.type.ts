import type { CurrencyEnum } from "@/utils/currency";
import type { LanguageEnum } from "@/enums/language.enum";

export interface ISettings {
  displayCurrency: CurrencyEnum;
  language: LanguageEnum;
}

export interface ISettingsContext {
  settings: ISettings;
  updateSettings: (updates: Partial<ISettings>) => void;
}
