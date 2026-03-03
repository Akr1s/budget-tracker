import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import type { IOnboardingForm } from "../onboarding.type";
import type { FormikErrors, FormikTouched } from "formik";
import { useTranslation } from "react-i18next";
import { CategoryEnum } from "../utils/onboarding.enum";

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
  const { t } = useTranslation("onboarding");
  const { t: tCommon } = useTranslation("common");

  const categories = [
    {
      value: "essential",
      label: t("onboarding.categories.groups.essential"),
      items: [
        { label: tCommon("common.categories.housing"), value: CategoryEnum.HOUSING },
        { label: tCommon("common.categories.groceries"), value: CategoryEnum.GROCERIES },
        { label: tCommon("common.categories.transportation"), value: CategoryEnum.TRANSPORTATION },
        { label: tCommon("common.categories.healthcare"), value: CategoryEnum.HEALTHCARE },
      ],
    },
    {
      value: "lifestyle",
      label: t("onboarding.categories.groups.lifestyle"),
      items: [
        { label: tCommon("common.categories.entertainment"), value: CategoryEnum.ENTERTAINMENT },
        { label: tCommon("common.categories.shopping"), value: CategoryEnum.SHOPPING },
        { label: tCommon("common.categories.sports"), value: CategoryEnum.SPORTS },
        { label: tCommon("common.categories.travel"), value: CategoryEnum.TRAVEL },
      ],
    },
    {
      value: "financial",
      label: t("onboarding.categories.groups.financial"),
      items: [
        { label: tCommon("common.categories.debt"), value: CategoryEnum.DEBT },
        { label: tCommon("common.categories.savings"), value: CategoryEnum.SAVINGS },
        { label: tCommon("common.categories.education"), value: CategoryEnum.EDUCATION },
      ],
    },
  ];

  const handleCheckedChange = (checked: boolean, value: CategoryEnum) => {
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
      {touched.categories && errors.categories && typeof errors.categories === "string" && (
        <FieldError>{errors.categories}</FieldError>
      )}
    </div>
  );
}
