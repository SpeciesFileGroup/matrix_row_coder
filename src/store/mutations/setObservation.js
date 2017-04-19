const ObservationTypes = require('../helpers/ObservationTypes');

module.exports = function(state, observation) {
    if (!observation.type)
        throw `Observations must have a type!`;

    if (Object.keys(ObservationTypes).findIndex(typeKey => ObservationTypes[typeKey] === observation.type) === -1)
        throw `Observations must have a valid type! Given ${observation.type}`;

    if (!state.descriptors.find(d => d.id === observation.descriptorId))
        throw `Observations must have a matching descriptor!`;

    if (observation.type === ObservationTypes.Qualitative && !observation.characterStateId)
        throw `Qualitative Observations must have a character state id!`;

    let indexOfObservation;
    if (observation.type !== ObservationTypes.Qualitative)
        indexOfObservation = state.observations.findIndex(o => o.descriptorId === observation.descriptorId);
    else
        indexOfObservation = state.observations.findIndex(o => o.descriptorId === observation.descriptorId && o.characterStateId === observation.characterStateId);

    if (indexOfObservation > -1)
        state.observations[indexOfObservation] = observation;
    else
        state.observations.push(observation);
};