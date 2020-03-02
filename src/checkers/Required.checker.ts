import {CheckerGenerator, CheckerResult, Checker} from "../types";

export const requiredChecker: CheckerGenerator = (required: boolean): Checker => {
    return (value: unknown, field: string): CheckerResult => {
        const hasError = !value && required;

        return {
            hasError,
            messages: hasError ? [`Missing required property "${field}".`] : [],
            data: {[field]: value}
        };
    }
};