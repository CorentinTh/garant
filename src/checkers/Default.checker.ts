import {CheckerGenerator, CheckerResult, Checker} from "../types";

export const defaultChecker: CheckerGenerator = (defaultValue: unknown): Checker => {
    return (value: unknown, field: string): CheckerResult => {
        return {
            hasError: false,
            messages: [],
            data: {[field]: value ?? defaultValue}
        };
    }
};