const expect = require('chai').expect;
const store = require('../../../src/store/store').newStore();
const MutationNames = require('../../../src/store/mutations/mutations').MutationNames;
const GetterNames = require('../../../src/store/getters/getters').GetterNames;
const TestHelpers = require('../../testHelpers');

describe(`SetSampleMaxFor Mutation`, () => {
    const descriptorId = 27;
    const expectedSampleMax = Math.ceil(Math.random() * 100) + 25;

    before(done => {
        TestHelpers.requestMatrixRowForStore(store)
            .then(_ => TestHelpers.requestAllObservationsForStore(store))
            .then(_ => {
                store.commit(MutationNames.SetSampleMaxFor, {
                    descriptorId,
                    max: expectedSampleMax
                });
            })
            .then(_ => done());
    });

    it(`should set sample max on the observation for the descriptor`, () => {
        expect( store.getters[GetterNames.GetSampleMaxFor](descriptorId) ).to.equal(expectedSampleMax);
    });

    it(`should mark the observation as unsaved`, () => {
        expect( store.getters[GetterNames.GetObservationsFor](descriptorId)[0].isUnsaved ).to.be.true;
    });
});