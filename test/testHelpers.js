const TestDefines = require('./testDefines');
const ActionNames = require('../src/store/actions/actions').ActionNames;

module.exports = {
    requestMatrixRowForStore(store) {
        return store.dispatch(ActionNames.RequestMatrixRow, TestDefines.MatrixRowUrl);
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