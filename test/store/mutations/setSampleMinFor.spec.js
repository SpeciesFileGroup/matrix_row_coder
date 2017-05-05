import { expect } from 'chai';
import { MutationNames } from '../../../src/store/mutations/mutations';
const GetterNames = require('../../../src/store/getters/getters').GetterNames;
import * as TestHelpers from '../../testHelpers';
const store = TestHelpers.newTestStore();

describe(`SetSampleMinFor Mutation`, () => {
    const descriptorId = 27;
    const expectedSampleMin = Math.ceil(Math.random() * 20) + 5;

    before(done => {
        TestHelpers.requestMatrixRowForStore(store)
            .then(_ => TestHelpers.requestAllObservationsForStore(store))
            .then(_ => {
                store.commit(MutationNames.SetSampleMinFor, {
                    descriptorId,
                    min: expectedSampleMin
                });
            })
            .then(_ => done());
    });

    it(`should set sample min on the observation for the descriptor`, () => {
        expect( store.getters[GetterNames.GetSampleMinFor](descriptorId) ).to.equal(expectedSampleMin);
    });

    it(`should mark the descriptor as unsaved`, () => {
        expect( store.state.descriptors.find(d => d.id === descriptorId).isUnsaved ).to.be.true;
    });
});