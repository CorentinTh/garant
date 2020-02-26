import {CheckerGenerator, ValidatorResult, Checker} from "../types";

export const defaultChecker: CheckerGenerator = (defaultValue: unknown): Checker => {
    return (value: unknown, field: string): ValidatorResult => {
        return {
            hasError: false,
            messages: [],
            data: {[field]: value ?? defaultValue}
        };
    }
};