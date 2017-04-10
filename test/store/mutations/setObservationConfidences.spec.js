const expect = require('chai').expect;
const MutationNames = require('../../../src/store/mutations/mutations').MutationNames;
const store = require('../../../src/store/store').newStore();
const TestHelpers = require('../../testHelpers');

describe(`SetObservationConfidences mutation`, () => {
    before(done => {
        TestHelpers.requestMatrixRowForStore(store)
            .then(_ => TestHelpers.requestAllObservationsForStore(store))
            .then(_ => done());
    });

    it(`should set the confidences to an empty array if given one`, () => {
        const observationId = 1001;

        store.commit(MutationNames.SetObservationConfidences, {
            observationId,
            confidences: []
        });

        const observation = store.state.observations.find(o => o.id === observationId);

        expect(observation.confidences).to.deep.equal([]);
    });

    it(`should transform and set the confidences`, () => {
        const observationId = 1001;

        store.commit(MutationNames.SetObservationConfidences, {
            observationId,
            confidences: require('../../../src/request/mockRequests/observations-1001-confidences.json')
        });

        const observation = store.state.observations.find(o => o.id === observationId);

        expect(observation.confidences).to.deep.equal([
            {
                confidenceLevelId: 5001
            }
        ]);
    });
});