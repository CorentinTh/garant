import {Validator} from '../src'

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


it('should throw for incorrect checker name in schema', () => {
    const validator = new Validator({
        foo: {
            mldsfjksdf: "string"
        }
    });

    expect(() => {
        validator.check({})
    }).toThrow();
});


it('should not throw for incorrect checker name in schema', () => {
    const validator = new Validator({
        foo: {
            mldsfjksdf: "string"
        }
    }, {allowCustomsInSchema: true});

    expect(() => {
        validator.check({})
    }).not.toThrow();
});


it('should not validate incorrect object', () => {
    const validator = new Validator({
        foo: {
            type: "string",
            required: true
        }
    });

    const object = {
        foo: 1
    };

    const result = validator.check(object);

    expect(result).toMatchObject({
        hasError: true,
        data: object,
        messages: ['Property "foo" should be "string" but received "number".']
    });
});


it('should set default value for missing object', () => {
    const validator = new Validator({
        foo: {
            type: "string",
            default: 'bar'
        }
    });

    const result = validator.check({});

    expect(result).toMatchObject({
        hasError: false,
        data: {foo: 'bar'},
        messages: []
    });
});


it('should set default value for missing nested object', () => {
    const validator = new Validator({
        foo: {
            type: "object",
            default: {},
            children: {
                bar: {type: 'string', default: 'baz'}
            }
        }
    });

    const result = validator.check({});

    expect(result).toMatchObject({
        hasError: false,
        data: {foo: {bar: 'baz'}},
        messages: []
    });
});

