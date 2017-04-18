module.exports = function makeBaseObservation(observationData) {
    return {
        id: observationData.id,
        descriptorId: observationData.descriptorId,
        notes: null,
        depictions: null,
        confidences: null,
        citations: null
    };
};