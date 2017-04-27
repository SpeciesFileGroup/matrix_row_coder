const expect = require('chai').expect;
const MutationNames = require('../../../src/store/mutations/mutations').MutationNames;
const TestHelpers = require('../../testHelpers');
const store = TestHelpers.newTestStore();

describe(`SetObservationCitations mutation`, () => {
    before(done => {
        TestHelpers.requestMatrixRowForStore(store)
            .then(_ => TestHelpers.requestAllObservationsForStore(store))
            .then(_ => done());
    });

    it(`should set the given citations on the observation`, () => {
        const observationId = 1001;

        store.commit(MutationNames.SetObservationCitations, {
            observationId,
            citations: require('../../../src/request/mockRequests/observations-1001-citations.json')
        });

        const observation = store.state.observations.find(o => o.id === observationId);

        expect(observation.citations).to.deep.equal([
            {
                description: "Yoder 2004, A story about big bugs, Journal About Stuff & Things, Page 4, Volume 3 and 4",
                author: "Yoder 2004"
            }
        ]);
    });
});