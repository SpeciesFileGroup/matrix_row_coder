import { expect } from 'chai';
import { MutationNames } from '../../../src/store/mutations/mutations';
import * as TestHelpers from '../../testHelpers';
const store = TestHelpers.newTestStore();

describe(`SetObservationId mutation`, () => {
    before(done => {
        TestHelpers.requestMatrixRowForStore(store)
            .then(_ => TestHelpers.requestAllObservationsForStore(store))
            .then(_ => done());
    });

    it(`should set the observation id to the given value`, () => {
        const descriptorId = 30;

        store.commit(MutationNames.SetObservationId, {
            descriptorId,
            observationId: 10000
        });

        expect(store.state.observations.find(o => o.descriptorId === descriptorId).id).to.equal(10000);
    });
});