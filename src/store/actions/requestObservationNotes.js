const mockRequest = require('../../request/mockRequest');
const MutationNames = require('../mutations/mutations').MutationNames;

module.exports = function({ commit }, observationId) {
    return mockRequest.getObservationNotes(observationId)
        .then(notes => {
            commit(MutationNames.SetObservationNotes, {
                observationId,
                notes
            });
        });
};