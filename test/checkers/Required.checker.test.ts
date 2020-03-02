import {requiredChecker} from '../../src/checkers/Required.checker'
import {CheckerResult} from "../../src/types";

it('should validate for required input when it is present', () => {
    const result = requiredChecker(true)('foo', 'bar');

    expect(result).toMatchObject({
        data: {
            'bar': 'foo'
        },
        hasError: false,
        messages: []
    } as CheckerResult)
});

it('should not validate for required input when it is not present', () => {
    const result = requiredChecker(true)(undefined, 'bar');

    expect(result).toMatchObject({
        data: {},
        hasError: true,
        messages: ['Missing required property "bar".']
    } as CheckerResult)
});