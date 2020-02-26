type Result = {
    hasError: boolean;
    messages: string[];
    data: {
        [key: string]: unknown;
    };
};

type ObjectContainer = {
    [key: string]: unknown;
}

type Checker = (value: unknown, field: string, object?: { [key: string]: unknown }) => Result;

type CheckerGenerator = (config: any) => Checker;

type Schema = { [key: string]: { [key: string]: unknown } };

export {
    Result,
    Checker,
    CheckerGenerator,
    Schema,
    ObjectContainer
}