import {App} from '../src'

it('should compute sum', () => {
    expect(App.sum(1, 2)).toEqual(3);
    expect(App.sum(0, 0)).toEqual(0);
    expect(App.sum(-1, 5)).toEqual(4);
})