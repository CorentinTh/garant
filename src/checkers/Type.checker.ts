import {Checker} from "../types/Checker";
import {Result} from "../types/Result";
import {CheckerGenerator} from "../types/CheckerGenerator";

export const typeChecker: CheckerGenerator = (type: 'string' | 'object' | 'number' | 'array'): Checker => {
    return (value: unknown, field: string): Result => {
        const currentType = Array.isArray(value) ? 'array' : typeof value;
        const hasError = currentType !== 'undefined' && currentType !== type;

        return {
            hasError,
            messages: hasError ? [`Property "${field}" should be "${type}" but received "${currentType}".`] : [],
            data: currentType === 'undefined' ? {} : {[field]: value}
        };
    }
}