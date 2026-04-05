import type onboardingEn from "./locales/en/onboarding.json";
import type transactionsEn from "./locales/en/transactions.json";
import type commonEn from "./locales/en/common.json";
import type dashboardEn from "./locales/en/dashboard.json";
import type settingsEn from "./locales/en/settings.json";

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
