const transformDepictionForViewmodel = require('../helpers/transformDepictionForViewmodel');

module.exports = function(state, args) {
    const observation = state.observations.find(o => o.id === args.observationId);
    observation.depictions = args.depictions.map(transformDepictionForViewmodel);
};