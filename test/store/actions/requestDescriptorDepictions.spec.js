const expect = require('chai').expect;
const store = require('../../../src/store/store').newStore();
const ActionNames = require('../../../src/store/actions/actions').ActionNames;
const TestHelpers = require('../../testHelpers');

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