const expect = require('chai').expect;
const store = require('../../../src/store/store').newStore();
const MutationNames = require('../../../src/store/mutations/mutations').MutationNames;
const GetterNames = require('../../../src/store/getters/getters').GetterNames;
const TestHelpers = require('../../testHelpers');

describe(`SetSampleNFor Mutation`, () => {
    const descriptorId = 27;
    const expectedN = Math.ceil(Math.random() * 300) + 500;

    before(done => {
        TestHelpers.requestMatrixRowForStore(store)
            .then(_ => TestHelpers.requestAllObservationsForStore(store))
            .then(_ => {
                store.commit(MutationNames.SetSampleNFor, {
                    descriptorId,
                    n: expectedN
                });
            })
            .then(_ => done());
    });

    it(`should set sample n on the observation for the descriptor`, () => {
        expect( store.getters[GetterNames.GetSampleNFor](descriptorId) ).to.equal(expectedN);
    });

    it(`should mark the observation as unsaved`, () => {
        expect(store.getters[GetterNames.GetObservationsFor](descriptorId)[0].isUnsaved).to.be.true;
    });
});