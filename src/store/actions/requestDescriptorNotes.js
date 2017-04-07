const mockRequest = require('../../request/mockRequest');
const MutationNames = require('../mutations/mutations').MutationNames;

module.exports = function({ commit }, descriptorId) {
    return mockRequest.getDescriptorNotes(descriptorId)
        .then(descriptorNotes => {
            commit(MutationNames.SetDescriptorNotes, {
                descriptorId,
                notes: descriptorNotes
            });
        });
};