const mockRequest = require('../../request/mockRequest');
const MutationNames = require('../mutations/mutations').MutationNames;

module.exports = function({ commit }) {
    return mockRequest.getDescriptors()
        .then(response => {
            commit(MutationNames.SetDescriptors, response.descriptors);
            commit(MutationNames.SetTaxonId, response.otu_id);
            commit(MutationNames.SetTaxonTitle, response.otu_tag);
        });
};