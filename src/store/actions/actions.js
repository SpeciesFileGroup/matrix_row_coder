const ActionNames = {
    RequestMatrixRow: 'requestMatrixRow',
    RequestObservation: 'requestObservation',
    RequestDescriptorNotes: 'requestDescriptorNotes',
    RequestDescriptorDepictions: 'requestDescriptorDepictions'
};

const ActionFunctions = {
    [ActionNames.RequestMatrixRow]: require('./requestMatrixRow'),
    [ActionNames.RequestObservation]: require('./requestObservation'),
    [ActionNames.RequestDescriptorNotes]: require('./requestDescriptorNotes'),
    [ActionNames.RequestDescriptorDepictions]: require('./requestDescriptorDepictions')
};

module.exports = {
    ActionNames,
    ActionFunctions
};