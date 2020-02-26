import {CheckerGenerator, ValidatorResult, Checker} from "../types";

export const typeChecker: CheckerGenerator = (type: 'string' | 'object' | 'number' | 'array'): Checker => {
    return (value: unknown, field: string): ValidatorResult => {
        const currentType = Array.isArray(value) ? 'array' : typeof value;
        const hasError = currentType !== 'undefined' && currentType !== type;

        return {
            hasError,
            messages: hasError ? [`Property "${field}" should be "${type}" but received "${currentType}".`] : [],
            data: currentType === 'undefined' ? {} : {[field]: value}
        };
    }
}