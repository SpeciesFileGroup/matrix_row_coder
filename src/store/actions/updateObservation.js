const ObservationTypes = require('../helpers/ObservationTypes');
const ComponentNames = require('../helpers/ComponentNames');

module.exports = function({state}, descriptorId) {
    const descriptor = state.descriptors.find(d => d.id === descriptorId);

    if (isQualitativeOrPresence(descriptor.componentName))
        throw `You can't update a ${getDescriptorTypeName(descriptor.componentName)} descriptor. You can only delete or create them.`;

    const observation = state.observations.find(o => o.descriptorId === descriptorId);

    return state.request.updateObservation(observation.id, makePayload(observation));
};

function isQualitativeOrPresence(componentName) {
    return componentName === ComponentNames.Qualitative || componentName === ComponentNames.Presence;
}

function makePayload(observation) {
    if (observation.type === ObservationTypes.Continuous)
        return {
            continuous_value: observation.continuousValue,
            continuous_unit: observation.continuousUnit
        };
    else if (observation.type === ObservationTypes.Sample)
        return {
            sample_n: observation.n,
            sample_min: observation.min,
            sample_max: observation.max,
            sample_units: observation.units
        };
}

function getDescriptorTypeName(componentName) {
    if (componentName === ComponentNames.Qualitative)
        return `Qualitative`;
    if (componentName === ComponentNames.Presence)
        return `Presence`;
}