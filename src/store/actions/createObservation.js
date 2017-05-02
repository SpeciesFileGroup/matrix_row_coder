const getObservationFromArgs = require('../helpers/getObservationFromArgs');
const MutationNames = require('../mutations/mutations').MutationNames;

module.exports = function({ commit, state }, args) {
    const observation = getObservationFromArgs(state, args);

    if (observation.id)
        return Promise.resolve();

    commit(MutationNames.SetDescriptorSaving, {
        descriptorId: args.descriptorId,
        isSaving: true
    });

    return state.request.createObservation()
        .then(_ => {
            commit(MutationNames.SetDescriptorSaving, {
                descriptorId: args.descriptorId,
                isSaving: false
            });

            commit(MutationNames.SetDescriptorSavedOnce, args.descriptorId);
        });
};