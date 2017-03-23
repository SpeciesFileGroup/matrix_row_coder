const expect = require('chai').expect;
const store = require('../src/store');

describe('test store', () => {
    it(`should do something`, () => {
        expect(true).to.be.true;
    });

    it(`should mutate the message`, () => {
        store.commit('bazMessage');
        expect(store.state.message).to.equal('baz');
    });
});