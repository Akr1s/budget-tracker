import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import onboardingEn from "./locales/en/onboarding.json";
import onboardingDe from "./locales/de/onboarding.json";
import onboardingJa from "./locales/ja/onboarding.json";
import onboardingAr from "./locales/ar/onboarding.json";

import transactionsEn from "./locales/en/transactions.json";
import transactionsDe from "./locales/de/transactions.json";
import transactionsJa from "./locales/ja/transactions.json";
import transactionsAr from "./locales/ar/transactions.json";

import commonEn from "./locales/en/common.json";
import commonDe from "./locales/de/common.json";
import commonJa from "./locales/ja/common.json";
import commonAr from "./locales/ar/common.json";

import dashboardEn from "./locales/en/dashboard.json";
import dashboardDe from "./locales/de/dashboard.json";
import dashboardJa from "./locales/ja/dashboard.json";
import dashboardAr from "./locales/ar/dashboard.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      onboarding: onboardingEn,
      transactions: transactionsEn,
      common: commonEn,
      dashboard: dashboardEn,
    },
    de: {
      onboarding: onboardingDe,
      transactions: transactionsDe,
      common: commonDe,
      dashboard: dashboardDe,
    },
    ja: {
      onboarding: onboardingJa,
      transactions: transactionsJa,
      common: commonJa,
      dashboard: dashboardJa,
    },
    ar: {
      onboarding: onboardingAr,
      transactions: transactionsAr,
      common: commonAr,
      dashboard: dashboardAr,
    },
  },
  lng: "en",
  fallbackLng: "en",
  ns: ["onboarding", "transactions", "common", "dashboard"],
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
