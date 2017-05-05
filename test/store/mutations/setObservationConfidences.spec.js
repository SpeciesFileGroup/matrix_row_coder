import { expect } from 'chai';
import { MutationNames } from '../../../src/store/mutations/mutations';
import * as TestHelpers from '../../testHelpers';
const store = TestHelpers.newTestStore();

describe(`SetObservationConfidences mutation`, () => {
    before(done => {
        TestHelpers.requestMatrixRowForStore(store)
            .then(_ => TestHelpers.requestConfidenceLevelsForStore(store))
            .then(_ => TestHelpers.requestAllObservationsForStore(store))
            .then(_ => done());
    });

    it(`should set the confidences on the observation to the value given`, () => {
        const observationId = 1001;

        const confidences = {
            foo: true,
            bar: false,
            baz: true,
            qux: false
        };

        store.commit(MutationNames.SetObservationConfidences, {
            observationId,
            confidences
        });

        const observation = store.state.observations.find(o => o.id === observationId);

        expect(observation.confidences).to.equal(confidences);
    });
});