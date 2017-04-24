const expect = require('chai').expect;
const store = require('../../../src/store/store').newStore();
const MutationNames = require('../../../src/store/mutations/mutations').MutationNames;
const GetterNames = require('../../../src/store/getters/getters').GetterNames;
const TestHelpers = require('../../testHelpers');

describe(`SetSampleUnitFor Mutation`, () => {
    const descriptorId = 27;
    const expectedUnits = "cm";

    before(done => {
        TestHelpers.requestMatrixRowForStore(store)
            .then(_ => TestHelpers.requestAllObservationsForStore(store))
            .then(_ => {
                store.commit(MutationNames.SetSampleUnitFor, {
                    descriptorId,
                    units: expectedUnits
                });
            })
            .then(_ => done());
    });

    it(`should set sample n on the observation for the descriptor`, () => {
        expect( store.getters[GetterNames.GetSampleUnitFor](descriptorId) ).to.equal(expectedUnits);
    });

    it(`should mark the observation as unsaved`, () => {
        expect( store.getters[GetterNames.GetObservationsFor](descriptorId)[0].isUnsaved ).to.be.true;
    });
});