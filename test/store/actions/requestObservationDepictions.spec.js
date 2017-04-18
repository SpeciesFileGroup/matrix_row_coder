const expect = require('chai').expect;
const store = require('../../../src/store/store').newStore();
const ActionNames = require('../../../src/store/actions/actions').ActionNames;
const TestHelpers = require('../../testHelpers');

describe(`RequestObservationDepictions action`, () => {
    before(done => {
        TestHelpers.requestMatrixRowForStore(store)
            .then(_ => TestHelpers.requestAllObservationsForStore(store))
            .then(_ => done());
    });

    it(`should request the depictions for an observation and add them to the state`, () => {
        const observationId = 1004;

        return store.dispatch(ActionNames.RequestObservationDepictions, observationId)
            .then(_ => {
                const observation = store.state.observations.find(o => o.id === observationId);
                expect(observation.depictions).to.have.lengthOf(2);
            });
    });
});