import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { applyDocumentLanguage } from "@/i18n/apply-document-language.util";
import { ensureLanguageLoaded } from "@/i18n/locale-loader.util";
import {
  getSavedDisplayCurrency,
  getSavedLanguage,
  saveLanguageAndCurrency,
} from "@/storage/app-preferences.util";

import { SettingsContext } from "./settings.constant";
import type { ISettings } from "./settings.type";

interface IProps {
  children: React.ReactNode;
}

function loadInitialSettings(): ISettings {
  return {
    displayCurrency: getSavedDisplayCurrency(),
    language: getSavedLanguage(),
  };
}

export function SettingsProvider({ children }: IProps) {
  const { i18n } = useTranslation();

  const [settings, setSettings] = useState<ISettings>(loadInitialSettings);

  useEffect(() => {
    let cancelled = false;

    const applyLanguage = async (language: string): Promise<void> => {
      await ensureLanguageLoaded(language);

      if (!cancelled) {
        await i18n.changeLanguage(language);
      }
    };

    void applyLanguage(settings.language);

    return () => {
      cancelled = true;
    };
  }, [settings.language]);

  useEffect(() => {
    applyDocumentLanguage(i18n.language);
  }, [i18n.language]);

  function updateSettings(updates: Partial<ISettings>) {
    setSettings((prev) => {
      const next = { ...prev, ...updates };
      saveLanguageAndCurrency(next.language, next.displayCurrency);

      return next;
    });
  }

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}
