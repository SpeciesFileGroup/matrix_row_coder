const makeBaseObservation = require('./makeBaseObservation');
const makeQualitativeObservation = require('./makeQualitativeObservation');
const makeContinuousObservation = require('./makeContinuousObservation');
const makePresenceObservation = require('./makePresenceObservation');
const makeSampleObservation = require('./makeSampleObservation');
const ObservationTypes = require('./ObservationTypes');

module.exports = function(observationData) {
    if (observationData.type === ObservationTypes.Qualitative)
        return makeQualitativeObservation(observationData);
    else if (observationData.type === ObservationTypes.Continuous)
        return makeContinuousObservation(observationData);
    else if (observationData.type === ObservationTypes.Presence)
        return makePresenceObservation(observationData);
    else if (observationData.type === ObservationTypes.Sample)
        return makeSampleObservation(observationData);
    return makeBaseObservation(observationData);
};