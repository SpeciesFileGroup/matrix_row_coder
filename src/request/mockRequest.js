const MOCK_REQUEST_DIR = `./mockRequests/`;

require('./mockRequests/matrix-row.json');
require('./mockRequests/confidence-levels.json');
require('./mockRequests/observations?otu_id=1&descriptor_id=24.json');
require('./mockRequests/observations?otu_id=1&descriptor_id=25.json');
require('./mockRequests/observations?otu_id=1&descriptor_id=26.json');
require('./mockRequests/observations?otu_id=1&descriptor_id=27.json');
require('./mockRequests/descriptors-24-depictions.json');
require('./mockRequests/descriptors-25-depictions.json');
require('./mockRequests/descriptors-26-depictions.json');
require('./mockRequests/descriptors-27-depictions.json');
require('./mockRequests/descriptors-24-notes.json');
require('./mockRequests/descriptors-25-notes.json');
require('./mockRequests/descriptors-26-notes.json');
require('./mockRequests/descriptors-27-notes.json');
require('./mockRequests/observations-1001-citations.json');
require('./mockRequests/observations-1002-citations.json');
require('./mockRequests/observations-1003-citations.json');
require('./mockRequests/observations-1004-citations.json');
require('./mockRequests/observations-1001-confidences.json');
require('./mockRequests/observations-1002-confidences.json');
require('./mockRequests/observations-1003-confidences.json');
require('./mockRequests/observations-1004-confidences.json');
require('./mockRequests/observations-1001-depictions.json');
require('./mockRequests/observations-1002-depictions.json');
require('./mockRequests/observations-1003-depictions.json');
require('./mockRequests/observations-1004-depictions.json');
require('./mockRequests/observations-1001-notes.json');
require('./mockRequests/observations-1002-notes.json');
require('./mockRequests/observations-1003-notes.json');
require('./mockRequests/observations-1004-notes.json');

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
        return promisify(require(MOCK_REQUEST_DIR + `confidence-levels.json`));
    }
};

function promisify(data) {
    return new Promise(resolve => resolve(data));
}