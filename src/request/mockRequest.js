const DescriptorsPayload = require('./mockRequests/descriptors.json');

module.exports = {
    getDescriptors() {
        return new Promise(resolve => {
            resolve(DescriptorsPayload);
        });
    }
};