import mergeIntoObservation from '../helpers/mergeIntoObservation';
import setDescriptorUnsaved from '../helpers/setDescriptorUnsaved';

export default function(state, args) {
    const {
        descriptorId,
        units
    } = args;

    mergeIntoObservation(state.observations.find(o => o.descriptorId === descriptorId), { units });
    setDescriptorUnsaved(state.descriptors.find(d => d.id === descriptorId));
};