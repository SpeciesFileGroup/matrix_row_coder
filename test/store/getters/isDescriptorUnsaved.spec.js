import { expect } from 'chai';
import { GetterNames } from '../../../src/store/getters/getters';
import { MutationNames } from '../../../src/store/mutations/mutations';
import * as TestHelpers from '../../testHelpers';

const store = TestHelpers.newTestStore();

describe(`IsDescriptorUnsaved Getter`, () => {
    const unsavedDescriptorId = 27;

    before(done => {
        TestHelpers.requestMatrixRowForStore(store)
            .then(_ => TestHelpers.requestAllObservationsForStore(store))
            .then(_ => {
                store.commit(MutationNames.SetContinuousValue, {
                    descriptorId: unsavedDescriptorId,
                    continuousValue: 999
                });
            })
            .then(_ => done());
    });

    it(`should return true if any observation for that descriptor has been changed and unsaved`, () => {
        expect(store.getters[GetterNames.IsDescriptorUnsaved](unsavedDescriptorId)).to.be.true;
    });

    it(`should return false if the observation has not been changed`, () => {
        store.state.descriptors
            .map(d => d.id)
            .filter(dId => dId !== unsavedDescriptorId)
            .forEach(normalDescriptorId => {
                expect(store.getters[GetterNames.IsDescriptorUnsaved](normalDescriptorId)).to.be.false;
            });
    });
});