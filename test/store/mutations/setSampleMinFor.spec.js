const expect = require('chai').expect;
const store = require('../../../src/store/store').newStore();
const MutationNames = require('../../../src/store/mutations/mutations').MutationNames;
const GetterNames = require('../../../src/store/getters/getters').GetterNames;
const TestHelpers = require('../../testHelpers');

describe(`SetSampleMinFor Mutation`, () => {
    before(done => {
        TestHelpers.requestMatrixRowForStore(store)
            .then(_ => TestHelpers.requestAllObservationsForStore(store))
            .then(_ => done());
    });

    it(`should set sample min on the observation for the descriptor`, () => {
        const descriptorId = 27;

        const expectedSampleMin = Math.ceil(Math.random() * 20) + 5;

        store.commit(MutationNames.SetSampleMinFor, {
            descriptorId,
            min: expectedSampleMin
        });

        expect( store.getters[GetterNames.GetSampleMinFor](descriptorId) ).to.equal(expectedSampleMin);
    });
});