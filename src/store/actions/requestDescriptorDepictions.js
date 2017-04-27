const MutationNames = require('../mutations/mutations').MutationNames;

module.exports = function({ commit, state }, descriptorId) {
    return state.request.getDescriptorDepictions(descriptorId)
        .then(depictions => {
            commit(MutationNames.SetDescriptorDepictions, {
                descriptorId,
                depictions
            });
        });
};