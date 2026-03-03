import CustomSelect from "@/components/custom-select.component";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import type { IOnboardingForm } from "../onboarding.type";
import type { FormikErrors, FormikTouched } from "formik";
import { useTranslation } from "react-i18next";
import { LANGUAGE_CURRENCY_OPTIONS } from "@/utils/currency";
import { LanguageEnum } from "../utils/onboarding.enum";

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
  const { t, i18n } = useTranslation("onboarding");
  const { t: tCommon } = useTranslation("common");

  const handleLanguageChange = (value: LanguageEnum) => {
    setFieldValue("language", value);
    setFieldValue("currency", LANGUAGE_CURRENCY_OPTIONS[value]?.[0] ?? "usd");
    i18n.changeLanguage(value);
    document.documentElement.dir = value === LanguageEnum.AR ? "rtl" : "ltr";
    document.documentElement.lang = value;
  };

  const currencyOptions = (
    LANGUAGE_CURRENCY_OPTIONS[values.language] ?? ["usd"]
  ).map((code) => ({
    value: code,
    label: tCommon(`common.currencies.${code}`),
  }));

  return (
    <div>
      <p className="leading-7">{t("onboarding.welcome.description1")}</p>
      <p className="leading-7">{t("onboarding.welcome.description2")}</p>

      <FieldGroup className="mt-4">
        <Field>
          <FieldLabel>{t("onboarding.welcome.selectLanguage")}</FieldLabel>
          <CustomSelect
            label={t("onboarding.welcome.languageLabel")}
            value={values.language}
            options={languageOptions}
            onValueChange={(value) => handleLanguageChange(value as LanguageEnum)}
          />
          {touched.language && errors.language && (
            <FieldError>{errors.language}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel>{t("onboarding.welcome.selectCurrency")}</FieldLabel>
          <CustomSelect
            label={t("onboarding.welcome.currencyLabel")}
            value={values.currency}
            options={currencyOptions}
            onValueChange={(value) => setFieldValue("currency", value)}
          />
          {touched.currency && errors.currency && (
            <FieldError>{errors.currency}</FieldError>
          )}
        </Field>
      </FieldGroup>
    </div>
  );
}
