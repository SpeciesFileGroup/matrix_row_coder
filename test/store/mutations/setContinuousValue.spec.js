import { expect } from 'chai';
import { MutationNames } from '../../../src/store/mutations/mutations';
const GetterNames = require(`../../../src/store/getters/getters`).GetterNames;
import * as TestHelpers from '../../testHelpers';
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

    it(`should set the descriptor to unsaved`, () => {
        expect( store.state.descriptors.find(d => d.id === descriptorId).isUnsaved ).to.be.true;
    });
});