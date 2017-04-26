const TestDefines = require('./testDefines');
const ActionNames = require('../src/store/actions/actions').ActionNames;
const newStore = require('../src/store/store').newStore;
const MockRequest = require('../src/request/MockRequest');

module.exports = {
    newTestStore() {
        return newStore(new MockRequest());
    },
    requestMatrixRowForStore(store) {
        return store.dispatch(ActionNames.RequestMatrixRow, {
            matrixId: TestDefines.MatrixId,
            otuId: TestDefines.OtuId
        });
    },
    requestConfidenceLevelsForStore(store) {
        return store.dispatch(ActionNames.RequestConfidenceLevels);
    },
    requestAllObservationsForStore(store) {
        const otuId = store.state.taxonId;
        return Promise.all(store.state.descriptors.map(d => {
            return store.dispatch(ActionNames.RequestObservations, {
                descriptorId: d.id,
                otuId
            });
        }));
    }
};