const ActionNames = {
    RequestDescriptors: 'requestDescriptors'
};

const ActionFunctions = {
    [ActionNames.RequestDescriptors]: require('./requestDescriptors')
};

module.exports = {
    ActionNames,
    ActionFunctions
};