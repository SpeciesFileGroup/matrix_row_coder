const ComponentNames = require('../helpers/ComponentNames');
const MutationNames = require('../mutations/mutations').MutationNames;

module.exports = function({ commit, state }, args) {
    const {
        descriptorId,
        characterStateId = null
    } = args;

    const descriptor = state.descriptors.find(d => d.id === descriptorId);
    const observationId = findObservationId();

    return state.request.removeObservation(observationId)
        .then(_ => {
            commit(MutationNames.ClearObservation, observationId);
        });

    function findObservationId() {
        return state.observations.find(getFindCallback()).id;
    }

    function getFindCallback() {
        return descriptor.type === ComponentNames.Qualitative ?
            o => o.descriptorId === descriptorId && o.characterStateId === characterStateId :
            o => o.descriptorId === descriptorId;
    }
};