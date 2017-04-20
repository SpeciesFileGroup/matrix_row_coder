module.exports = function(state, args) {
    const {
        descriptorId,
        continuousValue
    } = args;
    state.observations.find(o => o.descriptorId === descriptorId).continuousValue = continuousValue;
};