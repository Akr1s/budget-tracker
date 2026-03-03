export enum LocalStorageKeys {
  ONBOARDING_DATA = "onboarding-data",
}

export class LocalStorageService {
  static checkIfItemExists(key: LocalStorageKeys) {
    return localStorage.getItem(key) !== null;
  }

  static setItem(key: LocalStorageKeys, value: string) {
    localStorage.setItem(key, value);
  }

  static getItem<T>(key: LocalStorageKeys): T | null {
    const item = localStorage.getItem(key);
    if (!item) return null;
    try {
      return JSON.parse(item) as T;
    } catch {
      return null;
    }
  }
}
