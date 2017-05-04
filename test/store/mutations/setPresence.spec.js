import { expect } from 'chai';
import { MutationNames } from '../../../src/store/mutations/mutations';
const GetterNames = require('../../../src/store/getters/getters').GetterNames;
import * as TestHelpers from '../../testHelpers';
const store = TestHelpers.newTestStore();

describe(`SetPresence Mutation`, () => {
    const descriptorId = 25;
    const isChecked = false;

    before(done => {
        TestHelpers.requestMatrixRowForStore(store)
            .then(_ => TestHelpers.requestAllObservationsForStore(store))
            .then(_ => {
                store.commit(MutationNames.SetPresence, {
                    descriptorId,
                    isChecked
                });
            })
            .then(_ => done());
    });

    it(`should set the checked state for the observation matching the descriptor`, () => {
        expect( store.getters[GetterNames.GetPresenceFor](descriptorId) ).to.equal(isChecked);
    });

    it(`should mark the descriptor as unsaved`, () => {
        expect( store.state.descriptors.find(d => d.id === descriptorId).isUnsaved ).to.be.true;
    });
});