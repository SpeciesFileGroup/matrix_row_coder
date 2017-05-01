const mergeIntoObservation = require('../helpers/mergeIntoObservation');
const setDescriptorUnsaved = require('../helpers/setDescriptorUnsaved');

module.exports = function(state, args) {
    const {
        descriptorId,
        n
    } = args;

    mergeIntoObservation(state.observations.find(o => o.descriptorId === descriptorId), { n });
    setDescriptorUnsaved(state.descriptors.find(d => d.id === descriptorId));
};