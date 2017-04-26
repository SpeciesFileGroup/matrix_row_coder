const MutationNames = require('../mutations/mutations').MutationNames;

module.exports = function({ commit, state }, observationId) {
    return Promise.all([
        state.confidenceLevels,
        state.request.getObservationConfidences(observationId)
    ]).then(resolved => {
        const [confidenceLevels, observationConfidences] = resolved;

        const confidences = confidenceLevels.map(cl => {
            return Object.assign({}, cl, { isChecked: confidenceExistsOnObservation(observationConfidences, cl.id) });
        });

        commit(MutationNames.SetObservationConfidences, {
            observationId,
            confidences
        });
    });

    function confidenceExistsOnObservation(observationConfidenceData, confidenceLevelId) {
        return observationConfidenceData
            .findIndex(oc => oc.confidence_level_id === confidenceLevelId) > -1;
    }
};