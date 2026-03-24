import type onboardingEn from "./locales/en/onboarding.json";
import onboardingDe from "./locales/de/onboarding.json";
import onboardingJa from "./locales/ja/onboarding.json";
import onboardingAr from "./locales/ar/onboarding.json";

import type transactionsEn from "./locales/en/transactions.json";
import transactionsDe from "./locales/de/transactions.json";
import transactionsJa from "./locales/ja/transactions.json";
import transactionsAr from "./locales/ar/transactions.json";

import type commonEn from "./locales/en/common.json";
import commonDe from "./locales/de/common.json";
import commonJa from "./locales/ja/common.json";
import commonAr from "./locales/ar/common.json";

import type dashboardEn from "./locales/en/dashboard.json";
import dashboardDe from "./locales/de/dashboard.json";
import dashboardJa from "./locales/ja/dashboard.json";
import dashboardAr from "./locales/ar/dashboard.json";

import type settingsEn from "./locales/en/settings.json";
import settingsDe from "./locales/de/settings.json";
import settingsJa from "./locales/ja/settings.json";
import settingsAr from "./locales/ar/settings.json";

declare module "i18next" {
  interface CustomTypeOptions {
    resources: {
      onboarding: typeof onboardingEn;
      transactions: typeof transactionsEn;
      common: typeof commonEn;
      dashboard: typeof dashboardEn;
      settings: typeof settingsEn;
    };
  }
}

type DeepStringify<T> = {
  [K in keyof T]: T[K] extends string ? string : DeepStringify<T[K]>;
};

type OnboardingShape = DeepStringify<typeof onboardingEn>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _checkOnboardingDe: OnboardingShape = onboardingDe;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _checkOnboardingJa: OnboardingShape = onboardingJa;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _checkOnboardingAr: OnboardingShape = onboardingAr;

type TransactionsShape = DeepStringify<typeof transactionsEn>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _checkTransactionsDe: TransactionsShape = transactionsDe;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _checkTransactionsJa: TransactionsShape = transactionsJa;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _checkTransactionsAr: TransactionsShape = transactionsAr;

type CommonShape = DeepStringify<typeof commonEn>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _checkCommonDe: CommonShape = commonDe;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _checkCommonJa: CommonShape = commonJa;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _checkCommonAr: CommonShape = commonAr;

type DashboardShape = DeepStringify<typeof dashboardEn>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _checkDashboardDe: DashboardShape = dashboardDe;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _checkDashboardJa: DashboardShape = dashboardJa;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _checkDashboardAr: DashboardShape = dashboardAr;

type SettingsShape = DeepStringify<typeof settingsEn>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _checkSettingsDe: SettingsShape = settingsDe;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _checkSettingsJa: SettingsShape = settingsJa;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _checkSettingsAr: SettingsShape = settingsAr;
