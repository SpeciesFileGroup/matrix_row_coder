const MOCK_REQUEST_DIR = `./mockRequests/`;

module.exports = {
    getMatrixRow(url) {
        return MOCK_REQUEST_DIR + url;
    }
};