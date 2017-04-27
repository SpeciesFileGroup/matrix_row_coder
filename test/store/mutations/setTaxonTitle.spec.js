const expect = require('chai').expect;
const TestHelpers = require('../../testHelpers');
const store = TestHelpers.newTestStore();
const MutationNames = require('../../../src/store/mutations/mutations').MutationNames;

describe(`setTaxonTitle mutation`, () => {
    it(`should set the title`, () => {
        const expectedTitle = "FOOBAR";
        store.commit(MutationNames.SetTaxonTitle, expectedTitle);
        expect(store.state.taxonTitle).to.equal(expectedTitle);
    });
});