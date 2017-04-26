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
    constructor({ apiBase, apiParams }) {
        super();
        this.apiBase = apiBase;
        this.apiParams = apiParams;
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