import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { RoutesEnum } from "@/routes/routes.enum";
import {
  defaultOnboardingData,
  ONBOARDING_STEPS_COUNT,
} from "../utils/onboarding.constant";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { saveLanguageAndCurrency } from "@/storage/app-preferences.util";
import { saveOnboardingDataToStorage } from "../utils/save-onboarding-for-storage.util";

interface IProps {
  handleSubmit: () => void;
  setStep: (step: number) => void;
  step: number;
  isNextDisabled: boolean;
}

export default function Footer({
  handleSubmit,
  setStep,
  step,
  isNextDisabled,
}: IProps) {
  const navigate = useNavigate();
  const { t: tOnboarding } = useTranslation("onboarding");

  const handleSkipSetup = () => {
    saveLanguageAndCurrency(
      defaultOnboardingData.language,
      defaultOnboardingData.currency,
    );
    saveOnboardingDataToStorage(defaultOnboardingData);
    navigate(`/${RoutesEnum.DASHBOARD}`, { replace: true });
  };

  return (
    <DialogFooter>
      {step === 1 ? (
        <Button type="button" onClick={handleSkipSetup} variant="outline">
          {tOnboarding("footer.skipSetup")}
        </Button>
      ) : (
        <Button
          type="button"
          onClick={() => setStep(step - 1)}
          variant="outline"
        >
          {tOnboarding("footer.previousStep")}
        </Button>
      )}
      {step === ONBOARDING_STEPS_COUNT ? (
        <Button
          type="submit"
          onClick={() => handleSubmit()}
          disabled={isNextDisabled}
        >
          {tOnboarding("footer.saveChanges")}
        </Button>
      ) : (
        <Button
          type="button"
          onClick={() => setStep(step + 1)}
          variant="outline"
          disabled={isNextDisabled}
        >
          {tOnboarding("footer.nextStep")}
        </Button>
      )}
    </DialogFooter>
  );
}
