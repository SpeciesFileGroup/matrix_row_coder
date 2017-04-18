const makeBaseObservation = require('./makeBaseObservation');

module.exports = function(observationData) {
    const observation = makeBaseObservation(observationData);
    return Object.assign(observation, {
        characterStateId: observationData.characterStateId,
        isChecked: false
    });
};