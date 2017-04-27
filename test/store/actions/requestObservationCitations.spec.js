const expect = require('chai').expect;
const ActionNames = require('../../../src/store/actions/actions').ActionNames;
const TestHelpers = require('../../testHelpers');
const store = TestHelpers.newTestStore();

describe(`RequestObservationCitations action`, () => {
    before(done => {
        TestHelpers.requestMatrixRowForStore(store)
            .then(_ => TestHelpers.requestAllObservationsForStore(store))
            .then(_ => done());
    });

    it(`should request the citations for an observation and add them to the state`, () => {
        const observationId = 1001;

        return store.dispatch(ActionNames.RequestObservationCitations, observationId)
            .then(_ => {
                const observation = store.state.observations.find(o => o.id === observationId);
                expect(observation.citations).to.have.lengthOf(1);
            });
    });
});