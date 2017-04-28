const MutationNames = require('../mutations/mutations').MutationNames;
const DescriptorTypes = require('../helpers/DescriptorTypes');
const ComponentNames = require('../helpers/ComponentNames');
const makeEmptyObservationsFor = require('../helpers/makeEmptyObservationsFor');

module.exports = function({commit, state}, args) {
    const {
        matrixId,
        otuId
    } = args;

    return state.request.getMatrixRow(matrixId, otuId)
        .then(response => {
            const descriptors = response.descriptors.map(transformDescriptorForViewmodel);
            commit(MutationNames.SetDescriptors, descriptors);

            const emptyObservations = makeEmptyObservationsForDescriptors(descriptors);
            emptyObservations.forEach(o => commit(MutationNames.SetObservation, o));

            addOtuToState();

            function addOtuToState() {
                const {
                    id,
                    object_tag
                } = response.otu;
                commit(MutationNames.SetTaxonId, id);
                commit(MutationNames.SetTaxonTitle, object_tag);
            }
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
        isZoomed: false,
        notes: null,
        depictions: null
    };
}

const DescriptorTypesToComponentNames = {
    [DescriptorTypes.Qualitative]: ComponentNames.Qualitative,
    [DescriptorTypes.Continuous]: ComponentNames.Continuous,
    [DescriptorTypes.Sample]: ComponentNames.Sample,
    [DescriptorTypes.Presence]: ComponentNames.Presence
};

function getComponentNameForDescriptorType(descriptorData) {
    return DescriptorTypesToComponentNames[descriptorData.type];
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
        description: characterStateData.description || null
    };
}

function makeEmptyObservationsForDescriptors(descriptors) {
    let observations = [];

    descriptors.forEach(descriptor => {
        observations = [...observations, ...makeEmptyObservationsFor(descriptor)];
    });

    return observations;
}