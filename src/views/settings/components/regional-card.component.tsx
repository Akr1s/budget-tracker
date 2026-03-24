import { useTranslation } from "react-i18next";

import CustomSelect from "@/components/custom-select.component";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { useSettings } from "@/settings/use-settings.hook";
import { CurrencyEnum } from "@/utils/currency";

export default function RegionalCard() {
  const { t: tSettings } = useTranslation("settings");
  const { t: tCommon } = useTranslation("common");
  const { settings, updateSettings } = useSettings();

  const currencyOptions = Object.values(CurrencyEnum).map((c) => ({
    label: tCommon(`currencies.${c}`),
    value: c,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          {tSettings("regional.title")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field>
            <FieldLabel>{tSettings("regional.displayCurrency")}</FieldLabel>
            <CustomSelect
              label={tSettings("regional.displayCurrency")}
              value={settings.displayCurrency}
              options={currencyOptions}
              className="w-full max-w-xs"
              onValueChange={(value) =>
                updateSettings({ displayCurrency: value as CurrencyEnum })
              }
            />
          </Field>
        </FieldGroup>
      </CardContent>
    </Card>
  );
}
