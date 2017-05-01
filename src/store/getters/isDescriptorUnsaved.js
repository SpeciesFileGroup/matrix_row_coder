module.exports = function(state) {
    return descriptorId => state.descriptors.find(d => d.id === descriptorId).isUnsaved;
};