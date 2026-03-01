import { Input } from '@/components/ui/input';
import type { IOnboardingForm } from '../onboarding.type';
import type { FormikErrors } from 'formik';

interface IProps {
    setFieldValue: (
        field: keyof IOnboardingForm,
        value: string,
        shouldValidate?: boolean | undefined,
    ) => Promise<void> | Promise<FormikErrors<IOnboardingForm>>;
    values: IOnboardingForm;
}

export default function BudgetGoals({ setFieldValue, values }: IProps) {
    return (
        <div>
            <p className="leading-7">Set monthly spending limits for each category:</p>
            <p className="leading-7 mt-4">Monthly Income: $5,700.00</p>
            <div>
                {values.categories.map((category) => (
                    <div className="flex gap-2">
                        <p className="leading-7">{category}</p>
                        <Input
                            type="text"
                            placeholder="Type an amount"
                            value={values.startingBalance}
                            onChange={(e) => setFieldValue('startingBalance', e.target.value)}
                        />
                    </div>
                ))}
            </div>
            <p className="leading-7 mt-4">Total Budgeted: $3,350 / $5,700 </p>
            <p className="leading-7">Remaining: $2,350 (41%) for savings/other</p>
        </div>
    );
}
