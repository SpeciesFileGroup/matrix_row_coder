const MutationNames = require('../mutations/mutations').MutationNames;

module.exports = function({ commit, state }, observationId) {
    return state.request.removeObservation(observationId)
        .then(_ => {
            commit(MutationNames.ClearObservation, observationId);
        });
};