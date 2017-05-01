const IMatrixRowCoderRequest = require('./IMatrixRowCoderRequest');

const MOCK_REQUEST_DIR = `./mockRequests/`;

require('./mockRequests/matrices-5-row?otu_id=1.json');
require('./mockRequests/confidence-levels.json');
require('./mockRequests/observations?otu_id=1&descriptor_id=24.json');
require('./mockRequests/observations?otu_id=1&descriptor_id=25.json');
require('./mockRequests/observations?otu_id=1&descriptor_id=26.json');
require('./mockRequests/observations?otu_id=1&descriptor_id=27.json');
require('./mockRequests/observations?otu_id=1&descriptor_id=28.json');
require('./mockRequests/observations?otu_id=1&descriptor_id=29.json');
require('./mockRequests/observations?otu_id=1&descriptor_id=30.json');
require('./mockRequests/observations?otu_id=1&descriptor_id=31.json');
require('./mockRequests/descriptors-24-depictions.json');
require('./mockRequests/descriptors-25-depictions.json');
require('./mockRequests/descriptors-26-depictions.json');
require('./mockRequests/descriptors-27-depictions.json');
require('./mockRequests/descriptors-28-depictions.json');
require('./mockRequests/descriptors-29-depictions.json');
require('./mockRequests/descriptors-30-depictions.json');
require('./mockRequests/descriptors-31-depictions.json');
require('./mockRequests/descriptors-24-notes.json');
require('./mockRequests/descriptors-25-notes.json');
require('./mockRequests/descriptors-26-notes.json');
require('./mockRequests/descriptors-27-notes.json');
require('./mockRequests/descriptors-28-notes.json');
require('./mockRequests/descriptors-29-notes.json');
require('./mockRequests/descriptors-30-notes.json');
require('./mockRequests/descriptors-31-notes.json');
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


class MockRequest extends IMatrixRowCoderRequest {
    setApi(args) {
        return null;
    }

    getMatrixRow(matrixId, otuId) {
        return promisify(require(MOCK_REQUEST_DIR + `matrices-${matrixId}-row?otu_id=${otuId}.json`));
    }

    getObservations(otuId, descriptorId) {
        return promisify(require(MOCK_REQUEST_DIR + `observations?otu_id=${otuId}&descriptor_id=${descriptorId}.json`));
    }

    removeObservation(observationId) {
        console.log(`remove observation: ${observationId}`);
        return promisify({ success: true });
    }

    createObservation(payload) {
        console.log('create observation:', payload);
        return promisify({ success: true });
    }

    updateObservation(observationId, payload) {
        console.log(`update observation: ${observationId}`);
        return promisify({ success: true });
    }

    getDescriptorNotes(descriptorId) {
        return promisify(require(MOCK_REQUEST_DIR + `descriptors-${descriptorId}-notes.json`));
    }

    getDescriptorDepictions(descriptorId) {
        return promisify(require(MOCK_REQUEST_DIR + `descriptors-${descriptorId}-depictions.json`));
    }

    getObservationNotes(observationId) {
        return promisify(require(MOCK_REQUEST_DIR + `observations-${observationId}-notes.json`));
    }

    getObservationDepictions(observationId) {
        return promisify(require(MOCK_REQUEST_DIR + `observations-${observationId}-depictions.json`));
    }

    getObservationConfidences(observationId) {
        return promisify(require(MOCK_REQUEST_DIR + `observations-${observationId}-confidences.json`));
    }

    getObservationCitations(observationId) {
        return promisify(require(MOCK_REQUEST_DIR + `observations-${observationId}-citations.json`));
    }

    getConfidenceLevels() {
        return promisify(require(MOCK_REQUEST_DIR + `confidence-levels.json`));
    }
}

function promisify(data) {
    return new Promise(resolve => resolve(data));
}

module.exports = MockRequest;