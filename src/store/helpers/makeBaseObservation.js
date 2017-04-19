module.exports = function makeBaseObservation(observationData) {
    return {
        id: observationData.id,
        descriptorId: observationData.descriptorId || observationData.descriptor_id,
        type: observationData.type,
        notes: [],
        depictions: [],
        confidences: [],
        citations: []
    };
};