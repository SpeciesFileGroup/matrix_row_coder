const MutationNames = {
    SetDescriptors: 'setDescriptors',
    SetTaxonTitle: 'setTaxonTitle',
    SetTaxonId: 'setTaxonId',
    SetConfidenceLevels: 'setConfidenceLevels',
    SetObservation: 'setObservation',
    SetCharacterStateCheck: 'setCharacterStateCheck',
    SetDescriptorNotes: 'setDescriptorNotes',
    SetDescriptorDepictions: 'setDescriptorDepictions',
    SetObservationNotes: 'setObservationNotes',
    SetObservationDepictions: 'setObservationDepictions',
    SetObservationConfidences: 'setObservationConfidences',
    SetObservationCitations: 'setObservationCitations',
    SetDescriptorZoom: 'setDescriptorZoom'
};

const MutationFunctions = {
    [MutationNames.SetDescriptors]: require('./setDescriptors'),
    [MutationNames.SetTaxonTitle]: require('./setTaxonTitle'),
    [MutationNames.SetTaxonId]: require('./setTaxonId'),
    [MutationNames.SetConfidenceLevels]: require('./setConfidenceLevels'),
    [MutationNames.SetObservation]: require('./setObservation'),
    [MutationNames.SetCharacterStateCheck]: require('./setCharacterStateCheck'),
    [MutationNames.SetDescriptorNotes]: require('./setDescriptorNotes'),
    [MutationNames.SetDescriptorDepictions]: require('./setDescriptorDepictions'),
    [MutationNames.SetObservationNotes]: require('./setObservationNotes'),
    [MutationNames.SetObservationDepictions]: require('./setObservationDepictions'),
    [MutationNames.SetObservationConfidences]: require('./setObservationConfidences'),
    [MutationNames.SetObservationCitations]: require('./setObservationCitations'),
    [MutationNames.SetDescriptorZoom]: require('./setDescriptorZoom')
};

module.exports = {
    MutationNames,
    MutationFunctions
};