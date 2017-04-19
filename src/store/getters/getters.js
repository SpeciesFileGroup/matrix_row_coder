const GetterNames = {
    GetObservationsFor: 'getObservationsFor',
    GetContinuousValueFor: 'getContinuousValueFor',
    GetContinuousUnitFor: 'getContinuousUnitFor',
    GetPresenceFor: 'getPresenceFor'
};

const GetterFunctions = {
    [GetterNames.GetObservationsFor]: require('./getObservationsFor'),
    [GetterNames.GetContinuousValueFor]: require('./getContinuousValueFor'),
    [GetterNames.GetContinuousUnitFor]: require('./getContinuousUnitFor'),
    [GetterNames.GetPresenceFor]: require('./getPresenceFor')
};

module.exports = {
    GetterNames,
    GetterFunctions
};