import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    categories: Yup.array().of(Yup.string()),
    currency: Yup.string(),
    language: Yup.string(),
    primaryIncomeSource: Yup.string(),
    primarySourceMonthlyAmount: Yup.number(),
    startingBalance: Yup.number(),
    startingDate: Yup.string(),
});
