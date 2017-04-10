const transformNoteForViewmodel = require('../helpers/transformNoteForViewmodel');

module.exports = function(state, args) {
    state.descriptors.find(d => d.id === args.descriptorId)
        .notes = args.notes.map(transformNoteForViewmodel)
};