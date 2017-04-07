module.exports = function(state, args) {
    state.descriptors.find(d => d.id === args.descriptorId)
        .notes = args.notes.map(transformNoteForViewmodel)
};

function transformNoteForViewmodel(note) {
    return {
        text: note.text,
        noteIsFor: note.note_object_id,
        noteIsForA: note.note_object_type
    };
}