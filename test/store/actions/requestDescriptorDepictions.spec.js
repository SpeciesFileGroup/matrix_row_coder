import { expect } from 'chai';
import { ActionNames } from '../../../src/store/actions/actions';
import * as TestHelpers from '../../testHelpers';

const store = TestHelpers.newTestStore();

describe(`RequestDescriptorDepictions action`, () => {
    before(done => {
        TestHelpers.requestMatrixRowForStore(store)
            .then(_ => done());
    });

    it(`should fetch the depictions for a given descriptor`, () => {
        const descriptorId = 25;

        store.dispatch(ActionNames.RequestDescriptorDepictions, descriptorId)
            .then(_ => {
                const descriptor = store.state.descriptors.find(d => d.id === descriptorId);
                expect(descriptor.depictions).to.have.lengthOf(1);
            });
    });
});