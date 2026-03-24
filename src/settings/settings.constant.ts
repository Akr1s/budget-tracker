import { createContext } from "react";

import { CurrencyEnum } from "@/utils/currency";
import { LanguageEnum } from "@/views/onboarding/utils/onboarding.enum";
import type { ISettingsContext } from "./settings.type";

export const DEFAULT_SETTINGS = {
  displayCurrency: CurrencyEnum.USD,
  language: LanguageEnum.EN,
};

export const SettingsContext = createContext<ISettingsContext>({
  settings: DEFAULT_SETTINGS,
  updateSettings: () => null,
});
