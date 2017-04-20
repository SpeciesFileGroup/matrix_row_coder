module.exports = function(state, args) {
    const {
        descriptorId,
        characterStateId,
        isChecked
    } = args;
    state.observations
        .find(o => o.descriptorId === descriptorId && o.characterStateId === characterStateId)
        .isChecked = isChecked
};