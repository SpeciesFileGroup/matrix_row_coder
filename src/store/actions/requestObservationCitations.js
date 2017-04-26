const MutationNames = require('../mutations/mutations').MutationNames;

module.exports = function({ commit, state }, observationId) {
    return state.request.getObservationCitations(observationId)
        .then(citations => {
            commit(MutationNames.SetObservationCitations, {
                observationId,
                citations
            });
        });
};