// interface SchemaCommon {
//     type: string;
//     required?: boolean;
//     description?: string;
// }
//
// interface SchemaString extends SchemaCommon {
//     type: 'string';
//     default?: string;
// }
//
// interface SchemaNumber extends SchemaCommon {
//     type: 'number';
//     default?: number;
// }
//
// interface SchemaObject extends SchemaCommon {
//     type: 'object';
//     default?: Schema;
//     children: Schema;
// }
//

type Schema = { [key: string]: { [key: string]: unknown } };

export {
    Schema
}
