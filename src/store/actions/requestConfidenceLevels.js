const mockRequest = require('../../request/mockRequest');
const MutationNames = require('../mutations/mutations').MutationNames;

module.exports = function({ commit }) {
    commit(MutationNames.SetConfidenceLevels, mockRequest.getConfidenceLevels());
};