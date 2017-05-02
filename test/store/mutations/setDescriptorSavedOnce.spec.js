const expect = require('chai').expect;
const TestHelpers = require('../../testHelpers');
const MutationNames = require('../../../src/store/mutations/mutations').MutationNames;

describe(`SetDescriptorSavedOnce mutation`, () => {
    let store;

    before(done => {
        store = TestHelpers.newTestStore();
        TestHelpers.requestMatrixRowForStore(store)
            .then(_ => TestHelpers.requestAllObservationsForStore(store))
            .then(_ => done());
    });

    it(`should set a flag on the descriptor that it has been saved once`, () => {
        const descriptorId = 24;

        expect(store.state.descriptors.find(d => d.id === descriptorId).hasSavedAtLeastOnce).to.equal(false);

        store.commit(MutationNames.SetDescriptorSavedOnce, descriptorId);

        expect(store.state.descriptors.find(d => d.id === descriptorId).hasSavedAtLeastOnce).to.equal(true);
    });
});