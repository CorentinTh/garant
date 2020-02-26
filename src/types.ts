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

export {
    ValidatorResult,
    Checker,
    CheckerGenerator,
    ValidatorSchema,
    ValidatorObject
}