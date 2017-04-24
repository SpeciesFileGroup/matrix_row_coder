const mergeIntoObservation = require('../helpers/mergeIntoObservation');

module.exports = function(state, args) {
    const {
        descriptorId,
        units
    } = args;

    mergeIntoObservation(state.observations.find(o => o.descriptorId === descriptorId), { units });
};