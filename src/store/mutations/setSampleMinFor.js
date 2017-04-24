module.exports = function(state, args) {
    const {
        descriptorId,
        min
    } = args;
    state.observations.find(o => o.descriptorId === descriptorId).min = min;
};