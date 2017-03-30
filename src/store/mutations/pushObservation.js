module.exports = function(state, observation) {
    state.descriptors.forEach(d => {
        if (d.id === observation.descriptorId)
            d.observations.push(observation);
    });
};