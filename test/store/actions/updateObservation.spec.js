const expect = require('chai').expect;
const ActionNames = require('../../../src/store/actions/actions').ActionNames;
const TestHelpers = require('../../testHelpers');

describe(`UpdateObservation action`, () => {
    let store;

    before(done => {
        store = TestHelpers.newTestStore();
        TestHelpers.requestMatrixRowForStore(store)
            .then(_ => TestHelpers.requestAllObservationsForStore(store))
            .then(_ => done());
    });

    it(`should call the update method on the request module`, () => {
        let timesCalled = 0;

        store.state.request.updateObservation = function() {
            timesCalled += 1;
            return Promise.resolve({});
        };

        return store.dispatch(ActionNames.UpdateObservation, 1001)
            .then(_ => {
                expect(timesCalled).to.equal(1);
            });
    });
});