const makeBaseObservation = require('./makeBaseObservation');
const makeQualitativeObservation = require('./makeQualitativeObservation');
const ObservationTypes = require('./ObservationTypes');

module.exports = function(observationData) {
    if (observationData.type === ObservationTypes.Qualitative)
        return makeQualitativeObservation(observationData);
    return makeBaseObservation(observationData);
};

function attemptAddContinuousProperties(observationData, observation) {
    if (observationData.type === ObservationTypes.Continuous) {
        observation.continuousValue = observationData.continuous_value;
        observation.continuousUnit = observationData.continuous_unit;
    }
}

function attemptAddQualitativeProperties(observationData, observation) {
    if (observationData.type === ObservationTypes.Qualitative)
        observation.characterStateId = observationData.character_state_id;
}

function attemptAddSampleProperties(observationData, observation) {
    if (observationData.type === ObservationTypes.Sample) {
        observation.n = observationData.sample_n;
        observation.min = observationData.sample_min;
        observation.max = observationData.sample_max;
        observation.median = observationData.sample_median;
        observation.mean = observationData.sample_mean;
        observation.units = observationData.sample_units;
        observation.standardDeviation = observationData.sample_standard_deviation;
        observation.standardError = observationData.sample_standard_error;
    }
}