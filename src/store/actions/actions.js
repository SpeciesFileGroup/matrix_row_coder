const ActionNames = {
    RequestMatrixRow: 'requestMatrixRow',
    RequestObservation: 'requestObservation',
    RequestDescriptorNotes: 'requestDescriptorNotes'
};

const ActionFunctions = {
    [ActionNames.RequestMatrixRow]: require('./requestMatrixRow'),
    [ActionNames.RequestObservation]: require('./requestObservation'),
    [ActionNames.RequestDescriptorNotes]: require('./requestDescriptorNotes')
};

module.exports = {
    ActionNames,
    ActionFunctions
};