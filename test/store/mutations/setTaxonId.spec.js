const expect = require('chai').expect;
const MutationNames = require('../../../src/store/mutations/mutations').MutationNames;
const store = require('../../../src/store/store').newStore();

describe(`setTaxonId mutation`, () => {
    it(`should set the taxon id`, () => {
        const expectedId = 42;
        store.commit(MutationNames.SetTaxonId, expectedId);
        expect(store.state.taxonId).to.equal(expectedId);
    });
});