const mockRequest = require('../../request/mockRequest');
const MutationNames = require('../mutations/mutations').MutationNames;

module.exports = function({ commit }) {
    return mockRequest.getConfidenceLevels()
        .then(confidenceLevelData => {
            commit(MutationNames.SetConfidenceLevels, confidenceLevelData);
        });
};