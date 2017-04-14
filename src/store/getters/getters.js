const GetterNames = {
    GetObservationsFor: 'getObservationsFor',
    GetContinuousValueFor: 'getContinuousValueFor',
    GetContinuousUnitFor: 'getContinuousUnitFor'
};

const GetterFunctions = {
    [GetterNames.GetObservationsFor]: require('./getObservationsFor'),
    [GetterNames.GetContinuousValueFor]: require('./getContinuousValueFor'),
    [GetterNames.GetContinuousUnitFor]: require('./getContinuousUnitFor')
};

module.exports = {
    GetterNames,
    GetterFunctions
};