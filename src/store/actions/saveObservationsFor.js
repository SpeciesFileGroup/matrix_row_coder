const ActionNames = require('./actionNames');
const MutationNames = require('../mutations/mutations').MutationNames;
const ObservationTypes = require('../helpers/ObservationTypes');

module.exports = function({ dispatch, state, commit }, descriptorId) {
    const observations = state.observations
        .filter(o => o.descriptorId === descriptorId);

    return Promise.all( observations.map(o => {
        if (isCheckableObservation(o))
            saveCheckableObservation(o);
        else if (o.id)
            return dispatch(ActionNames.UpdateObservation, descriptorId);
        else
            return dispatch(ActionNames.CreateObservation, { descriptorId });
    }) );

    function saveCheckableObservation(observation) {
        if (observation.id && !observation.isChecked)
            return dispatch(ActionNames.RemoveObservation, makeObservationArgs(observation));
        else if (observation.isChecked)
            return dispatch(ActionNames.CreateObservation, makeObservationArgs(observation));
        else
            commit(MutationNames.ObservationSaved, makeObservationArgs(observation));
    }
};

function isCheckableObservation(observation) {
    return observation.type === ObservationTypes.Qualitative || observation.type === ObservationTypes.Presence;
}

function makeObservationArgs(observation) {
    const args = {
        descriptorId: observation.descriptorId
    };

    if (observation.type === ObservationTypes.Qualitative)
        args.characterStateId = observation.characterStateId;

    return args;
}