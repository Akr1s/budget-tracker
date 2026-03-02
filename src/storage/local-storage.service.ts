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
}
