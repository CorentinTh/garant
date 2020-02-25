import {Result} from "./types/Result";
import {Schema} from "./types/Schema";
import {ObjectContainer} from "./types/ObjectContainer";
import {CheckerGenerator} from "./types/CheckerGenerator";
import {requiredChecker} from "./checkers/Required.checker";
import {typeChecker} from "./checkers/Type.checker";
import {childrenChecker} from "./checkers/Children.checker";

export class Validator {
    private readonly schema: Schema;

    private static checkers: { [key: string]: CheckerGenerator } = {
        'required': requiredChecker,
        'children': childrenChecker,
        'type': typeChecker
    };

    constructor(schema: Schema) {
        this.schema = schema;
    }

    check(object: ObjectContainer): Result {
        return Validator.deepCheck(this.schema, object);
    }

    static deepCheck(schema: Schema, object: ObjectContainer): Result {
        const result: Result = {hasError: false, data: {}, messages: []};

        for (const field in schema) {
            if (Object.prototype.hasOwnProperty.call(schema, field)) {
                const checkerList = schema[field];
                const objectValue = object[field];

                for (const checkerName in checkerList) {
                    if (Object.prototype.hasOwnProperty.call(checkerList, checkerName)) {
                        const checkerConfig = checkerList[checkerName];

                        const checker: CheckerGenerator = this.checkers[checkerName];

                        if (!checker) {
                            throw new Error(`Invalid checker "${checkerName}". Available checkers are ${Object.keys(this.checkers).map(s => `"${s}"`).join(', ')}`);
                        }

                        const checkerResult = checker(checkerConfig)(objectValue, field, object);

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
}