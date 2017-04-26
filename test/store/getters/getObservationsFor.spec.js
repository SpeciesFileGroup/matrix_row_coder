const expect = require('chai').expect;
const GetterNames = require('../../../src/store/getters/getters').GetterNames;
const TestHelpers = require('../../testHelpers');
const store = TestHelpers.newTestStore();

describe(`GetObservationsFor getter`, () => {
    before(done => {
        TestHelpers.requestMatrixRowForStore(store)
            .then(_ => TestHelpers.requestAllObservationsForStore(store))
            .then(_ => done());
    });

    it(`should return all observation from the store that belong to the given descriptor id`, () => {
        const observations = store.getters[GetterNames.GetObservationsFor](24);
        expect(observations).to.have.lengthOf(2);
    });
});