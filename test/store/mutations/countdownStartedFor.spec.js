import { expect } from 'chai';
import { MutationNames } from '../../../src/store/mutations/mutations';
import * as TestHelpers from '../../testHelpers';

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