module.exports = function(state, args) {
    const {
        descriptorId,
        max
    } = args;

    state.observations.find(o => o.descriptorId === descriptorId).max = max;
};