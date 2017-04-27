module.exports = function(state) {
    return descriptorId => {
        const observations = state.observations.filter(o => o.descriptorId === descriptorId);
        return observations.some(o => o.isUnsaved);
    };
};