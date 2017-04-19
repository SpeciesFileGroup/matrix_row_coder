const mockRequest = require('../../request/mockRequest');
const MutationNames = require('../mutations/mutations').MutationNames;
const makeObservation = require('../helpers/makeObservation');

module.exports = function({ commit }, { descriptorId, otuId }) {
    return mockRequest.getObservations(otuId, descriptorId)
        .then(observationData => observationData.map(makeObservation))
        .then(observations => observations.forEach(observation => commit(MutationNames.SetObservation, observation)));
};