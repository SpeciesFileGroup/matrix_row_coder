import { expect } from 'chai';
import { ActionNames } from '../../../src/store/actions/actions';
import * as TestHelpers from '../../testHelpers';
const store = TestHelpers.newTestStore();

describe(`RequestDescriptorNotes action`, () => {
    before(done => {
        TestHelpers.requestMatrixRowForStore(store)
            .then(_ => done());
    });

    it(`should request the notes for a descriptor and add them to the state`, () => {
        const descriptorIndex = 0;
        const descriptor = store.state.descriptors[descriptorIndex];
        return store.dispatch(ActionNames.RequestDescriptorNotes, descriptor.id)
            .then(_ => {
                expect(store.state.descriptors[descriptorIndex].notes).to.have.lengthOf(1);
            });
    });
});