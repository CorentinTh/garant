import {defaultChecker} from '../../src/checkers/Default.checker'
import {ValidatorResult} from "../../src/types";

it('should not set default when value is set', () => {

    const result = defaultChecker('foo')('bar', 'baz');

    expect(result).toMatchObject({
        data: {
            'baz': 'bar'
        },
        hasError: false,
        messages: []
    } as ValidatorResult)
});

it('should set default when value is not set', () => {

    const result = defaultChecker('foo')(undefined, 'baz');

    expect(result).toMatchObject({
        data: {
            'baz': 'foo'
        },
        hasError: false,
        messages: []
    } as ValidatorResult)
});

