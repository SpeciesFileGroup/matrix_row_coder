const mockRequest = require('../../request/mockRequest');
const MutationNames = require('../mutations/mutations').MutationNames;

module.exports = function({commit}) {
    return mockRequest.getDescriptors()
        .then(response => {
            commit(MutationNames.SetDescriptors, response.descriptors.map(transformDescriptorForViewmodel));
            commit(MutationNames.SetTaxonId, response.otu_id);
            commit(MutationNames.SetTaxonTitle, response.otu_tag);
        });
};

function transformDescriptorForViewmodel(descriptorData) {
    const descriptor = makeBaseDescriptor(descriptorData);
    attemptToAddCharacterStates(descriptorData, descriptor);
    return descriptor;
}

function makeBaseDescriptor(descriptorData) {
    return {
        componentName: getComponentNameForDescriptorType(descriptorData),
        title: descriptorData.descriptor_tag,
        description: getDescription(descriptorData),
        observations: [],
        id: descriptorData.id
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

function attemptToAddCharacterStates(descriptorData, descriptor) {
    if (descriptor.componentName === ComponentNames.Qualitative)
        descriptor.characterStates = descriptorData.character_states.map(transformCharacterStateForViewmodel);
}

function transformCharacterStateForViewmodel(characterStateData) {
    return {
        id: characterStateData.id,
        name: characterStateData.name,
        label: characterStateData.label,
        description: characterStateData.document_description || null,
        notes: makeNotes(characterStateData),
        depictions: makeDepictions(characterStateData)
    };
}

function makeNotes(characterStateData) {
    if (characterStateData.notes)
        return characterStateData.notes.map(n => n.text);
    else
        return [];
}

function makeDepictions(characterStateData) {
    if (characterStateData.depictions)
        return characterStateData.depictions.map(d => {
            return {
                url: d.image_url,
                caption: d.caption
            };
        });
    else
        return [];
}