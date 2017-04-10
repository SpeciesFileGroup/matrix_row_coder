const mockRequest = require('../../request/mockRequest');
const MutationNames = require('../mutations/mutations').MutationNames;

module.exports = function({ commit }, descriptorId) {
    return mockRequest.getDescriptorDepictions(descriptorId)
        .then(depictions => {
            commit(MutationNames.SetDescriptorDepictions, {
                descriptorId,
                depictions
            });
        });
};