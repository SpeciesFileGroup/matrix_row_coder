const mockRequest = require('../../request/mockRequest');
const MutationNames = require('../mutations/mutations').MutationNames;

module.exports = function({ commit }, url) {
    return mockRequest.getObservationAt(url)
        .then(transformObservationForViewmodel)
        .then(observation => commit(MutationNames.PushObservation, observation));
};

function transformObservationForViewmodel(observationData) {
    return {
        id: observationData.id,
        descriptorId: observationData.descriptor_id
    };
}