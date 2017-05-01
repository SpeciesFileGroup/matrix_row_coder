const expect = require('chai').expect;
const MutationNames = require('../../../src/store/mutations/mutations').MutationNames;
const TestHelpers = require('../../testHelpers');

describe(`CountdownStartedFor mutation`, () => {
    let store;

    beforeEach(done => {
        store = TestHelpers.newTestStore();
        TestHelpers.requestMatrixRowForStore(store)
            .then(_ => TestHelpers.requestAllObservationsForStore(store))
            .then(_ => done());
    });

    it(`should set the needsCountdown member to false`, () => {
        const descriptorId = 24;

        store.commit(MutationNames.SetCharacterStateChecked, {
            descriptorId,
            characterStateId: 34,
            isChecked: true
        });

        expect(store.state.descriptors.find(d => d.id === 24).needsCountdown).to.equal(true);

        store.commit(MutationNames.CountdownStartedFor, descriptorId);

        expect(store.state.descriptors.find(d => d.id === 24).needsCountdown).to.equal(false);
    });
});