const expect = require('chai').expect;
const MutationNames = require('../../../src/store/mutations/mutations').MutationNames;
const GetterNames = require(`../../../src/store/getters/getters`).GetterNames;
const TestHelpers = require('../../testHelpers');
const store = TestHelpers.newTestStore();

describe(`SetContinuousUnit Mutation`, () => {
    const descriptorId = 26;
    const expectedContinuousUnit = `cm`;

    before(done => {
        TestHelpers.requestMatrixRowForStore(store)
            .then(_ => TestHelpers.requestAllObservationsForStore(store))
            .then(_ => {
                store.commit(MutationNames.SetContinuousUnit, {
                    descriptorId,
                    continuousUnit: expectedContinuousUnit
                });
            })
            .then(_ => done());
    });

    it(`should set the continuous unit for the given descriptor`, () => {
        expect(store.state.observations.find(o => o.descriptorId === descriptorId).continuousUnit).to.equal(expectedContinuousUnit);
    });

    it(`should set the observation to unsaved`, () => {
        expect(store.getters[GetterNames.GetObservationsFor](descriptorId)[0].isUnsaved).to.be.true;
    });
});