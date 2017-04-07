const TestDefines = require('./testDefines');
const ActionNames = require('../src/store/actions/actions').ActionNames;

module.exports = {
    requestMatrixRowForStore(store) {
        return store.dispatch(ActionNames.RequestMatrixRow, TestDefines.MatrixRowUrl)
    },
    requestAllObservationsForStore(store) {
        const otuId = store.state.taxonId;
        return Promise.all(store.state.descriptors.map(d => {
            return store.dispatch(ActionNames.RequestObservation, {
                descriptorId: d.id,
                otuId
            });
        }));
    }
};