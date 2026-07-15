/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../select";

interface YearOptionProps {
    currentYear: number;
    setThisYear: (year: any) => void;
    className?: string;
}

interface YearOption {
    value: string;
    label: string;
}

const YearOption: React.FC<YearOptionProps> = ({
    currentYear,
    setThisYear,
    className = "",
}) => {
    const [yearOptions, setYearOptions] = useState<YearOption[]>([]);
    const defaultYear = currentYear.toString();

    useEffect(() => {
        const startYear = 2026;
        const yearRange: YearOption[] = [];

        // Add the years to the list
        for (let i = startYear; i <= currentYear; i++) {
            yearRange.push({ value: i.toString(), label: i.toString() });
        }

        setYearOptions(yearRange);
    }, [currentYear]);

    return (
        <Select defaultValue={defaultYear} onValueChange={setThisYear}>
            <SelectTrigger
                className={cn(
                    "w-24 bg-secondary-color text-white border-secondary-color hover:bg-secondary-color/90 focus:ring-secondary-color",
                    className
                )}
            >
                <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent className="bg-white border-border">
                {yearOptions.map((option) => (
                    <SelectItem
                        key={option.value}
                        value={option.value}
                        className="focus:bg-secondary-color focus:text-white"
                    >
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default YearOption;
