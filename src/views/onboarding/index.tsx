import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { useState } from 'react';
import Welcome from './component/welcome.component';
import { useNavigate } from 'react-router';
import { RoutesEnum } from '@/routes/routes.enum';
import Categories from './component/categories.component';

const STEPS_COUNT = 6;

export default function Onboarding() {
    const navigate = useNavigate();

    const [step, setStep] = useState(1);

    const handleSkip = () => {
        navigate(RoutesEnum.DASHBOARD);
    };

    return (
        <Dialog open>
            <form>
                <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Welcome to Budget Tracker</DialogTitle>
                        <DialogDescription>
                            (Step {step} of {STEPS_COUNT})
                        </DialogDescription>
                    </DialogHeader>
                    {step === 1 && <Welcome />}
                    {step === 2 && <Categories />}
                    <DialogFooter>
                        {step === 1 ? (
                            <Button onClick={handleSkip} variant="outline">
                                Skip Setup
                            </Button>
                        ) : (
                            <Button onClick={() => setStep(step - 1)} variant="outline">
                                Previous step
                            </Button>
                        )}
                        {step === STEPS_COUNT ? (
                            <Button type="submit">Save changes</Button>
                        ) : (
                            <Button onClick={() => setStep(step + 1)} variant="outline">
                                Next step
                            </Button>
                        )}
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}
