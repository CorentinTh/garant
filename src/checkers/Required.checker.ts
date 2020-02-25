import {Checker} from "../types/Checker";
import {Result} from "../types/Result";
import {CheckerGenerator} from "../types/CheckerGenerator";

export const requiredChecker: CheckerGenerator = (required: boolean): Checker => {
    return (value: unknown, field: string): Result => {
        const hasError = !value && required;

        return {
            hasError,
            messages: hasError ? [`Missing required property "${field}".`] : [],
            data: {[field]: value}
        };
    }
};