const expect = require('chai').expect;
const store = require('../../../src/store/store').newStore();
const MutationNames = require('../../../src/store/mutations/mutations').MutationNames;
const GetterNames = require('../../../src/store/getters/getters').GetterNames;
const TestHelpers = require('../../testHelpers');

describe(`SetPresence Mutation`, () => {
    const descriptorId = 25;
    const isChecked = false;

    before(done => {
        TestHelpers.requestMatrixRowForStore(store)
            .then(_ => TestHelpers.requestAllObservationsForStore(store))
            .then(_ => {
                store.commit(MutationNames.SetPresence, {
                    descriptorId,
                    isChecked
                });
            })
            .then(_ => done());
    });

    it(`should set the checked state for the observation matching the descriptor`, () => {
        expect( store.getters[GetterNames.GetPresenceFor](descriptorId) ).to.equal(isChecked);
    });

    it(`should mark the observation as unsaved`, () => {
        expect( store.getters[GetterNames.GetObservationsFor](descriptorId)[0].isUnsaved ).to.be.true;
    });
});