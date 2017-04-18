const makeBaseObservation = require('./makeBaseObservation');

module.exports = function(observationData) {
    const observation = makeBaseObservation(observationData);
    observation.characterStateId = observationData.characterStateId;
    return observation;
};