const GetterNames = {
    GetObservationsFor: 'getObservationsFor',
    GetContinuousValueFor: 'getContinuousValueFor',
    GetContinuousUnitFor: 'getContinuousUnitFor',
    GetPresenceFor: 'getPresenceFor',
    GetSampleMinFor: 'getSampleMinFor',
    GetSampleMaxFor: 'getSampleMaxFor',
    GetSampleUnitFor: 'getSampleUnitFor',
    GetSampleNFor: 'getSampleNFor',
    GetCharacterStateChecked: `getCharacterStateChecked`,
    IsDescriptorObservationsUnsaved: 'isDescriptorObservationsUnsaved'
};

const GetterFunctions = {
    [GetterNames.GetObservationsFor]: require('./getObservationsFor'),
    [GetterNames.GetContinuousValueFor]: require('./getContinuousValueFor'),
    [GetterNames.GetContinuousUnitFor]: require('./getContinuousUnitFor'),
    [GetterNames.GetPresenceFor]: require('./getPresenceFor'),
    [GetterNames.GetSampleMinFor]: require('./getSampleMinFor'),
    [GetterNames.GetSampleMaxFor]: require('./getSampleMaxFor'),
    [GetterNames.GetSampleUnitFor]: require('./getSampleUnitFor'),
    [GetterNames.GetSampleNFor]: require('./getSampleNFor'),
    [GetterNames.GetCharacterStateChecked]: require('./getCharacterStateChecked'),
    [GetterNames.IsDescriptorObservationsUnsaved]: require('./isDescriptorObservationsUnsaved')
};

module.exports = {
    GetterNames,
    GetterFunctions
};