import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import type { IOnboardingForm } from "../onboarding.type";
import type { FormikErrors, FormikTouched } from "formik";
import { useTranslation } from "react-i18next";

interface IProps {
  setFieldValue: (
    field: keyof IOnboardingForm,
    value: string[],
    shouldValidate?: boolean | undefined,
  ) => Promise<void> | Promise<FormikErrors<IOnboardingForm>>;
  values: IOnboardingForm;
  errors: FormikErrors<IOnboardingForm>;
  touched: FormikTouched<IOnboardingForm>;
}

export default function Categories({
  setFieldValue,
  values,
  errors,
  touched,
}: IProps) {
  const { t } = useTranslation();

  const categories = [
    {
      value: "essential",
      label: t("onboarding.categories.groups.essential"),
      items: [
        { label: t("onboarding.categories.items.housing"), value: "housing" },
        { label: t("onboarding.categories.items.groceries"), value: "groceries" },
        { label: t("onboarding.categories.items.transportation"), value: "transportation" },
        { label: t("onboarding.categories.items.healthcare"), value: "healthcare" },
      ],
    },
    {
      value: "lifestyle",
      label: t("onboarding.categories.groups.lifestyle"),
      items: [
        { label: t("onboarding.categories.items.entertainment"), value: "entertainment" },
        { label: t("onboarding.categories.items.shopping"), value: "shopping" },
        { label: t("onboarding.categories.items.sports"), value: "sports" },
        { label: t("onboarding.categories.items.travel"), value: "travel" },
      ],
    },
    {
      value: "financial",
      label: t("onboarding.categories.groups.financial"),
      items: [
        { label: t("onboarding.categories.items.debt"), value: "debt" },
        { label: t("onboarding.categories.items.savings"), value: "savings" },
        { label: t("onboarding.categories.items.education"), value: "education" },
      ],
    },
  ];

  const handleCheckedChange = (checked: boolean, value: string) => {
    if (checked) {
      setFieldValue("categories", [...values.categories, value]);
    } else {
      setFieldValue(
        "categories",
        values.categories.filter((category) => category !== value),
      );
    }
  };

  return (
    <div>
      <FieldSet>
        <FieldLegend variant="label">
          {t("onboarding.categories.heading")}
        </FieldLegend>
        <FieldGroup className="gap-3">
          {categories.map((category) => (
            <div key={category.value}>
              <p className="leading-7">{category.label}</p>
              {category.items.map((item) => (
                <Field key={item.value} orientation="horizontal">
                  <Checkbox
                    id={item.value}
                    name={item.value}
                    checked={values.categories.includes(item.value)}
                    onCheckedChange={(checked) =>
                      handleCheckedChange(checked as boolean, item.value)
                    }
                  />
                  <FieldLabel htmlFor={item.value} className="font-normal">
                    {item.label}
                  </FieldLabel>
                </Field>
              ))}
            </div>
          ))}
        </FieldGroup>
      </FieldSet>
      {touched.categories && errors.categories && (
        <p className="text-sm text-destructive mt-1">
          {typeof errors.categories === "string" ? errors.categories : null}
        </p>
      )}
    </div>
  );
}
