import getObservationFromArgs from '../helpers/getObservationFromArgs';
import ObservationTypes from '../helpers/ObservationTypes';
import { MutationNames } from '../mutations/mutations';

export default function({ commit, state }, args) {
    const observation = getObservationFromArgs(state, args);

    if (observation.id)
        return Promise.resolve();

    commit(MutationNames.SetDescriptorSaving, {
        descriptorId: args.descriptorId,
        isSaving: true
    });

    const payload = makeBasePayload();

    if (observation.type === ObservationTypes.Qualitative)
        setupQualitativePayload(payload);

    return state.request.createObservation(payload)
        .then(_ => {
            commit(MutationNames.SetDescriptorSaving, {
                descriptorId: args.descriptorId,
                isSaving: false
            });

            commit(MutationNames.SetDescriptorSavedOnce, args.descriptorId);
        });

    function setupQualitativePayload(payload) {
        return Object.assign(payload, { character_state_id: args.characterStateId });
    }

    function makeBasePayload() {
        return {
            descriptor_id: args.descriptorId,
            otu_id: state.taxonId,
            type: observation.type
        }
    }
};