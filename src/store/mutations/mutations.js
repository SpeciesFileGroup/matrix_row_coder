const MutationNames = {
    SetDescriptors: 'setDescriptors',
    SetTaxonTitle: 'setTaxonTitle',
    SetTaxonId: 'setTaxonId',
    PushObservation: 'pushObservation',
    SetCharacterStateCheck: 'setCharacterStateCheck'
};

const MutationFunctions = {
    [MutationNames.SetDescriptors]: require('./setDescriptors'),
    [MutationNames.SetTaxonTitle]: require('./setTaxonTitle'),
    [MutationNames.SetTaxonId]: require('./setTaxonId'),
    [MutationNames.PushObservation]: require('./pushObservation'),
    [MutationNames.SetCharacterStateCheck]: require('./setCharacterStateCheck')
};

module.exports = {
    MutationNames,
    MutationFunctions
};