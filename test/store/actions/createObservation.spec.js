const expect = require('chai').expect;
const ActionNames = require('../../../src/store/actions/actions').ActionNames;
const ObservationTypes = require('../../../src/store/helpers/ObservationTypes');
const TestHelpers = require('../../testHelpers');

describe(`CreateObservation action`, () => {
    let store;

    function makePromiseChainFromArgsAndAsserts(argsAndAsserts) {
        return argsAndAsserts.reduce((accumulator, next) => {
            return accumulator.then(_ => {
                store.state.request.createObservation = next.assertFunction;
                return store.dispatch(ActionNames.CreateObservation, next.args);
            });
        }, Promise.resolve());
    }

    function makeArgs(observation) {
        const args = { descriptorId: observation.descriptorId };
        if (observation.characterStateId)
            args.characterStateId = observation.characterStateId;
        return args;
    }

    function forEachUncreatedObservation(callback) {
        store.state.observations.forEach(o => {
            if (!o.id)
                callback(o);
        });
    }

    before(done => {
        store = TestHelpers.newTestStore();
        TestHelpers.requestMatrixRowForStore(store)
            .then(_ => TestHelpers.requestAllObservationsForStore(store))
            .then(_ => done());
    });

    it(`should call the createObservation method on the request module`, () => {
        let timesCalled = 0;

        store.state.request.createObservation = function() {
            timesCalled++;
            return Promise.resolve({});
        };

        return store.dispatch(ActionNames.CreateObservation, {
            descriptorId: 24,
            characterStateId: 34
        }).then(_ => {
            expect(timesCalled).to.equal(1);
        });
    });

    it(`should do nothing if unsaved observations have an id`, () => {
        let timesCalled = 0;

        store.state.request.createObservation = function() {
            timesCalled++;
            return Promise.resolve({});
        };

        return store.dispatch(ActionNames.CreateObservation, {
            descriptorId: 24,
            characterStateId: 33
        }).then(_ => {
            expect(timesCalled).to.equal(0);
        });
    });

    it(`should set the correct saving flags for the request`, () => {
        store.state.request.createObservation = function() {
            return new Promise(resolve => {
                setTimeout(_ => {
                    resolve();
                }, 50);
            });
        };

        const descriptorId = 24;

        const createPromise = store.dispatch(ActionNames.CreateObservation, {
            descriptorId,
            characterStateId: 34
        });

        expect(store.state.descriptors.find(d => d.id === descriptorId).isSaving).to.equal(true);

        return createPromise
            .then(_ => {
                expect(store.state.descriptors.find(d => d.id === descriptorId).isSaving).to.equal(false);
                expect(store.state.descriptors.find(d => d.id === descriptorId).hasSavedAtLeastOnce).to.equal(true);
            });
    });

    it(`should always include the descriptor id in the payload`, () => {
        const argsAndAsserts = [];

        forEachUncreatedObservation(o => {
            const descriptorId = o.descriptorId;

            const assertFunction = function(payload) {
                expect(payload.descriptor_id).to.equal(descriptorId);
                return Promise.resolve({});
            };

            argsAndAsserts.push({ args: makeArgs(o), assertFunction })
        });

        return makePromiseChainFromArgsAndAsserts(argsAndAsserts);
    });

    it(`should always include the otu id in the payload`, () => {
        const argsAndAsserts = [];

        forEachUncreatedObservation(o => {
            const assertFunction = function(payload) {
                expect(payload.otu_id).to.equal(store.state.taxonId);
                return Promise.resolve({});
            };

            argsAndAsserts.push({ args: makeArgs(o), assertFunction })
        });

        return makePromiseChainFromArgsAndAsserts(argsAndAsserts);
    });

    describe(`Qualitative observations`, () => {
        it(`should include the correct observation type`, () => {
            const descriptorId = 29;
            const characterStateId = 35;

            store.state.request.createObservation = function(payload) {
                expect(payload.type).to.equal(ObservationTypes.Qualitative);
                return Promise.resolve({});
            };

            return store.dispatch(ActionNames.CreateObservation, { descriptorId, characterStateId });
        });

        it(`should include the character state`, () => {
            const descriptorId = 29;
            const characterStateId = 35;

            store.state.request.createObservation = function(payload) {
                expect(payload.character_state_id).to.equal(characterStateId);
                return Promise.resolve({});
            };

            return store.dispatch(ActionNames.CreateObservation, { descriptorId, characterStateId });
        });
    });

    describe(`Presence observations`, () => {
        it(`should include the correct observation type`, () => {
            const descriptorId = 30;

            store.state.request.createObservation = function(payload) {
                expect(payload.type).to.equal(ObservationTypes.Presence);
                return Promise.resolve({});
            };

            return store.dispatch(ActionNames.CreateObservation, { descriptorId });
        });

        it(`should not include a character state id`, () => {
            const descriptorId = 30;

            store.state.request.createObservation = function(payload) {
                expect(payload.hasOwnProperty(`character_state_id`)).to.equal(false);
                return Promise.resolve({});
            };

            return store.dispatch(ActionNames.CreateObservation, { descriptorId });
        });
    });

    describe(`Continuous observations`, () => {
        it(`should include the correct observation type`, () => {
            const descriptorId = 28;

            store.state.request.createObservation = function(payload) {
                expect(payload.type).to.equal(ObservationTypes.Continuous);
                return Promise.resolve({});
            };

            return store.dispatch(ActionNames.CreateObservation, { descriptorId });
        });
    });

    describe(`Sample observations`, () => {
        it(`should include the correct observation type`, () => {
            const descriptorId = 31;

            store.state.request.createObservation = function(payload) {
                expect(payload.type).to.equal(ObservationTypes.Sample);
                return Promise.resolve({});
            };

            return store.dispatch(ActionNames.CreateObservation, { descriptorId });
        });
    });
});