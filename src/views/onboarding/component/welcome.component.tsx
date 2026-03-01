import CustomSelect from "@/components/custom-select.component";
import type { IOnboardingForm } from "../onboarding.type";
import type { FormikErrors, FormikTouched } from "formik";
import { useTranslation } from "react-i18next";

const languageOptions = [
  { label: "English", value: "en" },
  { label: "Deutsch", value: "de" },
  { label: "日本語", value: "ja" },
  { label: "العربية", value: "ar" },
];

const currencyOptions = [{ label: "USD - US Dollar", value: "usd" }];

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
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (value: string) => {
    setFieldValue("language", value);
    i18n.changeLanguage(value);
    document.documentElement.dir = value === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = value;
  };

  return (
    <div>
      <p className="leading-7">{t("onboarding.welcome.description1")}</p>
      <p className="leading-7">{t("onboarding.welcome.description2")}</p>

      <p className="leading-7 mt-4">{t("onboarding.welcome.selectLanguage")}</p>
      <CustomSelect
        label={t("onboarding.welcome.languageLabel")}
        value={values.language}
        options={languageOptions}
        onValueChange={handleLanguageChange}
      />
      {touched.language && errors.language && (
        <p className="text-sm text-destructive mt-1">{errors.language}</p>
      )}

      <p className="leading-7 mt-4">{t("onboarding.welcome.selectCurrency")}</p>
      <CustomSelect
        label={t("onboarding.welcome.currencyLabel")}
        value={values.currency}
        options={currencyOptions}
        onValueChange={(value) => setFieldValue("currency", value)}
      />
      {touched.currency && errors.currency && (
        <p className="text-sm text-destructive mt-1">{errors.currency}</p>
      )}
    </div>
  );
}
