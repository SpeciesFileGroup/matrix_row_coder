const MutationNames = require('../mutations/mutations').MutationNames;

module.exports = function({ commit, state }, observationId) {
    return state.request.getObservationDepictions(observationId)
        .then(depictions => {
            commit(MutationNames.SetObservationDepictions, {
                observationId,
                depictions
            });
        });
};