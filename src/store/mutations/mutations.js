const MutationNames = {
    SetDescriptors: 'setDescriptors'
};

const MutationFunctions = {
    [MutationNames.SetDescriptors]: require('./setDescriptors')
};

module.exports = {
    MutationNames,
    MutationFunctions
};