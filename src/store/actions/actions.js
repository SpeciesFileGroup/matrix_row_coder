const ActionNames = require('./actionNames');

const ActionFunctions = {
    [ActionNames.RequestMatrixRow]: require('./requestMatrixRow'),
    [ActionNames.RequestConfidenceLevels]: require('./requestConfidenceLevels'),
    [ActionNames.RequestObservations]: require('./requestObservations'),
    [ActionNames.RequestDescriptorNotes]: require('./requestDescriptorNotes'),
    [ActionNames.RequestDescriptorDepictions]: require('./requestDescriptorDepictions'),
    [ActionNames.RequestObservationNotes]: require('./requestObservationNotes'),
    [ActionNames.RequestObservationDepictions]: require('./requestObservationDepictions'),
    [ActionNames.RequestObservationConfidences]: require('./requestObservationConfidences'),
    [ActionNames.RequestObservationCitations]: require('./requestObservationCitations'),
    [ActionNames.RemoveObservation]: require('./removeObservation'),
    [ActionNames.UpdateObservation]: require('./updateObservation'),
    [ActionNames.CreateObservation]: require('./createObservation'),
    [ActionNames.SaveObservationsFor]: require('./saveObservationsFor')
};

module.exports = {
    ActionNames,
    ActionFunctions
};