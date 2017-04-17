const mockRequest = require('../../request/mockRequest');
const MutationNames = require('../mutations/mutations').MutationNames;
const ComponentNames = require('../helpers/ComponentNames');

module.exports = function({commit}, matrixRowUrl) {
    return mockRequest.getMatrixRow(matrixRowUrl)
        .then(response => {
            commit(MutationNames.SetDescriptors, response.descriptors.map(transformDescriptorForViewmodel));
            const {
                otu_id,
                object_tag
            } = response.otu;
            commit(MutationNames.SetTaxonId, otu_id);
            commit(MutationNames.SetTaxonTitle, object_tag);
        });
};

function transformDescriptorForViewmodel(descriptorData) {
    const descriptor = makeBaseDescriptor(descriptorData);
    attemptToAddCharacterStates(descriptorData, descriptor);
    return descriptor;
}

function makeBaseDescriptor(descriptorData) {
    return {
        id: descriptorData.id,
        componentName: getComponentNameForDescriptorType(descriptorData),
        title: descriptorData.object_tag,
        description: getDescription(descriptorData),
        notes: null,
        depictions: null
    };
}

function getComponentNameForDescriptorType(descriptorData) {
    return ComponentNames[descriptorData.type];
}

function getDescription(descriptorData) {
    return descriptorData.description || null;
}

function attemptToAddCharacterStates(descriptorData, descriptor) {
    if (descriptor.componentName === ComponentNames.Qualitative)
        descriptor.characterStates = descriptorData.character_states.map(transformCharacterStateForViewmodel);
}

function transformCharacterStateForViewmodel(characterStateData) {
    return {
        id: characterStateData.id,
        name: characterStateData.name,
        label: characterStateData.label,
        description: characterStateData.description || null,
        isChecked: false
    };
}