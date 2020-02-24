import {Validator} from '../src'
import objectContaining = jasmine.objectContaining;

it('should validate empty input empty schema', () => {
    const validator = new Validator({});

    expect(validator.check({})).toMatchObject({});
})

it('should validate one string property', () => {
    const validator = new Validator({
        foo: {
            type: "string",
            required: true
        }
    });

    const object = {
        foo: 'bar'
    };

    const result = validator.check(object);

    expect(result).toMatchObject({
        hasError: false,
        data: object,
        messages: []
    });
});

it('should validate complex object', () => {
    const validator = new Validator({
        foo: {
            type: "string",
            required: true
        },
        bar: {
            type: "object",
            children: {
                baz: {
                    type: "number",
                }
            }
        }
    });

    expect(validator.check({
        foo: 'bar'
    })).toMatchObject({
        hasError: false,
        data: {
            foo: 'bar'
        }
    });

    expect(validator.check({
        foo: 'bar',
        bar: {}
    })).toMatchObject({
        hasError: false,
        data: {
            foo: 'bar',
            bar: {}
        }
    });

    expect(validator.check({
        foo: 'bar',
        bar: {baz: 1}
    })).toMatchObject({
        hasError: false,
        data: {
            foo: 'bar',
            bar: {baz: 1}
        }
    });
});