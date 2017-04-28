const ObservationTypes = require('../helpers/ObservationTypes');

module.exports = function({state}, observationId) {
    const observation = state.observations.find(o => o.id === observationId);

    if (isQualitativeOrPresence(observation.type))
        throw `You can't update a ${observation.type} observation. You can only delete or create them.`;

    return state.request.updateObservation(observationId, makePayload(observation));
};

function isQualitativeOrPresence(type) {
    return type === ObservationTypes.Qualitative || type === ObservationTypes.Presence;
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



