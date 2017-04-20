module.exports = function(state, args) {
    const {
        descriptorId,
        isChecked
    } = args;
    state.observations.find(o => o.descriptorId === descriptorId).isChecked = isChecked;
};