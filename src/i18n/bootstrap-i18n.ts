import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { LanguageEnum } from "@/enums/language.enum";

import { getPersistedLanguage } from "./get-persisted-language.util";
import { buildResourcesForLanguages, NAMESPACES } from "./locale-loader.util";

const isDev = import.meta.env.DEV;

export async function bootstrapI18n(): Promise<void> {
  const selectedLanguage = getPersistedLanguage();
  const preloadLanguages =
    selectedLanguage === LanguageEnum.EN
      ? [LanguageEnum.EN]
      : [LanguageEnum.EN, selectedLanguage];
  const resources = await buildResourcesForLanguages(preloadLanguages);

  await i18n.use(initReactI18next).init({
    resources,
    lng: selectedLanguage,
    fallbackLng: LanguageEnum.EN,
    partialBundledLanguages: true,
    ns: [...NAMESPACES],
    interpolation: {
      escapeValue: false,
    },
    ...(isDev
      ? {
          saveMissing: true,
          saveMissingPlurals: true,
          missingKeyHandler(
            lngs: readonly string[],
            ns: string,
            key: string,
            fallbackValue: string,
          ) {
            console.warn(
              `[i18n] Missing key after fallback: ${ns}:${key} (lngs: ${lngs.join(", ")}) fallbackValue=${JSON.stringify(fallbackValue)}`,
            );
          },
        }
      : {}),
  });
}
