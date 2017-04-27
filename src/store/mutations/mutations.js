const MutationNames = {
    SetDescriptors: 'setDescriptors',
    SetTaxonTitle: 'setTaxonTitle',
    SetTaxonId: 'setTaxonId',
    SetConfidenceLevels: 'setConfidenceLevels',
    SetObservation: 'setObservation',
    SetDescriptorNotes: 'setDescriptorNotes',
    SetDescriptorDepictions: 'setDescriptorDepictions',
    SetObservationNotes: 'setObservationNotes',
    SetObservationDepictions: 'setObservationDepictions',
    SetObservationConfidences: 'setObservationConfidences',
    SetObservationCitations: 'setObservationCitations',
    SetDescriptorZoom: 'setDescriptorZoom',
    SetContinuousValue: 'setContinuousValue',
    SetContinuousUnit: 'setContinuousUnit',
    SetPresence: 'setPresence',
    SetCharacterStateChecked: 'setCharacterStateChecked',
    SetSampleMaxFor: `setSampleMaxFor`,
    SetSampleMinFor: `setSampleMinFor`,
    SetSampleNFor: `setSampleNFor`,
    SetSampleUnitFor: `setSampleUnitFor`
};

const MutationFunctions = {
    [MutationNames.SetDescriptors]: require('./setDescriptors'),
    [MutationNames.SetTaxonTitle]: require('./setTaxonTitle'),
    [MutationNames.SetTaxonId]: require('./setTaxonId'),
    [MutationNames.SetConfidenceLevels]: require('./setConfidenceLevels'),
    [MutationNames.SetObservation]: require('./setObservation'),
    [MutationNames.SetDescriptorNotes]: require('./setDescriptorNotes'),
    [MutationNames.SetDescriptorDepictions]: require('./setDescriptorDepictions'),
    [MutationNames.SetObservationNotes]: require('./setObservationNotes'),
    [MutationNames.SetObservationDepictions]: require('./setObservationDepictions'),
    [MutationNames.SetObservationConfidences]: require('./setObservationConfidences'),
    [MutationNames.SetObservationCitations]: require('./setObservationCitations'),
    [MutationNames.SetDescriptorZoom]: require('./setDescriptorZoom'),
    [MutationNames.SetContinuousValue]: require('./setContinuousValue'),
    [MutationNames.SetContinuousUnit]: require('./setContinuousUnit'),
    [MutationNames.SetPresence]: require('./setPresence'),
    [MutationNames.SetCharacterStateChecked]: require('./setCharacterStateChecked'),
    [MutationNames.SetSampleMaxFor]: require('./setSampleMaxFor'),
    [MutationNames.SetSampleMinFor]: require('./setSampleMinFor'),
    [MutationNames.SetSampleNFor]: require('./setSampleNFor'),
    [MutationNames.SetSampleUnitFor]: require('./setSampleUnitFor'),
};

module.exports = {
    MutationNames,
    MutationFunctions
};