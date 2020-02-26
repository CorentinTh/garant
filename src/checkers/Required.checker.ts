import {CheckerGenerator, ValidatorResult, Checker} from "../types";

export const requiredChecker: CheckerGenerator = (required: boolean): Checker => {
    return (value: unknown, field: string): ValidatorResult => {
        const hasError = !value && required;

        return {
            hasError,
            messages: hasError ? [`Missing required property "${field}".`] : [],
            data: {[field]: value}
        };
    }
};