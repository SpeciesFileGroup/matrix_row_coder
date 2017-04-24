module.exports = function(observation, data) {
    Object.assign(observation, data);
    observation.isUnsaved = true;
};