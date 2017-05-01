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

function postJSON(url, payload) {
    return new Promise(resolve => {
        const request = new XMLHttpRequest();
        request.addEventListener('readystatechange', function(e) {
            if( this.readyState === 4 )
                resolve();
        });
        request.open('POST', url, true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.send(payload);
    });
}

function deleteResource(url) {

}

class MatrixRowCoderRequest extends IMatrixRowCoderRequest {
    setApi({apiBase, apiParams}) {
        this.apiBase = apiBase;
        this.apiParams = apiParams;
    }

    buildGetUrl(url, extraParams = {}) {
        return `${this.apiBase}${url}${MatrixRowCoderRequest.stringifyApiParams(Object.assign({}, this.apiParams, extraParams))}`;
    }

    static stringifyApiParams(object) {
        return Object.keys(object).reduce((accumulated, property, currentIndex) => {
            return `${accumulated}${ getPropertyPrefix(currentIndex) }${property}=${object[property]}`;
        }, '');

        function getPropertyPrefix(index) {
            if (index === 0)
                return '?';
            else
                return '&';
        }
    }

    getMatrixRow(matrixId, otuId) {
        const extraParams = { otu_id: otuId };
        const url = this.buildGetUrl(`/matrices/${matrixId}/row.json`, extraParams);
        return getJSON(url)
            .then(data => {
                console.log(`getMatrixRow:`, data);
                return data;
            });
    }

    getObservations(otuId, descriptorId) {
        const extraParams = {
            otu_id: otuId,
            descriptor_id: descriptorId
        };
        const url = this.buildGetUrl(`/observations.json`, extraParams);
        return getJSON(url)
            .then(data => {
                console.log(`Observations for ${descriptorId}:`, data);
                return data;
            });
    }

    updateObservation(observationId, payload) {
        const url = `/observations/${observationId}.json`;
        return postJSON(url, Object.assign(payload, this.apiParams));
    }

    createObservation(payload) {

    }

    removeObservation(observationId) {
        const url = `/observations/${observationId}.json`;
        return deleteResource(url);
    }

    getDescriptorNotes(descriptorId) {
        const url = this.buildGetUrl(`/descriptors/${descriptorId}/notes.json`);
        return getJSON(url);
    }

    getDescriptorDepictions(descriptorId) {
        const url = this.buildGetUrl(`/descriptors/${descriptorId}/depictions.json`);
        return getJSON(url);
    }

    getObservationNotes(observationId) {
        const url = this.buildGetUrl(`/observations/${observationId}/notes.json`);
        return getJSON(url);
    }

    getObservationDepictions(observationId) {
        const url = this.buildGetUrl(`/observations/${observationId}/depictions.json`);
        return getJSON(url);
    }

    getObservationConfidences(observationId) {
        const url = this.buildGetUrl(`/observations/${observationId}/confidences.json`);
        return getJSON(url);
    }

    getObservationCitations(observationId) {
        const url = this.buildGetUrl(`/observations/${observationId}/citations.json`);
        return getJSON(url);
    }

    getConfidenceLevels() {
        const url = this.buildGetUrl(`/confidence_levels.json`);
        return getJSON(url);
    }
}

module.exports = MatrixRowCoderRequest;