
import {ValidatorSchema, CheckerGenerator, ValidatorObject, CheckerResult, Checker} from "../types";
import {Validator} from "../Validator";

export const childrenChecker: CheckerGenerator = (schema: ValidatorSchema): Checker => {
    return (value: unknown, field: string): CheckerResult => {

        if (!schema) {
            return {
                hasError: true,
                messages: [`Missing children object for "${field}".`],
                data: {[field]: value}
            };
        } else if (!value) {
            return {
                hasError: false, // Do not infer if required
                messages: [],
                data: {}
            };
        } else {
            return{
                hasError: false,
                messages: [],
                data: {[field]: new Validator(schema).check(value as ValidatorObject).data}
            };
        }
        
    }
}