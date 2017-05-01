const expect = require('chai').expect;
const ActionNames = require('../../../src/store/actions/actions').ActionNames;
const MutationNames = require('../../../src/store/mutations/mutations').MutationNames;
const TestHelpers = require('../../testHelpers');

describe(`CreateObservation action`, () => {
    let store;

    before(done => {
        store = TestHelpers.newTestStore();
        TestHelpers.requestMatrixRowForStore(store)
            .then(_ => TestHelpers.requestAllObservationsForStore(store))
            .then(_ => done());
    });

    it(`should call the createObservation method on the request module`, () => {
        let timesCalled = 0;

        store.state.request.createObservation = function() {
            timesCalled++;
            return Promise.resolve({});
        };

        return store.dispatch(ActionNames.CreateObservation, {
            descriptorId: 24,
            characterStateId: 34
        }).then(_ => {
            expect(timesCalled).to.equal(1);
        });
    });

    it(`should do nothing if unsaved observations have an id`, () => {
        let timesCalled = 0;

        store.state.request.createObservation = function() {
            timesCalled++;
            return Promise.resolve({});
        };

        return store.dispatch(ActionNames.CreateObservation, {
            descriptorId: 24,
            characterStateId: 33
        }).then(_ => {
            expect(timesCalled).to.equal(0);
        });
    });
});