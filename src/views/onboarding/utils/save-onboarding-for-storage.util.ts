import {
  LocalStorageKeys,
  localWebStorage,
} from "@/storage/web-storage.constant";

import type { IOnboardingForm } from "../onboarding.type";

export function saveOnboardingDataToStorage(values: IOnboardingForm): void {
  const { language, currency, ...rest } = values;
  void language;
  void currency;

  localWebStorage.set(LocalStorageKeys.ONBOARDING_DATA, rest);
}
