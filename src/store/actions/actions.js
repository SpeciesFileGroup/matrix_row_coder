const ActionNames = {
    RequestMatrixRow: 'requestMatrixRow',
    RequestObservation: 'requestObservation',
    RequestDescriptorNotes: 'requestDescriptorNotes',
    RequestDescriptorDepictions: 'requestDescriptorDepictions',
    RequestObservationNotes: 'requestObservationNotes'
};

const ActionFunctions = {
    [ActionNames.RequestMatrixRow]: require('./requestMatrixRow'),
    [ActionNames.RequestObservation]: require('./requestObservation'),
    [ActionNames.RequestDescriptorNotes]: require('./requestDescriptorNotes'),
    [ActionNames.RequestDescriptorDepictions]: require('./requestDescriptorDepictions'),
    [ActionNames.RequestObservationNotes]: require('./requestObservationNotes')
};

module.exports = {
    ActionNames,
    ActionFunctions
};