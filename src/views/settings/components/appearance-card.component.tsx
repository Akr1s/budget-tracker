import { useTranslation } from "react-i18next";

import CustomRadioGroup from "@/components/custom-radiogroup.component";
import CustomSelect from "@/components/custom-select.component";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { useSettings } from "@/settings/use-settings.hook";
import type { Theme } from "@/theme/provider.constant";
import { useTheme } from "@/theme/use-theme.hook";
import { LanguageEnum } from "@/views/onboarding/utils/onboarding.enum";

export default function AppearanceCard() {
  const { t: tSettings } = useTranslation("settings");
  const { t: tCommon } = useTranslation("common");
  const { settings, updateSettings } = useSettings();
  const { theme, setTheme } = useTheme();

  const languageOptions = Object.values(LanguageEnum).map((lang) => ({
    label: tSettings(`languages.${lang}`),
    value: lang,
  }));

  const themeOptions: { label: string; value: Theme }[] = [
    { label: tCommon("themeLight"), value: "light" },
    { label: tCommon("themeDark"), value: "dark" },
    { label: tCommon("themeSystem"), value: "system" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          {tSettings("appearance.title")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field>
            <FieldLabel>{tSettings("appearance.language")}</FieldLabel>
            <CustomSelect
              label={tSettings("appearance.language")}
              value={settings.language}
              options={languageOptions}
              className="w-full max-w-xs"
              onValueChange={(value) =>
                updateSettings({ language: value as LanguageEnum })
              }
            />
          </Field>
          <Field>
            <FieldLabel>{tSettings("appearance.theme")}</FieldLabel>
            <CustomRadioGroup
              className="flex flex-row gap-4"
              value={theme}
              onValueChange={(value) => setTheme(value as Theme)}
              items={themeOptions}
            />
          </Field>
        </FieldGroup>
      </CardContent>
    </Card>
  );
}
