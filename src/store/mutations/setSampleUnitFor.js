module.exports = function(state, args) {
    const {
        descriptorId,
        units
    } = args;

    state.observations.find(o => o.descriptorId === descriptorId).units = units;
};