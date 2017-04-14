const expect = require('chai').expect;
const GetterNames = require('../../../src/store/getters/getters').GetterNames;
const store = require('../../../src/store/store').newStore();
const TestHelpers = require('../../testHelpers');

describe(`GetObservationsForDescriptorId getter`, () => {
    before(done => {
        TestHelpers.requestMatrixRowForStore(store)
            .then(_ => TestHelpers.requestAllObservationsForStore(store))
            .then(_ => done());
    });

    it(`should return all observation from the store that belong to the given descriptor id`, () => {
        const observations = store.getters[GetterNames.GetObservationsFor](24);
        expect(observations).to.have.lengthOf(1);
        expect(observations[0].id).to.equal(1001);
    });
});