const expect = require('chai').expect;
const MutationNames = require('../../../src/store/mutations/mutations').MutationNames;
const GetterNames = require(`../../../src/store/getters/getters`).GetterNames;
const TestHelpers = require('../../testHelpers');
const store = TestHelpers.newTestStore();

describe(`SetContinuousValue Mutation`, () => {
    const descriptorId = 26;
    const expectedContinuousValue = Math.ceil(Math.random() * 1000) + 5;

    before(done => {
        TestHelpers.requestMatrixRowForStore(store)
            .then(_ => TestHelpers.requestAllObservationsForStore(store))
            .then(_ => {
                store.commit(MutationNames.SetContinuousValue, {
                    descriptorId,
                    continuousValue: expectedContinuousValue
                });
            })
            .then(_ => done());
    });

    it(`should set the continuous value for the given descriptor`, () => {
        expect(store.state.observations.find(o => o.descriptorId === descriptorId).continuousValue).to.equal(expectedContinuousValue);
    });

    it(`should set the observation to unsaved`, () => {
        expect( store.getters[GetterNames.GetObservationsFor](descriptorId)[0].isUnsaved ).to.be.true;
    });
});