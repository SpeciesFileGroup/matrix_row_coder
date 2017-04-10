const MutationNames = require('../mutations/mutations').MutationNames;
const mockRequest = require('../../request/mockRequest');

module.exports = function({ commit }, observationId) {
    return mockRequest.getObservationConfidences(observationId)
        .then(confidences => {
            commit(MutationNames.SetObservationConfidences, {
                observationId,
                confidences
            });
        });
};