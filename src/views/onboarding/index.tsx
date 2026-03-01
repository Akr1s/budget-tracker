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
import Income from './component/income.component';
import StartingBalance from './component/starting-balance.component';
import Summary from './component/summary.component';
import BudgetGoals from './component/budget-goals.component';
import { useFormik } from 'formik';
import type { IOnboardingForm } from './onboarding.type';
import { initialValues } from './utils/initial-values.constant';
import { validationSchema } from './utils/validation-schema.constant';

const STEPS_COUNT = 6;

export default function Onboarding() {
    const navigate = useNavigate();
    const { values, setFieldValue } = useFormik<IOnboardingForm>({
        initialValues,
        validationSchema,
        onSubmit: console.log,
    });

    const [step, setStep] = useState(1);

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
                    {step === 1 && <Welcome setFieldValue={setFieldValue} values={values} />}
                    {step === 2 && <Categories setFieldValue={setFieldValue} values={values} />}
                    {step === 3 && <Income setFieldValue={setFieldValue} values={values} />}
                    {step === 4 && (
                        <StartingBalance setFieldValue={setFieldValue} values={values} />
                    )}
                    {step === 5 && <BudgetGoals setFieldValue={setFieldValue} values={values} />}
                    {step === 6 && <Summary values={values} />}
                    <DialogFooter>
                        {step === 1 ? (
                            <Button
                                onClick={() => navigate(RoutesEnum.DASHBOARD)}
                                variant="outline"
                            >
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
