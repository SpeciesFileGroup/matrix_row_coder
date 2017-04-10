const expect = require('chai').expect;
const store = require('../../../src/store/store').newStore();
const ActionNames = require('../../../src/store/actions/actions').ActionNames;
const TestHelpers = require('../../testHelpers');

describe(`RequestObservationConfidences action`, () => {
    before(done => {
        TestHelpers.requestMatrixRowForStore(store)
            .then(_ => TestHelpers.requestAllObservationsForStore(store))
            .then(_ => done());
    });

    it(`should request the confidences for an observation and add them to the state`, () => {
        const observationId = 1001;

        return store.dispatch(ActionNames.RequestObservationConfidences, observationId)
            .then(_ => {
                const observation = store.state.observations.find(o => o.id === observationId);
                expect(observation.confidences).to.have.lengthOf(1);
            });
    });
});