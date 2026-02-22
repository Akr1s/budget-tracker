import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import React from 'react';

const languageOptions = [
    { label: 'English', value: 'english' },
    { label: 'Español', value: 'spanish' },
    { label: 'Deutsch', value: 'german' },
    { label: '日本語', value: 'japanese' },
    { label: '中文', value: 'chinese' },
];

const currency = [{ label: 'USD - US Dollar', value: 'usd' }];

export default function Welcome() {
    return (
        <div>
            <p className="leading-7">Let's set up your personal budget tracker!</p>
            <p className="leading-7">This will only take 2-3 minutes.</p>
            <p className="leading-7 mt-4">Select your language:</p>
            <Select>
                <SelectTrigger className="w-full max-w-48">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Available languages</SelectLabel>
                        {languageOptions.map((language) => (
                            <SelectItem value={language.value}>{language.label}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>

            <p className="leading-7 mt-4">Select your currency:</p>
            <Select>
                <SelectTrigger className="w-full max-w-48">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Available currencies</SelectLabel>
                        {currency.map((item) => (
                            <SelectItem value={item.value}>{item.label}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
