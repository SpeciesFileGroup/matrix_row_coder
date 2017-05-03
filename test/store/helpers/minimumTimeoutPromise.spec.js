const expect = require('chai').expect;
const minimumTimeoutPromise = require('../../../src/store/helpers/minimumTimeoutPromise');

describe(`minimumTimeoutPromise function`, () => {
    it(`should return a promise`, () => {
        expect(minimumTimeoutPromise()).to.be.a('promise');
    });

    it(`should eventually return the same data that was given`, () => {
        const data = { data: 'data' };
        const promiseWithData = Promise.resolve(data);

        return minimumTimeoutPromise(promiseWithData)
            .then(resolvedData => expect(resolvedData).to.equal(data));
    });
});