import { LanguageEnum } from "@/enums/language.enum";

export function applyDocumentLanguage(language: string): void {
  document.documentElement.lang = language;
  document.documentElement.dir =
    language === LanguageEnum.AR ? "rtl" : "ltr";
}