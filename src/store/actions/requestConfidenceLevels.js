const MutationNames = require('../mutations/mutations').MutationNames;

module.exports = function({ commit, state }) {
    commit(MutationNames.SetConfidenceLevels, state.request.getConfidenceLevels());
};