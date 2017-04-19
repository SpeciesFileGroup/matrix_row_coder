const mockRequest = require('../../request/mockRequest');
const MutationNames = require('../mutations/mutations').MutationNames;
const ObservationTypes = require('../helpers/ObservationTypes');
const makeObservation = require('../helpers/makeObservation');

module.exports = function({ commit }, { descriptorId, otuId }) {
    return mockRequest.getObservations(otuId, descriptorId)
        .then(observationData => observationData.map(makeObservation))
        .then(observations => console.log(observations));
};

function transformObservationForViewmodel(observationData) {
    const observation = makeBaseObservation(observationData);
    attemptAddContinuousProperties(observationData, observation);
    attemptAddQualitativeProperties(observationData, observation);
    attemptAddSampleProperties(observationData, observation);
    return observation;
}

function makeBaseObservation(observationData) {
    return {
        id: observationData.id,
        descriptorId: observationData.descriptor_id,
        notes: null,
        depictions: null,
        confidences: null,
        citations: null
    };
}

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

function getCharacterStateIdThatNeedToBeChecked(observation) {
    return observation.characterStateId || null;
}