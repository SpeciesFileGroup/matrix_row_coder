module.exports = function(state) {
    return descriptorId => state.observations.find(o => o.descriptorId === descriptorId).units;
};