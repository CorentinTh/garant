import {typeChecker} from '../../src/checkers/Type.checker'
import {CheckerResult} from "../../src/types";

it('should validate type for string with string value', () => {

    const result = typeChecker('string')('foo', 'bar');

    expect(result).toMatchObject({
        data: {
            'bar': 'foo'
        },
        hasError: false,
        messages: []
    } as CheckerResult)
});

it('should validate type for string with undefined value', () => {
    const result = typeChecker('string')(undefined, 'bar');

    expect(result).toMatchObject({
        data: {},
        hasError: false,
        messages: []
    } as CheckerResult)
});

it('should validate for array with array value', () => {
    const result = typeChecker('array')(['yo'], 'bar');

    expect(result).toMatchObject({
        data: {
            'bar': ['yo']
        },
        hasError: false,
        messages: []
    } as CheckerResult)
});

it('should not validate type for string with number value', () => {

    const result = typeChecker('string')(1, 'bar');

    expect(result).toMatchObject({
        data: {},
        hasError: true,
        messages: ['Property "bar" should be "string" but received "number".']
    } as CheckerResult)
});