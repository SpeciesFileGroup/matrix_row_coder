import { expect } from 'chai';
import { MutationNames } from '../../../src/store/mutations/mutations';
const GetterNames = require('../../../src/store/getters/getters').GetterNames;
import * as TestHelpers from '../../testHelpers';
const store = TestHelpers.newTestStore();

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

    it(`should mark the descriptor as unsaved`, () => {
        expect(store.state.descriptors.find(d => d.id === descriptorId).isUnsaved).to.be.true;
    });
});