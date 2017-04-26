const expect = require('chai').expect;
const ActionNames = require('../../../src/store/actions/actions').ActionNames;
const TestHelpers = require('../../testHelpers');
const store = TestHelpers.newTestStore();

const observationIds = [1001, 1002, 1003, 1004];

describe(`RequestObservationConfidences action`, () => {
    let confidenceLevels;

    before(done => {
        TestHelpers.requestMatrixRowForStore(store)
            .then(_ => TestHelpers.requestConfidenceLevelsForStore(store))
            .then(_ => store.state.confidenceLevels)
            .then(cls => confidenceLevels = cls)
            .then(_ => TestHelpers.requestAllObservationsForStore(store))
            .then(_ => Promise.all(observationIds.map(oId => store.dispatch(ActionNames.RequestObservationConfidences, oId))))
            .then(_ => done());
    });

    it(`should request the confidences for an observation`, () => {
        observationIds.forEach(oId => {
            const observation = store.state.observations.find(o => o.id === oId);
            expect(observation.confidences).to.be.an('array');
        });
    });

    it(`should copy all confidence levels to the observation`, () => {
        observationIds.forEach(oId => {
            const observation = store.state.observations.find(o => o.id === oId);
            expect(observation.confidences).to.have.lengthOf(confidenceLevels.length);
            observation.confidences.forEach((confidenceLevelOnObservation, index) => {
                expect(confidenceLevelOnObservation).to.not.equal(confidenceLevels[index]);
                expect(confidenceLevelOnObservation.id).to.equal(confidenceLevels[index].id);
                expect(confidenceLevelOnObservation.name).to.equal(confidenceLevels[index].name);
                expect(confidenceLevelOnObservation.definition).to.equal(confidenceLevels[index].definition);
                expect(confidenceLevelOnObservation.color).to.equal(confidenceLevels[index].color);
            });
        });
    });

    it(`should request the confidences for an observation and set a definition hash`, () => {
        const defaultConfidencesByObservation = {
            5001: false,
            5002: false,
            5003: false,
            5004: false
        };

        const expectedConfidences = {
            1001: Object.assign({}, defaultConfidencesByObservation, { 5001: true }),
            1002: Object.assign({}, defaultConfidencesByObservation, { 5001: true, 5003: true }),
            1003: Object.assign({}, defaultConfidencesByObservation),
            1004: Object.assign({}, defaultConfidencesByObservation)
        };

        observationIds.forEach(oId => {
            const observation = store.state.observations.find(o => o.id === oId);
            observation.confidences.forEach(confidence => {
                expect(confidence.isChecked).to.equal(expectedConfidences[oId][confidence.id]);
            });
        });
    });
});