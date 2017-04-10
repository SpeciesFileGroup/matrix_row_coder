const mockRequest = require('../../request/mockRequest');
const MutationNames = require('../mutations/mutations').MutationNames;

module.exports = function({ commit }, observationId) {
    return mockRequest.getObservationDepictions(observationId)
        .then(depictions => {
            commit(MutationNames.SetObservationDepictions, {
                observationId,
                depictions
            });
        });
};