const MutationNames = {
    SetDescriptors: 'setDescriptors',
    SetTaxonTitle: 'setTaxonTitle',
    SetTaxonId: 'setTaxonId',
    SetConfidenceLevels: 'setConfidenceLevels',
    PushObservation: 'pushObservation',
    SetCharacterStateCheck: 'setCharacterStateCheck',
    SetDescriptorNotes: 'setDescriptorNotes',
    SetDescriptorDepictions: 'setDescriptorDepictions',
    SetObservationNotes: 'setObservationNotes',
    SetObservationDepictions: 'setObservationDepictions',
    SetObservationConfidences: 'setObservationConfidences'
};

const MutationFunctions = {
    [MutationNames.SetDescriptors]: require('./setDescriptors'),
    [MutationNames.SetTaxonTitle]: require('./setTaxonTitle'),
    [MutationNames.SetTaxonId]: require('./setTaxonId'),
    [MutationNames.SetConfidenceLevels]: require('./setConfidenceLevels'),
    [MutationNames.PushObservation]: require('./pushObservation'),
    [MutationNames.SetCharacterStateCheck]: require('./setCharacterStateCheck'),
    [MutationNames.SetDescriptorNotes]: require('./setDescriptorNotes'),
    [MutationNames.SetDescriptorDepictions]: require('./setDescriptorDepictions'),
    [MutationNames.SetObservationNotes]: require('./setObservationNotes'),
    [MutationNames.SetObservationDepictions]: require('./setObservationDepictions'),
    [MutationNames.SetObservationConfidences]: require('./setObservationConfidences')
};

module.exports = {
    MutationNames,
    MutationFunctions
};