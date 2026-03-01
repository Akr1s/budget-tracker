import { Input } from '@/components/ui/input';
import CustomSelect from '@/components/custom-select.component';
import type { IOnboardingForm } from '../onboarding.type';
import type { FormikErrors, FormikTouched } from 'formik';

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

const incomeOptions = [
    { label: 'Salary', value: 'salary' },
    { label: 'Freelance', value: 'freelance' },
    { label: 'Donations', value: 'donations' },
];

export default function Income({ setFieldValue, values, errors, touched }: IProps) {
    return (
        <div>
            <p className="leading-7">What's your monthly income?</p>
            <p className="leading-7 mt-4">Primary Income Source:</p>
            <CustomSelect
                label="Select your primary source of income"
                value={values.primaryIncomeSource}
                options={incomeOptions}
                onValueChange={(value) => setFieldValue('primaryIncomeSource', value)}
            />
            {touched.primaryIncomeSource && errors.primaryIncomeSource && (
                <p className="text-sm text-destructive mt-1">{errors.primaryIncomeSource}</p>
            )}

            <p className="leading-7 mt-4">Monthly Amount:</p>
            <Input
                type="number"
                min={0}
                placeholder="Type an amount"
                value={values.primarySourceMonthlyAmount || ''}
                onChange={(e) =>
                    setFieldValue('primarySourceMonthlyAmount', parseFloat(e.target.value) || 0)
                }
            />
            {touched.primarySourceMonthlyAmount && errors.primarySourceMonthlyAmount && (
                <p className="text-sm text-destructive mt-1">{errors.primarySourceMonthlyAmount}</p>
            )}
        </div>
    );
}
