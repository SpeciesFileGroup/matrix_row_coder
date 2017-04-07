const MOCK_REQUEST_DIR = `./mockRequests/`;

module.exports = {
    getMatrixRow(url) {
        return require(MOCK_REQUEST_DIR + url);
    },
    getObservation(otuId, descriptorId) {
        return require(MOCK_REQUEST_DIR + `observations?otu_id=${otuId}&descriptor_id=${descriptorId}.json`);
    },
    getDescriptorNotes(descriptorId) {
        return require(MOCK_REQUEST_DIR + `descriptors/${descriptorId}/notes.json`);
    },
    getDescriptorDepictions(descriptorId) {
        return require(MOCK_REQUEST_DIR + `descriptors/${descriptorId}/depictions.json`);
    },
    getObservationNotes(observationId) {
        return require(MOCK_REQUEST_DIR + `observations/${observationId}/notes.json`);
    },
    getObservationDepictions(observationId) {
        return require(MOCK_REQUEST_DIR + `observations/${observationId}/depictions.json`);
    },
    getObservationConfidences(observationId) {
        return require(MOCK_REQUEST_DIR + `observations/${observationId}/confidences.json`);
    },
    getObservationCitations(observationId) {
        return require(MOCK_REQUEST_DIR + `observations/${observationId}/citations.json`);
    },
    getConfidenceLevels() {
        return require(MOCK_REQUEST_DIR + `confidence_levels.json`);
    }
};