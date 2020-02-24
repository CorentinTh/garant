import {ObjectContainer} from "./ObjectContainer";

// interface ResultError {
//     hasError: true;
//     errors: string[];
//     data?: ObjectContainer;
// }
//
// interface ResultOk {
//     hasError: false;
//     errors?: string[];
//     data: ObjectContainer;
// }

type Result = {
    hasError: boolean;
    messages: string[];
    data: {
        [key: string]: unknown;
    };
};

export {
    Result
}
