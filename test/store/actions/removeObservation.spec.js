const expect = require('chai').expect;
const TestHelpers = require('../../testHelpers');
const ActionNames = require('../../../src/store/actions/actions').ActionNames;

describe(`RemoveObservation action`, () => {
    let store;

    beforeEach(done => {
        store = TestHelpers.newTestStore();
        TestHelpers.requestMatrixRowForStore(store)
            .then(_ => TestHelpers.requestAllObservationsForStore(store))
            .then(_ => done());
    });

    it(`should send a request to remove the given observation`, () => {
        let timesCalled = 0;

        store.state.request.removeObservation = function(observationId) {
            timesCalled += 1;
            return Promise.resolve({});
        };

        const observationId = 1001;

        return store.dispatch(ActionNames.RemoveObservation, observationId)
            .then(_ => {
                expect(timesCalled).to.equal(1);
            });
    });

    it(`should clear the observation`, () => {
        const descriptorId = 24;
        const observationId = store.state.observations
            .filter(o => o.descriptorId === descriptorId)
            .find(o => o.id).id;

        return store.dispatch(ActionNames.RemoveObservation, observationId)
            .then(_ => {
                store.state.observations
                    .filter(o => o.descriptorId === descriptorId)
                    .forEach(o => {
                        expect(o.id).to.be.null;
                    });
            });
    });
});