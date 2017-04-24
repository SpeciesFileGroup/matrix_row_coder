const mergeIntoObservation = require('../helpers/mergeIntoObservation');

module.exports = function(state, args) {
    const {
        descriptorId,
        characterStateId,
        isChecked
    } = args;

    const observation = state.observations
        .find(o => o.descriptorId === descriptorId && o.characterStateId === characterStateId);

    mergeIntoObservation(observation, { isChecked });
};