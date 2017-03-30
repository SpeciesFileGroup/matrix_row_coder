const mockRequest = require('../../request/mockRequest');
const MutationNames = require('../mutations/mutations').MutationNames;

const ObservationTypes = {
    Qualitative: "Qualitative",
    Presence: "Presence",
    Continuous: "Continuous",
    Sample: "Sample"
};

module.exports = function({ commit }, url) {
    return mockRequest.getObservationAt(url)
        .then(transformObservationForViewmodel)
        .then(observation => commit(MutationNames.PushObservation, observation));
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
        notes: makeNotes(observationData)
    };
}

function makeNotes(observationData) {
    if (observationData.notes)
        return observationData.notes.map(n => n.text);
    else
        return [];
}

function attemptAddContinuousProperties(observationData, observation) {
    if (observationData.type === ObservationTypes.Continuous) {
        observation.continuousValue = observationData.continuous_value;
        observation.continuousUnit = observationData.continuous_unit;
    }
}

function attemptAddQualitativeProperties(observationData, observation) {
    if (observationData.type === ObservationTypes.Qualitative) {
        observation.characterStateId = observationData.character_state_id;
    }
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