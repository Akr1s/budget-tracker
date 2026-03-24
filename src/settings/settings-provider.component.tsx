import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  LocalStorageKeys,
  LocalStorageService,
} from "@/storage/local-storage.service";
import type { IOnboardingForm } from "@/views/onboarding/onboarding.type";
import { DEFAULT_SETTINGS, SettingsContext } from "./settings.constant";
import type { ISettings } from "./settings.type";

interface IProps {
  children: React.ReactNode;
}

function loadInitialSettings(): ISettings {
  const onboardingData = LocalStorageService.getItem<IOnboardingForm>(
    LocalStorageKeys.ONBOARDING_DATA,
  );

  return {
    displayCurrency:
      onboardingData?.currency ?? DEFAULT_SETTINGS.displayCurrency,
    language: onboardingData?.language ?? DEFAULT_SETTINGS.language,
  };
}

export function SettingsProvider({ children }: IProps) {
  const { i18n } = useTranslation();
  const [settings, setSettings] = useState<ISettings>(loadInitialSettings);

  useEffect(() => {
    i18n.changeLanguage(settings.language);
  }, [settings.language, i18n]);

  function updateSettings(updates: Partial<ISettings>) {
    setSettings((prev) => {
      const next = { ...prev, ...updates };

      const onboardingData = LocalStorageService.getItem<IOnboardingForm>(
        LocalStorageKeys.ONBOARDING_DATA,
      );
      if (onboardingData) {
        const updated: IOnboardingForm = {
          ...onboardingData,
          currency: next.displayCurrency,
          language: next.language,
        };
        LocalStorageService.setItem(
          LocalStorageKeys.ONBOARDING_DATA,
          JSON.stringify(updated),
        );
      }

      return next;
    });
  }

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}
