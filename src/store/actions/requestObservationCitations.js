const mockRequest = require('../../request/mockRequest');
const MutationNames = require('../mutations/mutations').MutationNames;

module.exports = function({ commit }, observationId) {
    return mockRequest.getObservationCitations(observationId)
        .then(citations => {
            commit(MutationNames.SetObservationCitations, {
                observationId,
                citations
            });
        });
};