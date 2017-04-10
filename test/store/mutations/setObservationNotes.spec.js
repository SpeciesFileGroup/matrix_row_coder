const expect = require('chai').expect;
const store = require('../../../src/store/store').newStore();
const MutationNames = require('../../../src/store/mutations/mutations').MutationNames;
const TestHelpers = require('../../testHelpers');

describe(`SetObservationNotes mutation`, () => {
    before(done => {
        TestHelpers.requestMatrixRowForStore(store)
            .then(_ => TestHelpers.requestAllObservationsForStore(store))
            .then(_ => done());
    });

    it(`should set the notes to an empty array if given one`, () => {
        const observationId = 1001;

        store.commit(MutationNames.SetObservationNotes, {
            observationId,
            notes: []
        });

        const observation = store.state.observations.find(o => o.id === observationId);

        expect(observation.notes).to.deep.equal([]);
    });

    it(`should transform and set the notes on the observation`, () => {
        const observationId = 1002;
        const notes = require('../../../src/request/mockRequests/observations-1002-notes.json');

        store.commit(MutationNames.SetObservationNotes, {
            observationId,
            notes
        });

        const observation = store.state.observations.find(o => o.id === observationId);

        expect(observation.notes).to.deep.equal([
            {
                text: "This is a detail about an Observation.",
                noteIsForA: "Observation",
                noteIsFor: observationId
            }
        ]);
    });
});