import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
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
import { validationSchema } from "./utils/validation-schema.constant";
import Footer from "./component/footer.component";
import { ONBOARDING_STEPS_COUNT, STEP_FIELDS } from "./utils/onboarding.constant";

export default function Onboarding() {
  const navigate = useNavigate();
  const { values, errors, touched, setFieldValue, handleSubmit } =
    useFormik<IOnboardingForm>({
      initialValues,
      validationSchema,
      validateOnMount: true,
      onSubmit: (formValues) => {
        console.log(formValues);
        navigate(RoutesEnum.DASHBOARD);
      },
    });

  const [step, setStep] = useState(1);

  const isCurrentStepValid = STEP_FIELDS[step].every((field) => !errors[field]);

  const sharedProps = { values, errors, touched, setFieldValue };

  return (
    <Dialog open>
      <form>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Welcome to Budget Tracker</DialogTitle>
            <DialogDescription>
              (Step {step} of {ONBOARDING_STEPS_COUNT})
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
