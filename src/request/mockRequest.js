const MOCK_REQUEST_DIR = `./mockRequests/`;

module.exports = {
    getMatrixRow(url) {
        return promisify(require(MOCK_REQUEST_DIR + url));
    },
    getObservations(otuId, descriptorId) {
        return promisify(require(MOCK_REQUEST_DIR + `observations?otu_id=${otuId}&descriptor_id=${descriptorId}.json`));
    },
    getDescriptorNotes(descriptorId) {
        return promisify(require(MOCK_REQUEST_DIR + `descriptors-${descriptorId}-notes.json`));
    },
    getDescriptorDepictions(descriptorId) {
        return promisify(require(MOCK_REQUEST_DIR + `descriptors-${descriptorId}-depictions.json`));
    },
    getObservationNotes(observationId) {
        return promisify(require(MOCK_REQUEST_DIR + `observations-${observationId}-notes.json`));
    },
    getObservationDepictions(observationId) {
        return promisify(require(MOCK_REQUEST_DIR + `observations-${observationId}-depictions.json`));
    },
    getObservationConfidences(observationId) {
        return promisify(require(MOCK_REQUEST_DIR + `observations-${observationId}-confidences.json`));
    },
    getObservationCitations(observationId) {
        return promisify(require(MOCK_REQUEST_DIR + `observations-${observationId}-citations.json`));
    },
    getConfidenceLevels() {
        return promisify(require(MOCK_REQUEST_DIR + `confidence_levels.json`));
    }
};

function promisify(data) {
    return new Promise(resolve => resolve(data));
}