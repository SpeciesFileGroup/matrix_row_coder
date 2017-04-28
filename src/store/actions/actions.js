const ActionNames = {
    RequestMatrixRow: 'requestMatrixRow',
    RequestConfidenceLevels: 'requestConfidenceLevels',
    RequestObservations: 'requestObservation',
    RequestDescriptorNotes: 'requestDescriptorNotes',
    RequestDescriptorDepictions: 'requestDescriptorDepictions',
    RequestObservationNotes: 'requestObservationNotes',
    RequestObservationDepictions: 'requestObservationDepictions',
    RequestObservationConfidences: 'requestObservationConfidences',
    RequestObservationCitations: 'requestObservationCitations',
    RemoveObservation: 'removeObservation',
    UpdateObservation: 'updateObservation'
};

const ActionFunctions = {
    [ActionNames.RequestMatrixRow]: require('./requestMatrixRow'),
    [ActionNames.RequestConfidenceLevels]: require('./requestConfidenceLevels'),
    [ActionNames.RequestObservations]: require('./requestObservations'),
    [ActionNames.RequestDescriptorNotes]: require('./requestDescriptorNotes'),
    [ActionNames.RequestDescriptorDepictions]: require('./requestDescriptorDepictions'),
    [ActionNames.RequestObservationNotes]: require('./requestObservationNotes'),
    [ActionNames.RequestObservationDepictions]: require('./requestObservationDepictions'),
    [ActionNames.RequestObservationConfidences]: require('./requestObservationConfidences'),
    [ActionNames.RequestObservationCitations]: require('./requestObservationCitations'),
    [ActionNames.RemoveObservation]: require('./removeObservation'),
    [ActionNames.UpdateObservation]: require('./updateObservation')
};

module.exports = {
    ActionNames,
    ActionFunctions
};