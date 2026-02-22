import { Checkbox } from '@/components/ui/checkbox';
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from '@/components/ui/field';
import React from 'react';

const categories = [
    {
        value: 'essintial',
        label: 'ESSENTIAL',
        items: [
            { label: 'Housing (rent, mortgage, utilities)', value: 'housing' },
            { label: 'Groceries & Food', value: 'groceries' },
            { label: 'Transportation', value: 'transportation' },
            { label: 'Healthcare & Insurance', value: 'healthcare' },
        ],
    },
    {
        value: 'lifestyle',
        label: 'LIFESTYLE',
        items: [
            { label: 'Entertainment', value: 'entertainment' },
            { label: 'Shopping & Personal', value: 'shopping' },
            { label: 'Fitness & Sports', value: 'sports' },
            { label: 'Travel & Vacation', value: 'travel' },
        ],
    },
    {
        value: 'financial',
        label: 'FINANCIAL',
        items: [
            { label: 'Debt Payments', value: 'debt' },
            { label: 'Savings & Investments', value: 'savings' },
            { label: 'Education', value: 'education' },
        ],
    },
];

export default function Categories() {
    return (
        <div>
            <FieldSet>
                <FieldLegend variant="label">Choose the categories that apply to you:</FieldLegend>
                <FieldDescription>(You can add more later)</FieldDescription>
                <FieldGroup className="gap-3">
                    {categories.map((category) => (
                        <>
                            <p className="leading-7">{category.label}</p>
                            {category.items.map((item) => (
                                <Field orientation="horizontal">
                                    <Checkbox id={item.value} name={item.value} defaultChecked />
                                    <FieldLabel htmlFor={item.value} className="font-normal">
                                        {item.label}
                                    </FieldLabel>
                                </Field>
                            ))}
                        </>
                    ))}
                </FieldGroup>
            </FieldSet>
        </div>
    );
}
