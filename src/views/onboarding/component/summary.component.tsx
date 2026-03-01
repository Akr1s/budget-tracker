import type { IOnboardingForm } from '../onboarding.type';

interface IProps {
    values: IOnboardingForm;
}

export default function Summary({ values }: IProps) {
    return (
        <div>
            <p className="leading-7">Here's your budget overview:</p>
            <p className="leading-7 mt-4">MONTHLY SUMMARY</p>
            <p className="leading-7">Income</p>
            <p className="leading-7">Budget</p>
            <p className="leading-7">Saving Goal: </p>
            <p className="leading-7">Categories: {values.categories.join(', ')}</p>
            <p className="leading-7 mt-4">STARTING BALANCE:</p>
            <p className="leading-7 mt-4">NEXT STEPS:</p>
            <p className="leading-7 ">Add your first transaction</p>
            <p className="leading-7 ">Set up recurring bills</p>
            <p className="leading-7 ">Explore reports and analytics</p>
        </div>
    );
}
