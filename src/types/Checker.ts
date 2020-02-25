import {Result} from "./Result";

// export type CheckerResult = {
//     hasError: true;
//     message: string;
//     value: unknown;
// } | {
//     hasError: false;
//     message?: string;
//     value: unknown;
// }



export type Checker = (value: unknown, field: string, object?: { [key: string]: unknown }) => Result
