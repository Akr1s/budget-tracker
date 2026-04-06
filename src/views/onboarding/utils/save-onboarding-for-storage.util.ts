import {
  LocalStorageKeys,
  LocalStorageService,
} from "@/storage/local-storage.service";

import type { IOnboardingForm } from "../onboarding.type";

export function saveOnboardingDataToStorage(values: IOnboardingForm): void {
  const { language, currency, ...rest } = values;
  void language;
  void currency;

  LocalStorageService.setItem(
    LocalStorageKeys.ONBOARDING_DATA,
    JSON.stringify(rest),
  );
}
