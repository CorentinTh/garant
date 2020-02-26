
import {requiredChecker} from "./checkers/Required.checker";
import {typeChecker} from "./checkers/Type.checker";
import {childrenChecker} from "./checkers/Children.checker";
import { Schema, CheckerGenerator, ObjectContainer, Result } from "./types";

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

        Object.entries(schema).forEach(([field, checkerList]) => {
            const objectValue = object[field];
            Object.entries(checkerList).forEach(([checkerName, checkerConfig]) => {
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
            });
        });

        return result;
    }
}