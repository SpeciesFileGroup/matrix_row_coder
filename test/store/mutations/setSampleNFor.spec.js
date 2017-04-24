const expect = require('chai').expect;
const store = require('../../../src/store/store').newStore();
const MutationNames = require('../../../src/store/mutations/mutations').MutationNames;
const GetterNames = require('../../../src/store/getters/getters').GetterNames;
const TestHelpers = require('../../testHelpers');

describe(`SetSampleNFor Mutation`, () => {
    before(done => {
        TestHelpers.requestMatrixRowForStore(store)
            .then(_ => TestHelpers.requestAllObservationsForStore(store))
            .then(_ => done());
    });

    it(`should set sample n on the observation for the descriptor`, () => {
        const descriptorId = 27;

        const expectedN = Math.ceil(Math.random() * 300) + 500;

        store.commit(MutationNames.SetSampleNFor, {
            descriptorId,
            n: expectedN
        });

        expect( store.getters[GetterNames.GetSampleNFor](descriptorId) ).to.equal(expectedN);
    });
});