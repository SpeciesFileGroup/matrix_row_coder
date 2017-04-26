const MutationNames = require('../mutations/mutations').MutationNames;

module.exports = function({ commit, state }, observationId) {
    return state.request.getObservationNotes(observationId)
        .then(notes => {
            commit(MutationNames.SetObservationNotes, {
                observationId,
                notes
            });
        });
};