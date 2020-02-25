import {Checker} from "../types/Checker";
import {Result} from "../types/Result";
import {CheckerGenerator} from "../types/CheckerGenerator";
import {Schema} from "../types/Schema";
import {ObjectContainer} from "../types/ObjectContainer";
import {Validator} from "../Validator";

export const childrenChecker: CheckerGenerator = (schema: Schema): Checker => {
    return (value: unknown, field: string): Result => {


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
                data: {[field]: Validator.deepCheck(schema, value as ObjectContainer).data}
            };


        }
    }
}