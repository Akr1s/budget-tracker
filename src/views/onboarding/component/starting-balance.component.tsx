import CustomRadioGroup from "@/components/custom-radiogroup.component";
import CurrencyInput from "@/components/currency-input.component";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import type { IOnboardingForm } from "../onboarding.type";
import type { FormikErrors, FormikTouched } from "formik";
import { useTranslation } from "react-i18next";
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

  const startingBalanceOptions = [
    {
      value: TODAY,
      label: t("onboarding.startingBalance.today", {
        date: DateService.toDisplayDate(
          STARTING_DATE_MAP[TODAY],
          values.language,
        ),
      }),
    },
    {
      value: CURRENT_MONTH_START,
      label: t("onboarding.startingBalance.currentMonthStart", {
        date: DateService.toDisplayDate(
          STARTING_DATE_MAP[CURRENT_MONTH_START],
          values.language,
        ),
      }),
    },
    {
      value: NEXT_MONTH_START,
      label: t("onboarding.startingBalance.nextMonthStart", {
        date: DateService.toDisplayDate(
          STARTING_DATE_MAP[NEXT_MONTH_START],
          values.language,
        ),
      }),
    },
  ];

  const handleOptionChange = (value: StartingDateEnum) => {
    setSelectedOption(value);
    setFieldValue("startingDate", STARTING_DATE_MAP[value]);
  };

  return (
    <div>
      <p className="leading-7">{t("onboarding.startingBalance.heading")}</p>

      <FieldGroup className="mt-4">
        <Field>
          <FieldLabel>{t("onboarding.startingBalance.balanceLabel")}</FieldLabel>
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
            <FieldError>{errors.startingBalance}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel>{t("onboarding.startingBalance.trackingLabel")}</FieldLabel>
          <CustomRadioGroup
            className="w-fit"
            value={selectedOption}
            onValueChange={(value) => handleOptionChange(value as StartingDateEnum)}
            items={startingBalanceOptions}
          />
        </Field>
      </FieldGroup>
    </div>
  );
}
