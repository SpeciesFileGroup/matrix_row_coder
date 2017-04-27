const IMatrixRowCoderRequest = require('./IMatrixRowCoderRequest');

function getJSON(url) {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open('GET', url, true);

        request.onload = function() {
            if (request.status >= 200 && request.status < 400)
                resolve(JSON.parse(request.responseText));
            else
                reject(request.status);
        };

        request.onerror = function() {
            reject('An error happened');
        };

        request.send();
    });
}


class MatrixRowCoderRequest extends IMatrixRowCoderRequest {
    setApi({ apiBase, apiParams }) {
        this.apiBase = apiBase;
        this.apiParams = apiParams;
    }

    getMatrixRow(matrixId, otuId) {
        const params = Object.assign({
            otu_id: otuId
        }, this.apiParams);

        const url = `${this.apiBase}/matrices/${matrixId}/row.json${MatrixRowCoderRequest.stringifyApiParams(params)}`;
        return getJSON(url);
    }

    getObservations(otuId, descriptorId) {
        const params = Object.assign({
            otu_id: otuId,
            descriptor_id: descriptorId
        }, this.apiParams);

        const url = `${this.apiBase}/observations.json${MatrixRowCoderRequest.stringifyApiParams(params)}`;
        return getJSON(url);
    }

    getDescriptorNotes(descriptorId) {
        const url = `${this.apiBase}/descriptors/${descriptorId}/notes.json${MatrixRowCoderRequest.stringifyApiParams(this.apiParams)}`;
        return getJSON(url);
    }

    getDescriptorDepictions(descriptorId) {
        const url = `${this.apiBase}/descriptors/${descriptorId}/depictions.json${MatrixRowCoderRequest.stringifyApiParams(this.apiParams)}`;
        return getJSON(url);
    }

    getObservationNotes(observationId) {
        const url = `${this.apiBase}/observations/${observationId}/notes.json${MatrixRowCoderRequest.stringifyApiParams(this.apiParams)}`;
        return getJSON(url);
    }

    getObservationDepictions(observationId) {
        const url = `${this.apiBase}/observations/${observationId}/depictions.json${MatrixRowCoderRequest.stringifyApiParams(this.apiParams)}`;
        return getJSON(url);
    }

    getObservationConfidences(observationId) {
        const url = `${this.apiBase}/observations/${observationId}/confidences.json${MatrixRowCoderRequest.stringifyApiParams(this.apiParams)}`;
        return getJSON(url);
    }

    getObservationCitations(observationId) {
        const url = `${this.apiBase}/observations/${observationId}/citations.json${MatrixRowCoderRequest.stringifyApiParams(this.apiParams)}`;
        return getJSON(url);
    }

    getConfidenceLevels() {
        return getJSON(`${this.apiBase}/confidence_levels.json${MatrixRowCoderRequest.stringifyApiParams(this.apiParams)}`);
    }

    static stringifyApiParams(object) {
        return Object.keys(object).reduce((accumulated, property, currentIndex, array) => {
            return `${accumulated}${ getPropertyPrefix(currentIndex, array.length) }${property}=${object[property]}`;
        }, '');

        function getPropertyPrefix(index, length) {
            if (index === 0)
                return '?';
            else
                return '&';
        }
    }
}

module.exports = MatrixRowCoderRequest;