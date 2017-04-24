module.exports = function(state, args) {
    const {
        descriptorId,
        n
    } = args;

    state.observations.find(o => o.descriptorId === descriptorId).n = n;
};