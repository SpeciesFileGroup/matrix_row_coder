const expect = require('chai').expect;
const MutationNames = require('../../../src/store/mutations/mutations').MutationNames;
const store = require('../../../src/store/store').newStore();
const TestHelpers = require('../../testHelpers');

describe(`SetContinuousValue Mutation`, () => {
    before(done => {
        TestHelpers.requestMatrixRowForStore(store)
            .then(_ => TestHelpers.requestAllObservationsForStore(store))
            .then(_ => done());
    });

    it(`should set the continuous value for the given descriptor`, () => {
        const descriptorId = 26;
        const expectedContinuousValue = Math.ceil(Math.random() * 1000) + 5;

        store.commit(MutationNames.SetContinuousValue, {
            descriptorId,
            continuousValue: expectedContinuousValue
        });

        expect(store.state.observations.find(o => o.descriptorId === descriptorId).continuousValue).to.equal(expectedContinuousValue);
    });
});