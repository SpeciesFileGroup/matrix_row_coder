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

    const payload = {
        // descriptor_id: 2,
        // character_state_id: 854,
        // project_id: 1,
        // otu_id: 1,
        // token: "T2LDAEltkiZ27wqBgwPJ9w",
        // type: "Observation::Qualitative"
    };

    return state.request.createObservation(payload)
        .then(_ => {
            commit(MutationNames.SetDescriptorSaving, {
                descriptorId: args.descriptorId,
                isSaving: false
            });

            commit(MutationNames.SetDescriptorSavedOnce, args.descriptorId);
        });
};