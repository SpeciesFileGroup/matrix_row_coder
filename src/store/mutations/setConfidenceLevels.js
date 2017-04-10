module.exports = function(state, confidenceLevels) {
    state.confidenceLevels = confidenceLevels.map(transformConfidenceLevelForViewmodel)
};

function transformConfidenceLevelForViewmodel(confidenceLevelData) {
    return {
        id: confidenceLevelData.id,
        name: confidenceLevelData.name,
        definition: confidenceLevelData.definition,
        color: confidenceLevelData.css_color
    };
}