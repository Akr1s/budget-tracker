import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { IOnboardingForm } from "../onboarding.type";
import type { FormikErrors, FormikTouched } from "formik";

interface IProps {
  setFieldValue: (
    field: keyof IOnboardingForm,
    value: string | number,
    shouldValidate?: boolean | undefined,
  ) => Promise<void> | Promise<FormikErrors<IOnboardingForm>>;
  values: IOnboardingForm;
  errors: FormikErrors<IOnboardingForm>;
  touched: FormikTouched<IOnboardingForm>;
}

export default function StartingBalance({
  setFieldValue,
  values,
  errors,
  touched,
}: IProps) {
  const today = new Date().toISOString().split("T")[0];

  return (
    <div>
      <p className="leading-7">What's your current account balance?</p>
      <p className="leading-7 mt-4">Starting Balance:</p>
      <Input
        type="number"
        min={0}
        placeholder="Type an amount"
        value={values.startingBalance || ''}
        onChange={(e) =>
          setFieldValue("startingBalance", parseFloat(e.target.value) || 0)
        }
      />
      {touched.startingBalance && errors.startingBalance && (
        <p className="text-sm text-destructive mt-1">
          {errors.startingBalance}
        </p>
      )}

      <p className="leading-7 mt-4">When are you starting to track?</p>
      <RadioGroup
        value={values.startingDate}
        onValueChange={(value) =>
          setFieldValue(
            "startingDate",
            value as IOnboardingForm["startingDate"],
          )
        }
        className="w-fit"
      >
        <div className="flex items-center gap-3">
          <RadioGroupItem value="today" id="r1" />
          <Label htmlFor="r1">Today ({today})</Label>
        </div>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="monthStart" id="r2" />
          <Label htmlFor="r2">Beginning of this month</Label>
        </div>
      </RadioGroup>
    </div>
  );
}
