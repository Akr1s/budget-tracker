export interface IOnboardingForm {
    categories: string[];
    currency: string;
    language: string;
    primaryIncomeSource: string;
    primarySourceMonthlyAmount: number;
    startingBalance: number;
    startingDate: 'today' | 'monthStart';
    budgetGoals: Record<string, number>;
}
