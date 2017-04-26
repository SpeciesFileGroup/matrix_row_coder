const MutationNames = require('../mutations/mutations').MutationNames;
const makeObservation = require('../helpers/makeObservation');

module.exports = function({ commit, state }, { descriptorId, otuId }) {
    return state.request.getObservations(otuId, descriptorId)
        .then(observationData => observationData.map(makeObservation))
        .then(observations => observations.forEach(observation => commit(MutationNames.SetObservation, observation)));
};