const ActionNames = {
    RequestMatrixRow: 'requestMatrixRow',
    RequestObservation: 'requestObservation',
    RequestDescriptorNotes: 'requestDescriptorNotes',
    RequestDescriptorDepictions: 'requestDescriptorDepictions',
    RequestObservationNotes: 'requestObservationNotes',
    RequestObservationDepictions: 'requestObservationDepictions',
};

const ActionFunctions = {
    [ActionNames.RequestMatrixRow]: require('./requestMatrixRow'),
    [ActionNames.RequestObservation]: require('./requestObservation'),
    [ActionNames.RequestDescriptorNotes]: require('./requestDescriptorNotes'),
    [ActionNames.RequestDescriptorDepictions]: require('./requestDescriptorDepictions'),
    [ActionNames.RequestObservationNotes]: require('./requestObservationNotes'),
    [ActionNames.RequestObservationDepictions]: require('./requestObservationDepictions')
};

module.exports = {
    ActionNames,
    ActionFunctions
};