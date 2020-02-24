import {Result} from "./types/Result";
import {Schema} from "./types/Schema";
import {ObjectContainer} from "./types/ObjectContainer";
import {Checker} from "./types/Checker";


export class Validator {
    private schema: Schema;

    constructor(schema: Schema) {
        this.schema = schema;
    }

    check(object: ObjectContainer): Result {
        return Validator.check(this.schema, object);
    }

    private static typeChecker(type: 'string' | 'object' | 'number' | 'array'): Checker {
        return (value: unknown, field: string): Result => {
            const currentType = Array.isArray(value) ? 'array' : typeof value;
            const hasError = currentType !== type;

            return {
                hasError,
                messages: hasError ? [`Property "${field}" should be "${type}" but received "${currentType}".`] : [],
                data: {[field]: value}
            };
        }
    }

    private static requiredChecker(required: boolean): Checker {
        return (value: unknown, field: string): Result => {
            const hasError = !value && required;

            return {
                hasError,
                messages: hasError ? [`Missing required property "${field}".`] : [],
                data: {[field]: value}
            };
        }
    }

    private static childrenChecker(schema: Schema): Checker {
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
                    data: {[field]: value}
                };
            } else {
                return this.check(schema, value as ObjectContainer);
            }
        }
    }

    private static check(schema: Schema, object: ObjectContainer): Result {
        const result: Result = {hasError: false, data: {}, messages: []};

        for (const field in schema) {
            if (Object.prototype.hasOwnProperty.call(schema, field)) {
                const checkerList = schema[field];
                const objectValue = object[field];

                for (const checkerName in checkerList) {
                    if (Object.prototype.hasOwnProperty.call(checkerList, checkerName)) {
                        const checkerConfig = checkerList[checkerName];

                        let checker: Checker;

                        switch (checkerName) {
                            case 'type':
                                checker = this.typeChecker(checkerConfig as 'string' | 'object' | 'number' | 'array');
                                break;
                            case 'required':
                                checker = this.requiredChecker(checkerConfig as boolean);
                                break;
                            case 'children':
                                checker = this.childrenChecker(checkerConfig as Schema);
                                break;
                            default:
                                throw new Error(`Invalid checker "${checkerName}".`)
                        }

                        const checkerResult = checker(objectValue, field, object);

                        if (checkerResult.hasError) {
                            result.hasError = true;
                            result.messages.push(...checkerResult.messages)
                        } else {
                            result.data[field] = checkerResult.data[field];
                        }

                    }
                }
            }
        }

        return result;
    }


    // private static check(schema: Schema, object: ObjectContainer): Result {
    //     let newObject: ObjectContainer = {...object};
    //     const result: Result = {hasError: false, data: {}, errors: []};
    //
    //     for (const param in schema) {
    //         if (Object.prototype.hasOwnProperty.call(schema, param)) {
    //             const paramConfig = schema[param];
    //
    //             if (paramConfig.required && !newObject[param]) {
    //                 // Poperty is required but not set
    //                 this.setError(result, `Missing required property "${param}".`)
    //             } else if (paramConfig.required && newObject[param] && typeof newObject[param] !== paramConfig.type) {
    //                 // Property is required and present but doesn't have proper type
    //                 this.setError(result, `Property "${param}" should be "${paramConfig.type}" but received "${typeof newObject[param]}".`)
    //             } else if (paramConfig.type === 'object' && paramConfig.children) {
    //                 // Property is required and present and is an object so we check for children
    //
    //                 const childrenResults = this.check(paramConfig.children, newObject[param] as ObjectContainer);
    //
    //                 if (childrenResults.errors) {
    //                     result.errors?.push(...childrenResults.errors);
    //                 }
    //
    //                 newObject = Object.assign(newObject, {[param]: childrenResults.data});
    //             } else if (!paramConfig.required && !newObject[param] && paramConfig.default) {
    //                 // Property is not required and not present so we put default value
    //                 newObject[param] = paramConfig.default as unknown as ObjectContainer;
    //             }
    //         }
    //     }
    //
    //     result.data = newObject;
    //     return result;
    // }
    //
    // private static setError(result: Result, message: string) {
    //     result.hasError = true;
    //     if (!result.errors) {
    //         result.errors = [];
    //     }
    //     result.errors.push(message);
    // }

}