const makeBaseObservation = require('./makeBaseObservation');

module.exports = function(observationData) {
    const observation = makeBaseObservation(observationData);
    return Object.assign(observation, {
        n: observationData.sample_n || null,
        min: observationData.sample_min || null,
        max: observationData.sample_max || null,
        median: observationData.sample_median || null,
        mean: observationData.sample_mean || null,
        units: observationData.sample_units || null,
        standardDeviation: observationData.sample_standard_deviation || null,
        standardError: observationData.sample_standard_error || null,
    });
};