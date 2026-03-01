import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { RoutesEnum } from "@/routes/routes.enum";
import { ONBOARDING_STEPS_COUNT } from "../utils/onboarding.constant";
import { useNavigate } from "react-router";

interface IProps {
  handleSubmit: () => void;
  setStep: (step: number) => void;
  step: number;
  isNextDisabled: boolean;
}

export default function Footer({ handleSubmit, setStep, step, isNextDisabled }: IProps) {
  const navigate = useNavigate();

  return (
    <DialogFooter>
      {step === 1 ? (
        <Button
          type="button"
          onClick={() => navigate(RoutesEnum.DASHBOARD)}
          variant="outline"
        >
          Skip Setup
        </Button>
      ) : (
        <Button
          type="button"
          onClick={() => setStep(step - 1)}
          variant="outline"
        >
          Previous step
        </Button>
      )}
      {step === ONBOARDING_STEPS_COUNT ? (
        <Button type="submit" onClick={() => handleSubmit()} disabled={isNextDisabled}>
          Save changes
        </Button>
      ) : (
        <Button
          type="button"
          onClick={() => setStep(step + 1)}
          variant="outline"
          disabled={isNextDisabled}
        >
          Next step
        </Button>
      )}
    </DialogFooter>
  );
}
