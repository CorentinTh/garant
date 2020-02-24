import {Result} from "./types/Result";
import {Schema} from "./types/Schema";
import {ObjectContainer} from "./types/ObjectContainer";

export class Validator {
    private schema: Schema;

    constructor(schema: Schema) {
        this.schema = schema;
    }

    check(object: ObjectContainer): Result {

        if (!object && !this.schema) {
            return object;
        }

        return Validator.check(this.schema, object);
    }


    private static check(schema: Schema, object: ObjectContainer): Result {
        let newObject: ObjectContainer = {...object};
        const result: Result = {hasError: false, data: {}, errors: []};

        for (const param in schema) {
            if (Object.prototype.hasOwnProperty.call(schema, param)) {
                const paramConfig = schema[param];

                if (paramConfig.required && !newObject[param]) {
                    // Property is required but not set
                    this.setError(result, `Missing required property "${param}".`)
                } else if (paramConfig.required && newObject[param] && typeof newObject[param] !== paramConfig.type) {
                    // Property is required and present but doesn't have proper type
                    this.setError(result, `Property "${param}" should be "${paramConfig.type}" but received "${typeof newObject[param]}".`)
                } else if (paramConfig.type === 'object' && paramConfig.children) {
                    // Property is required and present and is an object so we check for children

                    const childrenResults = this.check(paramConfig.children, newObject[param] as ObjectContainer);

                    if (childrenResults.errors) {
                        result.errors?.push(...childrenResults.errors);
                    }

                    newObject = Object.assign(newObject, {[param]: childrenResults.data});
                } else if (!paramConfig.required && !newObject[param] && paramConfig.default) {
                    // Property is not required and not present so we put default value
                    newObject[param] = paramConfig.default as unknown as ObjectContainer;
                }
            }
        }

        result.data = newObject;
        return result;
    }

    private static setError(result: Result, message: string) {
        result.hasError = true;
        if (!result.errors) {
            result.errors = [];
        }
        result.errors.push(message);
    }

}