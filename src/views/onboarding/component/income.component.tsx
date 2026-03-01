import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
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

const incomeOptions = [
    { label: 'Salary', value: 'salary' },
    { label: 'Freelance', value: 'freelance' },
    { label: 'Donations', value: 'donations' },
];

export default function Income({ setFieldValue, values }: IProps) {
    return (
        <div>
            <p className="leading-7">What's your monthly income?</p>
            <p className="leading-7 mt-4">Primary Income Source:</p>
            <Select
                value={values.primaryIncomeSource}
                onValueChange={(value) => setFieldValue('primaryIncomeSource', value)}
            >
                <SelectTrigger className="w-full max-w-48">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Select your primary source of income</SelectLabel>
                        {incomeOptions.map((language) => (
                            <SelectItem value={language.value}>{language.label}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>

            <p className="leading-7 mt-4">Monthly Amount:</p>
            <Input
                type="text"
                placeholder="Type an amount"
                value={values.primarySourceMonthlyAmount}
                onChange={(e) => setFieldValue('primarySourceMonthlyAmount', e.target.value)}
            />
        </div>
    );
}
