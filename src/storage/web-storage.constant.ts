import store from "store2";

const STORAGE_PREFIX = "budget-tracker" as const;

export const LocalStorageKeys = {
  ONBOARDING_DATA: "onboarding-data",
  LANGUAGE: "language",
  DISPLAY_CURRENCY: "display-currency",
  THEME: "theme",
} as const;

export const SessionStorageKeys = {
  TRANSACTION_DRAFT: "transaction-draft",
} as const;

export const localWebStorage = store.namespace(STORAGE_PREFIX, true, ":");

export const sessionWebStorage = store.session.namespace(
  STORAGE_PREFIX,
  true,
  ":",
);

export function clearAllBrowserStorage(): void {
  store.clear();
  store.session.clear();
}
