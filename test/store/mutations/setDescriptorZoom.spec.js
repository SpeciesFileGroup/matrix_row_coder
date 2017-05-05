import { expect } from 'chai';
import { MutationNames } from '../../../src/store/mutations/mutations';
import * as TestHelpers from '../../testHelpers';
const store = TestHelpers.newTestStore();

describe(`SetDescriptorZoom mutation`, () => {
    before(done => {
        TestHelpers.requestMatrixRowForStore(store)
            .then(_ => done());
    });

    it(`should set the given descriptor to zoomed`, () => {
        const descriptorId = 26;

        store.commit(MutationNames.SetDescriptorZoom, {
            descriptorId,
            isZoomed: true
        });

        const descriptor = store.state.descriptors.find(d => d.id === descriptorId);

        expect(descriptor.isZoomed).to.be.true;
    });

    it(`should set the given descriptor to not zoomed`, () => {
        const descriptorId = 26;

        store.commit(MutationNames.SetDescriptorZoom, {
            descriptorId,
            isZoomed: true
        });

        store.commit(MutationNames.SetDescriptorZoom, {
            descriptorId,
            isZoomed: false
        });

        const descriptor = store.state.descriptors.find(d => d.id === descriptorId);

        expect(descriptor.isZoomed).to.be.false;
    });

    it(`should set all other descriptors to not zoomed if one given is set to true`, () => {
        const descriptorIds = [24, 25, 26];

        descriptorIds.forEach(descriptorId => {
            store.commit(MutationNames.SetDescriptorZoom, {
                descriptorId,
                isZoomed: true
            });
        });

        descriptorIds.forEach((descriptorId, index) => {
            const descriptor = store.state.descriptors.find(d => d.id === descriptorId);

            if (descriptorIds.length - 1 === index)
                expect(descriptor.isZoomed).to.be.true;
            else
                expect(descriptor.isZoomed).to.be.false;
        });
    });
});