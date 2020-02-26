import {ValidatorSchema, CheckerGenerator, ValidatorObject, ValidatorResult, Checker} from "../types";
import {Validator} from "../Validator";

export const childrenChecker: CheckerGenerator = (schema: ValidatorSchema): Checker => {
    return (value: unknown, field: string): ValidatorResult => {


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
                data: {[field]: Validator.deepCheck(schema, value as ValidatorObject).data}
            };


        }
    }
}