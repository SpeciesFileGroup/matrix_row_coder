const expect = require('chai').expect;
const TestHelpers = require('../../testHelpers');
const MutationNames = require('../../../src/store/mutations/mutations').MutationNames;

describe(`SetDescriptorSaving mutation`, () => {
    let store;

    before(done => {
        store = TestHelpers.newTestStore();
        TestHelpers.requestMatrixRowForStore(store)
            .then(_ => TestHelpers.requestAllObservationsForStore(store))
            .then(_ => done());
    });

    it(`should set the saving flag`, () => {
        const descriptorId = 24;

        expect(store.state.descriptors.find(d => d.id === descriptorId).isSaving).to.equal(false);

        store.commit(MutationNames.SetDescriptorSaving, {
            descriptorId,
            isSaving: true
        });

        expect(store.state.descriptors.find(d => d.id === descriptorId).isSaving).to.equal(true);

        store.commit(MutationNames.SetDescriptorSaving, {
            descriptorId,
            isSaving: false
        });

        expect(store.state.descriptors.find(d => d.id === descriptorId).isSaving).to.equal(false);
    });
});