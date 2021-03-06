import {requiredChecker} from "./checkers/Required.checker";
import {typeChecker} from "./checkers/Type.checker";
import {childrenChecker} from "./checkers/Children.checker";
import {defaultChecker} from "./checkers/Default.checker";

import {
    ValidatorSchema,
    CheckerGenerator,
    ValidatorObject,
    CheckerResult,
    ValidatorConfig,
    ValidatorConfigClean, ValidatorSchemaToType, ValidatorResult
} from "./types";

const checkers: { [key: string]: CheckerGenerator } = {
    'required': requiredChecker,
    'children': childrenChecker,
    'type': typeChecker,
    'default': defaultChecker
};

const defaultConfig: ValidatorConfigClean = {
    allowCustomsInSchema: false
};

export class Validator<T extends ValidatorSchema> {
    private readonly schema: ValidatorSchema;
    private config: ValidatorConfigClean;

    constructor(schema: T, config?: ValidatorConfig) {
        this.schema = schema;
        this.config = Object.assign({}, defaultConfig, config);
    }

    check(object: ValidatorObject): ValidatorResult<T> {
        return this.deepCheck(this.schema, object) as ValidatorResult<T>;
    }

    private deepCheck(schema: ValidatorSchema, object: ValidatorObject): CheckerResult {
        const result: CheckerResult = {hasError: false, data: {}, messages: []};

        Object.entries(schema).forEach(([field, checkerList]) => {
            let objectValue = object[field];
            Object.entries(checkerList).forEach(([checkerName, checkerConfig]) => {
                const checker: CheckerGenerator = checkers[checkerName];

                if (!checker) {
                    if (!this.config.allowCustomsInSchema) {
                        throw new Error(`Invalid checker "${checkerName}". Available checkers are ${Object.keys(checkers).map(s => `"${s}"`).join(', ')}`);
                    }else {
                        result.data[field] = objectValue;
                    }
                }else{
                    const checkerResult = checker(checkerConfig)(objectValue, field, object);

                    if (checkerResult.hasError) {
                        result.hasError = true;
                        result.messages.push(...checkerResult.messages)
                    } else {
                        objectValue = result.data[field] = checkerResult.data[field];
                    }
                }
            });
        });

        return result;
    }
}