const ObservationTypes = require('../helpers/ObservationTypes');

module.exports = function({ state }, observationId) {
    const observation = state.observations.find(o => o.id === observationId);



    if (observation.type === ObservationTypes.Continuous)
        return state.request.updateObservation(observationId, {
            continuous_value: observation.continuousValue,
            continuous_unit: observation.continuousUnit
        });
    else if (observation.type === ObservationTypes.Sample)
        return state.request.updateObservation(observationId, {
            sample_n: observation.n,
            sample_min: observation.min,
            sample_max: observation.max,
            sample_units: observation.units
        });
};