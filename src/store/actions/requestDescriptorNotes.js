const MutationNames = require('../mutations/mutations').MutationNames;

module.exports = function({ commit, state }, descriptorId) {
    return state.request.getDescriptorNotes(descriptorId)
        .then(descriptorNotes => {
            commit(MutationNames.SetDescriptorNotes, {
                descriptorId,
                notes: descriptorNotes
            });
        });
};