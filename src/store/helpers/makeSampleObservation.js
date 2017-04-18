const makeBaseObservation = require('./makeBaseObservation');

module.exports = function(observationData) {
    const observation = makeBaseObservation(observationData);
    return Object.assign(observation, {
        n: null,
        min: null,
        max: null,
        median: null,
        mean: null,
        units: null,
        standardDeviation: null,
        standardError: null
    });
};