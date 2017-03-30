const mockRequest = require('../../request/mockRequest');
const MutationNames = require('../mutations/mutations').MutationNames;

module.exports = function({ commit }) {
    return mockRequest.getDescriptors()
        .then(response => {
            commit(MutationNames.SetDescriptors, response.descriptors.map(transformDescriptorForViewmodel));
            commit(MutationNames.SetTaxonId, response.otu_id);
            commit(MutationNames.SetTaxonTitle, response.otu_tag);
        });
};

function transformDescriptorForViewmodel(descriptorData) {
    return {
        componentName: getComponentNameForDescriptorType(descriptorData),
        title: descriptorData.descriptor_tag,
        description: getDescription(descriptorData)
    };
}

const ComponentNames = {
    Qualitative: `qualitative-descriptor`,
    Presence: `presence-descriptor`,
    Continuous: `continuous-descriptor`,
    Sample: `sample-descriptor`
};

function getComponentNameForDescriptorType(descriptorData) {
    return ComponentNames[descriptorData.type];
}

function getDescription(descriptorData) {
    return descriptorData.document_description || null;
}