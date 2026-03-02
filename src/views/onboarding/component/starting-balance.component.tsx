import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { IOnboardingForm } from "../onboarding.type";
import type { FormikErrors, FormikTouched } from "formik";
import { useTranslation } from "react-i18next";
import CurrencyInput from "@/components/currency-input.component";
import { StartingDateEnum } from "../utils/onboarding.enum";
import { DateService } from "@/utils/date.service";
import { useState } from "react";

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

const STARTING_DATE_MAP: Record<StartingDateEnum, string> = {
  [StartingDateEnum.TODAY]: DateService.getToday(),
  [StartingDateEnum.CURRENT_MONTH_START]: DateService.getCurrentMonthStart(),
  [StartingDateEnum.NEXT_MONTH_START]: DateService.getNextMonthStart(),
};

const { TODAY, CURRENT_MONTH_START, NEXT_MONTH_START } = StartingDateEnum;

export default function StartingBalance({
  setFieldValue,
  values,
  errors,
  touched,
}: IProps) {
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState<StartingDateEnum>(
    StartingDateEnum.TODAY,
  );

  const handleOptionChange = (value: StartingDateEnum) => {
    setSelectedOption(value);
    setFieldValue("startingDate", STARTING_DATE_MAP[value]);
  };

  return (
    <div>
      <p className="leading-7">{t("onboarding.startingBalance.heading")}</p>
      <p className="leading-7 mt-4">
        {t("onboarding.startingBalance.balanceLabel")}
      </p>
      <CurrencyInput
        currency={values.currency}
        type="number"
        min={0}
        placeholder={t("onboarding.startingBalance.amountPlaceholder")}
        value={values.startingBalance || ""}
        onChange={(e) =>
          setFieldValue("startingBalance", parseFloat(e.target.value) || 0)
        }
      />
      {touched.startingBalance && errors.startingBalance && (
        <p className="text-sm text-destructive mt-1">
          {errors.startingBalance}
        </p>
      )}

      <p className="leading-7 mt-4">
        {t("onboarding.startingBalance.trackingLabel")}
      </p>
      <RadioGroup
        value={selectedOption}
        onValueChange={(value) => handleOptionChange(value as StartingDateEnum)}
        className="w-fit"
      >
        <div className="flex items-center gap-3">
          <RadioGroupItem value={TODAY} id="r1" />
          <Label htmlFor="r1">
            {t("onboarding.startingBalance.today", {
              date: DateService.toDisplayDate(STARTING_DATE_MAP[TODAY], values.language),
            })}
          </Label>
        </div>
        <div className="flex items-center gap-3">
          <RadioGroupItem value={CURRENT_MONTH_START} id="r2" />
          <Label htmlFor="r2">
            {t("onboarding.startingBalance.currentMonthStart", {
              date: DateService.toDisplayDate(STARTING_DATE_MAP[CURRENT_MONTH_START], values.language),
            })}
          </Label>
        </div>
        <div className="flex items-center gap-3">
          <RadioGroupItem value={NEXT_MONTH_START} id="r3" />
          <Label htmlFor="r3">
            {t("onboarding.startingBalance.nextMonthStart", {
              date: DateService.toDisplayDate(STARTING_DATE_MAP[NEXT_MONTH_START], values.language),
            })}
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}
