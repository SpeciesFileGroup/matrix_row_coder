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
        .then(responseData => {
            commit(MutationNames.SetDescriptorSaving, {
                descriptorId: args.descriptorId,
                isSaving: false
            });

            commit(MutationNames.SetDescriptorSavedOnce, args.descriptorId);

            if (isValidResponseData(responseData))
                commit(MutationNames.SetObservationId, makeObservationIdArgs(responseData.id));
        });

    function isValidResponseData(data) {
        return data && data.id;
    }

    function makeObservationIdArgs(observationId) {
        return Object.assign({}, args, { observationId });
    }

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