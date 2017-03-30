const DescriptorsPayload = require('./mockRequests/descriptors.json');
const Observation1001 = require('./mockRequests/observation-1001.json');
const Observation1002 = require('./mockRequests/observation-1002.json');
const Observation1003 = require('./mockRequests/observation-1003.json');
const Observation1004 = require('./mockRequests/observation-1004.json');

module.exports = {
    getDescriptors() {
        return new Promise(resolve => {
            resolve(DescriptorsPayload);
        });
    },
    getObservationAt(url) {
        return new Promise(resolve => {
            if (url === "observation-1001.json")
                resolve(Observation1001);
            else if (url === "observation-1002.json")
                resolve(Observation1002);
            else if (url === "observation-1003.json")
                resolve(Observation1003);
            else if (url === "observation-1004.json")
                resolve(Observation1004);
        });
    }
};