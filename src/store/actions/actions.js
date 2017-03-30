const ActionNames = {
    RequestDescriptors: 'requestDescriptors',
    RequestObservation: 'requestObservation'
};

const ActionFunctions = {
    [ActionNames.RequestDescriptors]: require('./requestDescriptors'),
    [ActionNames.RequestObservation]: require('./requestObservation')
};

module.exports = {
    ActionNames,
    ActionFunctions
};