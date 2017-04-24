const mergeIntoObservation = require('../helpers/mergeIntoObservation');

module.exports = function(state, args) {
    const {
        descriptorId,
        min
    } = args;

    mergeIntoObservation(state.observations.find(o => o.descriptorId === descriptorId), { min });
};