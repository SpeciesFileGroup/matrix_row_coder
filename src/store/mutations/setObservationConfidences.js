module.exports = function(state, args) {
    const observation = state.observations.find(o => o.id === args.observationId);
    observation.confidences = args.confidences.map(transformConfidenceForViewmodel);
};

function transformConfidenceForViewmodel(confidenceData) {
    return {
        confidenceLevelId: confidenceData.confidence_level_id
    };
}