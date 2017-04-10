module.exports = function(note) {
    return {
        text: note.text,
        noteIsFor: note.note_object_id,
        noteIsForA: note.note_object_type
    };
};