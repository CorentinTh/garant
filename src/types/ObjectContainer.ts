export interface ObjectContainer {
    [key: string]: string | number | ObjectContainer | undefined;
}