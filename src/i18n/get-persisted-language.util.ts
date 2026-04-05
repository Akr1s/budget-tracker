import type { LanguageEnum } from "@/enums/language.enum";
import { DEFAULT_SETTINGS } from "@/settings/settings.constant";
import {
  LocalStorageKeys,
  LocalStorageService,
} from "@/storage/local-storage.service";
import type { IOnboardingForm } from "@/views/onboarding/onboarding.type";

export function getPersistedLanguage(): LanguageEnum {
  const onboarding = LocalStorageService.getItem<IOnboardingForm>(
    LocalStorageKeys.ONBOARDING_DATA,
  );

  return onboarding?.language ?? DEFAULT_SETTINGS.language;
}
