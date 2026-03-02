import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { RoutesEnum } from "@/routes/routes.enum";
import {
  defaultOnboardingData,
  ONBOARDING_STEPS_COUNT,
} from "../utils/onboarding.constant";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import {
  LocalStorageKeys,
  LocalStorageService,
} from "@/storage/local-storage.service";

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
  const { t } = useTranslation();

  const handleSkipSetup = () => {
    LocalStorageService.setItem(
      LocalStorageKeys.ONBOARDING_DATA,
      JSON.stringify(defaultOnboardingData),
    );
    navigate(`/${RoutesEnum.DASHBOARD}`, { replace: true });
  };

  return (
    <DialogFooter>
      {step === 1 ? (
        <Button type="button" onClick={handleSkipSetup} variant="outline">
          {t("onboarding.footer.skipSetup")}
        </Button>
      ) : (
        <Button
          type="button"
          onClick={() => setStep(step - 1)}
          variant="outline"
        >
          {t("onboarding.footer.previousStep")}
        </Button>
      )}
      {step === ONBOARDING_STEPS_COUNT ? (
        <Button
          type="submit"
          onClick={() => handleSubmit()}
          disabled={isNextDisabled}
        >
          {t("onboarding.footer.saveChanges")}
        </Button>
      ) : (
        <Button
          type="button"
          onClick={() => setStep(step + 1)}
          variant="outline"
          disabled={isNextDisabled}
        >
          {t("onboarding.footer.nextStep")}
        </Button>
      )}
    </DialogFooter>
  );
}
