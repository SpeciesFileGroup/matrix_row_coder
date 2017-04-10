const ActionNames = {
    RequestMatrixRow: 'requestMatrixRow',
    RequestConfidenceLevels: 'requestConfidenceLevels',
    RequestObservation: 'requestObservation',
    RequestDescriptorNotes: 'requestDescriptorNotes',
    RequestDescriptorDepictions: 'requestDescriptorDepictions',
    RequestObservationNotes: 'requestObservationNotes',
    RequestObservationDepictions: 'requestObservationDepictions',
    RequestObservationConfidences: 'requestObservationConfidences'
};

const ActionFunctions = {
    [ActionNames.RequestMatrixRow]: require('./requestMatrixRow'),
    [ActionNames.RequestConfidenceLevels]: require('./requestConfidenceLevels'),
    [ActionNames.RequestObservation]: require('./requestObservation'),
    [ActionNames.RequestDescriptorNotes]: require('./requestDescriptorNotes'),
    [ActionNames.RequestDescriptorDepictions]: require('./requestDescriptorDepictions'),
    [ActionNames.RequestObservationNotes]: require('./requestObservationNotes'),
    [ActionNames.RequestObservationDepictions]: require('./requestObservationDepictions'),
    [ActionNames.RequestObservationConfidences]: require('./requestObservationConfidences')
};

module.exports = {
    ActionNames,
    ActionFunctions
};