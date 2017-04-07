const ActionNames = {
    RequestMatrixRow: 'requestMatrixRow',
    RequestObservation: 'requestObservation'
};

const ActionFunctions = {
    [ActionNames.RequestMatrixRow]: require('./requestMatrixRow'),
    [ActionNames.RequestObservation]: require('./requestObservation')
};

module.exports = {
    ActionNames,
    ActionFunctions
};