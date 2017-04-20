const expect = require('chai').expect;
const store = require('../../../src/store/store').newStore();
const ActionNames = require('../../../src/store/actions/actions').ActionNames;
const TestHelpers = require('../../testHelpers');

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