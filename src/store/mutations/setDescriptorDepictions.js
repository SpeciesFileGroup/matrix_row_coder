const transformDepictionForViewmodel = require('../helpers/transformDepictionForViewmodel');

module.exports = function(state, args) {
    const descriptor = state.descriptors.find(d => d.id === args.descriptorId);
    descriptor.depictions = args.depictions.map(transformDepictionForViewmodel);
};