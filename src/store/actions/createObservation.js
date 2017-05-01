const getObservationFromArgs = require('../helpers/getObservationFromArgs');

module.exports = function({ commit, state }, args) {
    const observation = getObservationFromArgs(state, args);

    if (observation.id)
        return Promise.resolve();

    return state.request.createObservation();
};