import {ObjectContainer} from "./ObjectContainer";

interface ResultError {
    hasError: true;
    errors: string[];
    data?: ObjectContainer;
}

interface ResultOk {
    hasError: false;
    errors?: string[];
    data: ObjectContainer;
}

type Result = ResultError | ResultOk;

export {
    Result
}
