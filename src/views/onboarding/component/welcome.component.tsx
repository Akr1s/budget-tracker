import CustomSelect from '@/components/custom-select.component';
import type { IOnboardingForm } from '../onboarding.type';
import type { FormikErrors, FormikTouched } from 'formik';

const languageOptions = [
    { label: 'English', value: 'english' },
    { label: 'Español', value: 'spanish' },
    { label: 'Deutsch', value: 'german' },
    { label: '日本語', value: 'japanese' },
    { label: '中文', value: 'chinese' },
];

const currencyOptions = [{ label: 'USD - US Dollar', value: 'usd' }];

interface IProps {
    setFieldValue: (
        field: keyof IOnboardingForm,
        value: string,
        shouldValidate?: boolean | undefined,
    ) => Promise<void> | Promise<FormikErrors<IOnboardingForm>>;
    values: IOnboardingForm;
    errors: FormikErrors<IOnboardingForm>;
    touched: FormikTouched<IOnboardingForm>;
}

export default function Welcome({ setFieldValue, values, errors, touched }: IProps) {
    return (
        <div>
            <p className="leading-7">Let's set up your personal budget tracker!</p>
            <p className="leading-7">This will only take 2-3 minutes.</p>

            <p className="leading-7 mt-4">Select your language:</p>
            <CustomSelect
                label="Available languages"
                value={values.language}
                options={languageOptions}
                onValueChange={(value) => setFieldValue('language', value)}
            />
            {touched.language && errors.language && (
                <p className="text-sm text-destructive mt-1">{errors.language}</p>
            )}

            <p className="leading-7 mt-4">Select your currency:</p>
            <CustomSelect
                label="Available currencies"
                value={values.currency}
                options={currencyOptions}
                onValueChange={(value) => setFieldValue('currency', value)}
            />
            {touched.currency && errors.currency && (
                <p className="text-sm text-destructive mt-1">{errors.currency}</p>
            )}
        </div>
    );
}
