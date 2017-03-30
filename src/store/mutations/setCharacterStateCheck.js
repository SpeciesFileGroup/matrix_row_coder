module.exports = function(state, args) {
    state.descriptors.forEach(d => {
        if (d.characterStates) {
            d.characterStates.forEach(cs => {
                if (cs.id === args.id)
                    cs.isChecked = args.isChecked;
            });
        }
    });
};