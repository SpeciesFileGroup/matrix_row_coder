const expect = require('chai').expect;
const MutationNames = require('../../../src/store/mutations/mutations').MutationNames;
const store = require('../../../src/store/store').newStore();
const TestHelpers = require('../../testHelpers');

describe(`SetContinuousUnit Mutation`, () => {
    before(done => {
        TestHelpers.requestMatrixRowForStore(store)
            .then(_ => TestHelpers.requestAllObservationsForStore(store))
            .then(_ => done());
    });

    it(`should set the continuous unit for the given descriptor`, () => {
        const descriptorId = 26;
        const expectedContinuousUnit = `cm`;

        store.commit(MutationNames.SetContinuousUnit, {
            descriptorId,
            continuousUnit: expectedContinuousUnit
        });

        expect(store.state.observations.find(o => o.descriptorId === descriptorId).continuousUnit).to.equal(expectedContinuousUnit);
    });
});