type ValidatorResult = {
    hasError: boolean;
    messages: string[];
    data: {
        [key: string]: unknown;
    };
};

type ValidatorObject = {
    [key: string]: unknown;
}

type Checker = (value: unknown, field: string, object?: { [key: string]: unknown }) => ValidatorResult;

type CheckerGenerator = (config: any) => Checker;

type ValidatorSchema = { [key: string]: { [key: string]: unknown } };

type ValidatorConfig = {
    allowCustomsInSchema: boolean;
};

type DeepRequired<T> = {
    [P in keyof Required<T>]: T[P] extends object ? DeepRequired<T[P]> : NonNullable<Required<T[P]>>
}

type ValidatorConfigClean = DeepRequired<ValidatorConfig>;

export {
    ValidatorResult,
    Checker,
    CheckerGenerator,
    ValidatorSchema,
    ValidatorObject,
    ValidatorConfig,
    ValidatorConfigClean
}