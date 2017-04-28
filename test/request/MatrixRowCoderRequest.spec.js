const expect = require('chai').expect;
const MatrixRowCoderRequest = require('../../src/request/MatrixRowCoderRequest');

describe(`MatrixRowCoderRequest class`, () => {
    it(`should be able to set api details`, () => {
        const expectedApiBase = '//foo.com/';
        const expectedApiParams = {
            foo: 'bar'
        };

        const r = new MatrixRowCoderRequest();
        r.setApi({
            apiBase: expectedApiBase,
            apiParams: expectedApiParams
        });

        expect(r.apiBase).to.equal(expectedApiBase);
        expect(r.apiParams).to.equal(expectedApiParams);
    });

    describe(`stringifying api parameters`, () => {
        it(`should make a string of params for the given object`, () => {
            const object = {
                foo: 'bar'
            };

            const actual = MatrixRowCoderRequest.stringifyApiParams(object);
            const expected = '?foo=bar';
            expect(actual).to.equal(expected);
        });

        it(`should handle multiple params`, () => {
            const object = {
                foo: 'bar',
                baz: 'quux'
            };

            const actual = MatrixRowCoderRequest.stringifyApiParams(object);
            const expected = '?foo=bar&baz=quux';
            expect(actual).to.equal(expected);
        });

        it(`should return an empty string for an empty object`, () => {
            const object = {};

            const actual = MatrixRowCoderRequest.stringifyApiParams(object);
            const expected = '';
            expect(actual).to.equal(expected);
        });
    });

    describe(`building the endpoint urls`, () => {
        const base = Math.random().toString(36);
        const params = {
            foo: 'bar'
        };
        const request = new MatrixRowCoderRequest();
        request.setApi({
            apiBase: base,
            apiParams: params
        });

        it(`should prepend the api base and api params`, () => {
            const actual = request.buildUrl('/matrices/1/row.json');
            expect(actual).to.equal(`${base}/matrices/1/row.json?foo=bar`);
        });

        it(`should accept additional params to the global ones`, () => {
            const actual = request.buildUrl('/matrices/2/row.json', { baz: 'quux' });
            expect(actual).to.equal(`${base}/matrices/2/row.json?foo=bar&baz=quux`);
        });
    });
});