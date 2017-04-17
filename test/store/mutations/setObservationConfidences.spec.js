const expect = require('chai').expect;
const MutationNames = require('../../../src/store/mutations/mutations').MutationNames;
const store = require('../../../src/store/store').newStore();
const TestHelpers = require('../../testHelpers');

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