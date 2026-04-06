import CustomSelect from "@/components/custom-select.component";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import type { IOnboardingForm } from "../onboarding.type";
import type { FormikErrors, FormikTouched } from "formik";
import { useTranslation } from "react-i18next";
import { useSettings } from "@/settings/use-settings.hook";
import { CurrencyEnum, LANGUAGE_CURRENCY_OPTIONS } from "@/utils/currency";
import { LanguageEnum } from "@/enums/language.enum";

const languageOptions = [
  { label: "English", value: LanguageEnum.EN },
  { label: "Deutsch", value: LanguageEnum.DE },
  { label: "日本語", value: LanguageEnum.JA },
  { label: "العربية", value: LanguageEnum.AR },
];

interface IProps {
  setFieldValue: (
    field: keyof IOnboardingForm,
    value: string,
    shouldValidate?: boolean | undefined,
  ) => Promise<void> | Promise<FormikErrors<IOnboardingForm>>;
  values: IOnboardingForm;
  errors: FormikErrors<IOnboardingForm>;
  touched: FormikTouched<IOnboardingForm>;
}

export default function Welcome({
  setFieldValue,
  values,
  errors,
  touched,
}: IProps) {
  const { updateSettings } = useSettings();
  const { t: tOnboarding } = useTranslation("onboarding");
  const { t: tCommon } = useTranslation("common");

  const handleLanguageChange = (value: LanguageEnum) => {
    const nextCurrency =
      LANGUAGE_CURRENCY_OPTIONS[value]?.[0] ?? CurrencyEnum.USD;

    setFieldValue("language", value);
    setFieldValue("currency", nextCurrency);
    updateSettings({ language: value, displayCurrency: nextCurrency });
  };

  const handleCurrencyChange = (value: string) => {
    const code = value as CurrencyEnum;
    setFieldValue("currency", code);
    updateSettings({ displayCurrency: code });
  };

  const currencyOptions = (
    LANGUAGE_CURRENCY_OPTIONS[values.language] ?? [CurrencyEnum.USD]
  ).map((code) => ({
    value: code,
    label: tCommon(`currencies.${code}`),
  }));

  return (
    <div>
      <p className="leading-7">{tOnboarding("welcome.description1")}</p>
      <p className="leading-7">{tOnboarding("welcome.description2")}</p>

      <FieldGroup className="mt-4">
        <Field>
          <FieldLabel>{tOnboarding("welcome.selectLanguage")}</FieldLabel>
          <CustomSelect
            label={tOnboarding("welcome.languageLabel")}
            value={values.language}
            options={languageOptions}
            onValueChange={(value) =>
              handleLanguageChange(value as LanguageEnum)
            }
          />
          {touched.language && errors.language && (
            <FieldError>{errors.language}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel>{tOnboarding("welcome.selectCurrency")}</FieldLabel>
          <CustomSelect
            label={tOnboarding("welcome.currencyLabel")}
            value={values.currency}
            options={currencyOptions}
            onValueChange={handleCurrencyChange}
          />
          {touched.currency && errors.currency && (
            <FieldError>{errors.currency}</FieldError>
          )}
        </Field>
      </FieldGroup>
    </div>
  );
}
