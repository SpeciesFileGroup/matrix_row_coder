const transformNoteForViewmodel = require('../helpers/transformNoteForViewmodel');

module.exports = function(state, args) {
    const observation = state.observations.find(o => o.id === args.observationId);
    observation.notes = args.notes.map(transformNoteForViewmodel);
};