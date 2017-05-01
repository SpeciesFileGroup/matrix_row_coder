const ActionNames = require('./actionNames');
const MutationNames = require('../mutations/mutations').MutationNames;

module.exports = function({ dispatch, state, commit }, descriptorId) {
    const observations = state.observations
        .filter(o => o.descriptorId === descriptorId );

    return Promise.all( observations.map(o => {
        if (o.id && !o.isChecked)
            return dispatch(ActionNames.RemoveObservation, makeCharacterStateArgs(o));
        else if (o.isChecked)
            return dispatch(ActionNames.CreateObservation, makeCharacterStateArgs(o));
        else
            commit(MutationNames.ObservationSaved, makeCharacterStateArgs(o))
    }) );

    function makeCharacterStateArgs(observation) {
        return {
            descriptorId,
            characterStateId: observation.characterStateId
        };
    }
};