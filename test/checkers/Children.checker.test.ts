import {childrenChecker} from '../../src/checkers/Children.checker'
import {Result} from "../../src/types/Result";

it('should validate nested object', () => {
    const result = childrenChecker({'foo': {type: 'string'}})({foo: 'baz'}, 'bar');

    expect(result).toMatchObject({
        data: {
            'bar': {
                foo: 'baz'
            }
        },
        hasError: false,
        messages: []
    } as Result)
});


it('should not validate when missing schema', () => {
    const result = childrenChecker(undefined)({foo: 'baz'}, 'bar');

    expect(result).toMatchObject({
        data: {},
        hasError: true,
        messages: ['Missing children object for "bar".']
    } as Result)
});

it('should not validate when missing value', () => {
    const result = childrenChecker({'foo': {type: 'string'}})(undefined, 'bar');

    expect(result).toMatchObject({
        data: {},
        hasError: false,
        messages: []
    } as Result)
});