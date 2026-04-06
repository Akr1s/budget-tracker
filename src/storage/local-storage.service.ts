const STORAGE_PREFIX = "budget-tracker" as const;

export const LocalStorageKeys = {
  ONBOARDING_DATA: `${STORAGE_PREFIX}:onboarding-data`,
  LANGUAGE: `${STORAGE_PREFIX}:language`,
  DISPLAY_CURRENCY: `${STORAGE_PREFIX}:display-currency`,
  THEME: `${STORAGE_PREFIX}:theme`,
} as const;

type ILocalStorageKey =
  (typeof LocalStorageKeys)[keyof typeof LocalStorageKeys];

export class LocalStorageService {
  static checkIfItemExists(key: ILocalStorageKey) {
    return localStorage.getItem(key) !== null;
  }

  static setItem(key: ILocalStorageKey, value: string) {
    localStorage.setItem(key, value);
  }

  static getPlainString(key: ILocalStorageKey): string | null {
    return localStorage.getItem(key);
  }

  static getItem<T>(key: ILocalStorageKey): T | null {
    const item = localStorage.getItem(key);
    if (!item) return null;
    try {
      return JSON.parse(item) as T;
    } catch {
      return null;
    }
  }
}
