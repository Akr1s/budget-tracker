import type en from "./locales/en/translation.json";
import de from "./locales/de/translation.json";
import ja from "./locales/ja/translation.json";
import ar from "./locales/ar/translation.json";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    resources: {
      translation: typeof en;
    };
  }
}

type DeepStringify<T> = {
  [K in keyof T]: T[K] extends string ? string : DeepStringify<T[K]>;
};

type TranslationShape = DeepStringify<typeof en>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _checkDe: TranslationShape = de;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _checkJa: TranslationShape = ja;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _checkAr: TranslationShape = ar;
