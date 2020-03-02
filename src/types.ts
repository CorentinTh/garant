interface ValidatorSchemaItemBase {
    required?: boolean;
    [key: string]: unknown;
}

interface ValidatorSchemaItemString extends ValidatorSchemaItemBase {
    type: 'string';
    default?: string;
}

interface ValidatorSchemaItemNumber extends ValidatorSchemaItemBase {
    type: 'number';
    default?: number;
}

interface ValidatorSchemaItemObject extends ValidatorSchemaItemBase {
    type: 'object';
    default?: {};
    children?: ValidatorSchema;
}


type ValidatorSchemaItem = ValidatorSchemaItemString | ValidatorSchemaItemNumber | ValidatorSchemaItemObject;

type ValidatorSchema = { [key: string]: ValidatorSchemaItem };

type SchemaItemToType<T extends ValidatorSchemaItem> =
    T extends ValidatorSchemaItemString ? string :
        T extends ValidatorSchemaItemNumber ? number :
            T extends ValidatorSchemaItemObject ? SchemaObjectChildrenToType<T["children"]> : never


type ValidatorSchemaToType<T extends ValidatorSchema> = { [P in keyof T]: SchemaItemToType<T[P]> };

type SchemaObjectChildrenToType<T extends ValidatorSchema | undefined> = T extends ValidatorSchema ? ValidatorSchemaToType<T> : {};

type ValidatorResult<T extends ValidatorSchema> = {
    hasError: boolean;
    messages: string[];
    data: ValidatorSchemaToType<T>;
}

type CheckerResult = {
    hasError: boolean;
    messages: string[];
    data: {
        [key: string]: unknown;
    };
};

type ValidatorObject = {
    [key: string]: unknown;
}

type Checker = (value: unknown, field: string, object?: { [key: string]: unknown }) => CheckerResult;

type CheckerGenerator = (config: any) => Checker;

type ValidatorConfig = {
    allowCustomsInSchema: boolean;
};

type DeepRequired<T> = {
    [P in keyof Required<T>]: T[P] extends object ? DeepRequired<T[P]> : NonNullable<Required<T[P]>>
}

type ValidatorConfigClean = DeepRequired<ValidatorConfig>;

export {
    CheckerResult,
    Checker,
    CheckerGenerator,
    ValidatorObject,
    ValidatorConfig,
    ValidatorConfigClean,
    ValidatorSchema,
    ValidatorSchemaToType,
    ValidatorResult
}