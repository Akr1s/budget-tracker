const STORAGE_PREFIX = "budget-tracker" as const;

export const SessionStorageKeys = {
  TRANSACTION_CREATE_DRAFT: `${STORAGE_PREFIX}:transaction-create-draft`,
} as const;

type ISessionStorageKey =
  (typeof SessionStorageKeys)[keyof typeof SessionStorageKeys];

export class SessionStorageService {
  static setItem(key: ISessionStorageKey, value: string) {
    sessionStorage.setItem(key, value);
  }

  static removeItem(key: ISessionStorageKey) {
    sessionStorage.removeItem(key);
  }

  static getItem<T>(key: ISessionStorageKey): T | null {
    const item = sessionStorage.getItem(key);
    if (!item) return null;
    try {
      return JSON.parse(item) as T;
    } catch {
      return null;
    }
  }
}
