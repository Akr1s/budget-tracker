import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import Welcome from "./component/welcome.component";
import { useNavigate } from "react-router";
import { RoutesEnum } from "@/routes/routes.enum";
import Categories from "./component/categories.component";
import Income from "./component/income.component";
import StartingBalance from "./component/starting-balance.component";
import Summary from "./component/summary.component";
import BudgetGoals from "./component/budget-goals.component";
import { useFormik } from "formik";
import type { IOnboardingForm } from "./onboarding.type";
import { initialValues } from "./utils/initial-values.constant";
import { createValidationSchema } from "./utils/validation-schema.constant";
import Footer from "./component/footer.component";
import {
  ONBOARDING_STEPS_COUNT,
  STEP_FIELDS,
} from "./utils/onboarding.constant";
import { formatNumber } from "@/utils/format-number.util";
import { useTranslation } from "react-i18next";
import {
  LocalStorageKeys,
  LocalStorageService,
} from "@/storage/local-storage.service";

export default function Onboarding() {
  const isSetupCompleted = LocalStorageService.checkIfItemExists(
    LocalStorageKeys.ONBOARDING_DATA,
  );

  const navigate = useNavigate();
  const { t: tOnboarding, i18n } = useTranslation("onboarding");

  const { values, errors, touched, setFieldValue, handleSubmit } =
    useFormik<IOnboardingForm>({
      initialValues,
      validationSchema: createValidationSchema(tOnboarding),
      validateOnMount: true,
      onSubmit: (formValues) => {
        LocalStorageService.setItem(
          LocalStorageKeys.ONBOARDING_DATA,
          JSON.stringify(formValues),
        );
        navigate(`/${RoutesEnum.DASHBOARD}`, { replace: true });
      },
    });

  const [step, setStep] = useState(1);

  useEffect(() => {
    if (isSetupCompleted) {
      navigate(`/${RoutesEnum.DASHBOARD}`, { replace: true });
    }
  }, []);

  const isCurrentStepValid = STEP_FIELDS[step].every((field) => !errors[field]);

  const sharedProps = { values, errors, touched, setFieldValue };

  return (
    <Dialog open>
      <form>
        <DialogContent className="sm:max-w-md" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>{tOnboarding("title")}</DialogTitle>
            <DialogDescription>
              {tOnboarding("stepIndicator", {
                current: formatNumber(step, i18n.language),
                total: formatNumber(ONBOARDING_STEPS_COUNT, i18n.language),
              })}
            </DialogDescription>
            <hr className="border-gray-300 dark:border-gray-700" />
          </DialogHeader>
          {step === 1 && <Welcome {...sharedProps} />}
          {step === 2 && <Categories {...sharedProps} />}
          {step === 3 && <Income {...sharedProps} />}
          {step === 4 && <StartingBalance {...sharedProps} />}
          {step === 5 && <BudgetGoals {...sharedProps} />}
          {step === 6 && <Summary values={values} />}
          <Footer
            handleSubmit={handleSubmit}
            setStep={setStep}
            step={step}
            isNextDisabled={!isCurrentStepValid}
          />
        </DialogContent>
      </form>
    </Dialog>
  );
}
