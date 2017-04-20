const expect = require('chai').expect;
const store = require('../../../src/store/store').newStore();
const MutationNames = require('../../../src/store/mutations/mutations').MutationNames;
const GetterNames = require('../../../src/store/getters/getters').GetterNames;
const TestHelpers = require('../../testHelpers');

describe(`SetPresence Mutation`, () => {
    before(done => {
        TestHelpers.requestMatrixRowForStore(store)
            .then(_ => TestHelpers.requestAllObservationsForStore(store))
            .then(_ => done());
    });

    it(`should set the checked state for the observation matching the descriptor`, () => {
        const descriptorId = 25;

        const isChecked = false;

        store.commit(MutationNames.SetPresence, {
            descriptorId,
            isChecked
        });

        expect( store.getters[GetterNames.GetPresenceFor](descriptorId) ).to.equal(isChecked);
    });
});