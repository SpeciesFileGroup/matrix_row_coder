const expect = require('chai').expect;
const store = require('../../src/store/store').newStore();

describe('store', () => {
    it(`should initialize with an empty state`, () => {
        const expectedEmptyState = {
            taxonTitle: '',
            taxonId: null,
            descriptors: [],
            observations: [],
            confidenceLevels: []
        };

        expect(store.state).to.deep.equal(expectedEmptyState);
    });
});