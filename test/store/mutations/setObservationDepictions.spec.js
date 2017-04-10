const expect = require('chai').expect;
const MutationNames = require('../../../src/store/mutations/mutations').MutationNames;
const store = require('../../../src/store/store').newStore();
const TestHelpers = require('../../testHelpers');

describe(`SetObservationDepictions mutation`, () => {
    before(done => {
        TestHelpers.requestMatrixRowForStore(store)
            .then(_ => TestHelpers.requestAllObservationsForStore(store))
            .then(_ => done());
    });

    it(`should set the observation's depictions to an empty array if given an empty array`, () => {
        const observationId = 1002;

        store.commit(MutationNames.SetObservationDepictions, {
            observationId,
            depictions: []
        });

        const observation = store.state.observations.find(o => o.id === observationId);
        expect(observation.depictions).to.deep.equal([]);
    });

    it(`should transform and set the given depictions`, () => {
        const observationId = 1004;
        const depictions = require('../../../src/request/mockRequests/observations-1004-depictions.json');

        store.commit(MutationNames.SetObservationDepictions, {
            observationId,
            depictions
        });

        const observation = store.state.observations.find(o => o.id === observationId);

        expect(observation.depictions).to.deep.equal([
            {
                caption: "Bees are flying insects closely related to wasps and ants, known for their role in pollination and, in the case of the best-known bee species, the European honey bee, for producing honey and beeswax.",
                normalSrc: "//placebacon.net/700/700",
                mediumSrc: "//placebacon.net/300/300",
                thumbSrc: "//placebacon.net/100/100"
            }
        ]);
    });
});