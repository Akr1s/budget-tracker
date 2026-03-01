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

const categories = [
  {
    value: "essential",
    label: "ESSENTIAL",
    items: [
      { label: "Housing (rent, mortgage, utilities)", value: "housing" },
      { label: "Groceries & Food", value: "groceries" },
      { label: "Transportation", value: "transportation" },
      { label: "Healthcare & Insurance", value: "healthcare" },
    ],
  },
  {
    value: "lifestyle",
    label: "LIFESTYLE",
    items: [
      { label: "Entertainment", value: "entertainment" },
      { label: "Shopping & Personal", value: "shopping" },
      { label: "Fitness & Sports", value: "sports" },
      { label: "Travel & Vacation", value: "travel" },
    ],
  },
  {
    value: "financial",
    label: "FINANCIAL",
    items: [
      { label: "Debt Payments", value: "debt" },
      { label: "Savings & Investments", value: "savings" },
      { label: "Education", value: "education" },
    ],
  },
];

export default function Categories({
  setFieldValue,
  values,
  errors,
  touched,
}: IProps) {
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
          Choose the categories that apply to you:
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
