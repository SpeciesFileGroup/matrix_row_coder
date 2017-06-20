import ObservationTypes from '../helpers/ObservationTypes';
import ComponentNames from '../helpers/ComponentNames';
import { MutationNames } from '../mutations/mutations';

export default function({state, commit}, descriptorId) {
    const descriptor = state.descriptors.find(d => d.id === descriptorId);

    if (isNotUpdatable(descriptor.componentName))
        throw `You can't update a ${getDescriptorTypeName(descriptor.componentName)} descriptor. You can only delete or create them.`;

    const observation = state.observations.find(o => o.descriptorId === descriptorId);

    commit(MutationNames.SetDescriptorSaving, {
        descriptorId,
        isSaving: true
    });

    return state.request.updateObservation(observation.id, makePayload(observation))
        .then(_ => {
            commit(MutationNames.SetDescriptorSaving, {
                descriptorId,
                isSaving: false
            });

            commit(MutationNames.SetDescriptorSavedOnce, descriptorId);
        });
};

function isNotUpdatable(componentName) {
    return componentName === ComponentNames.Qualitative;
}

function makePayload(observation) {
    if (observation.type === ObservationTypes.Continuous)
        return {
            continuous_value: observation.continuousValue,
            continuous_unit: observation.continuousUnit
        };
    else if (observation.type === ObservationTypes.Sample)
        return {
            sample_n: observation.n,
            sample_min: observation.min,
            sample_max: observation.max,
            sample_units: observation.units,
            sample_median: observation.median,
            sample_mean: observation.mean,
            sample_standard_deviation: observation.standardDeviation,
            sample_standard_error: observation.standardError
        };
    else if (observation.type === ObservationTypes.Presence)
        return {
            presence: observation.isChecked
        };
}

function getDescriptorTypeName(componentName) {
    if (componentName === ComponentNames.Qualitative)
        return `Qualitative`;
}