module.exports = function(state, args) {
    const {
        descriptorId,
        continuousUnit
    } = args;
    state.observations.find(o => o.descriptorId === descriptorId).continuousUnit = continuousUnit;
};