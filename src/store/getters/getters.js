const GetterNames = {
    GetObservationsForDescriptorId: 'getObservationsForDescriptorId'
};

const GetterFunctions = {
    [GetterNames.GetObservationsForDescriptorId]: require('./getObservationsForDescriptorId')
};

module.exports = {
    GetterNames,
    GetterFunctions
};