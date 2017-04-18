module.exports = function makeBaseObservation(observationData) {
    return {
        id: observationData.id,
        descriptorId: observationData.descriptorId,
        notes: [],
        depictions: [],
        confidences: [],
        citations: []
    };
};