const expect = require('chai').expect;
const store = require('../../../src/store/store').newStore();
const MutationNames = require('../../../src/store/mutations/mutations').MutationNames;

describe(`setTaxonTitle mutation`, () => {
    it(`should set the title`, () => {
        const expectedTitle = "FOOBAR";
        store.commit(MutationNames.SetTaxonTitle, expectedTitle);
        expect(store.state.taxonTitle).to.equal(expectedTitle);
    });
});