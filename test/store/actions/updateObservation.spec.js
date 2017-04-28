const expect = require('chai').expect;
const ActionNames = require('../../../src/store/actions/actions').ActionNames;
const MutationNames = require('../../../src/store/mutations/mutations').MutationNames;
const TestHelpers = require('../../testHelpers');

describe(`UpdateObservation action`, () => {
    let store;

    before(done => {
        store = TestHelpers.newTestStore();
        TestHelpers.requestMatrixRowForStore(store)
            .then(_ => TestHelpers.requestAllObservationsForStore(store))
            .then(_ => done());
    });

    it(`should call the update method on the request module`, () => {
        let timesCalled = 0;

        store.state.request.updateObservation = function() {
            timesCalled += 1;
            return Promise.resolve({});
        };

        return store.dispatch(ActionNames.UpdateObservation, 1002)
            .then(_ => {
                expect(timesCalled).to.equal(1);
            });
    });

    describe(`Continuous Observations`, () => {
        it(`should include the new continuous value`, () => {
            const observationId = 1002;

            const expectedContinuousValue = 500;

            store.commit(MutationNames.SetContinuousValue, {
                descriptorId: 26,
                continuousValue: expectedContinuousValue
            });

            store.state.request.updateObservation = function(oIdArg, payload) {
                expect(oIdArg).to.equal(observationId);
                expect(payload.continuous_value).to.equal(expectedContinuousValue);
            };

            return store.dispatch(ActionNames.UpdateObservation, observationId);
        });

        it(`should include the new continuous unit`, () => {
            const observationId = 1002;

            const expectedContinuousUnit = "cm";

            store.commit(MutationNames.SetContinuousUnit, {
                descriptorId: 26,
                continuousUnit: expectedContinuousUnit
            });

            store.state.request.updateObservation = function(oIdArg, payload) {
                expect(oIdArg).to.equal(observationId);
                expect(payload.continuous_unit).to.equal(expectedContinuousUnit);
            };

            return store.dispatch(ActionNames.UpdateObservation, observationId);
        });
    });

    describe(`Sample Observations`, () => {
        it(`should include the sample properties`, () => {
            const observationId = 1003;
            const descriptorId = 27;

            store.commit(MutationNames.SetSampleMinFor, {
                descriptorId,
                min: 5
            });

            store.commit(MutationNames.SetSampleMaxFor, {
                descriptorId,
                max: 10
            });

            store.commit(MutationNames.SetSampleNFor, {
                descriptorId,
                n: 200
            });

            store.commit(MutationNames.SetSampleUnitFor, {
                descriptorId,
                units: 'feet'
            });

            store.state.request.updateObservation = function(oIdArg, payload) {
                expect(oIdArg).to.equal(observationId);
                expect(payload.sample_min).to.equal(5);
                expect(payload.sample_max).to.equal(10);
                expect(payload.sample_n).to.equal(200);
                expect(payload.sample_units).to.equal(`feet`);
            };

            store.dispatch(ActionNames.UpdateObservation, observationId);
        });
    });

    describe(`Presence and Qualitative Observations`, () => {
        it(`should throw an error if a Qualitative observation is updated`, () => {
            const errorFn = _ => {
                store.dispatch(ActionNames.UpdateObservation, 1001);
            };

            expect(errorFn).to.throw(`You can't update a Qualitative observation. You can only delete or create them.`);
        });

        it(`should throw an error if a Presence observation is updated`, () => {
            const errorFn = _ => {
                store.dispatch(ActionNames.UpdateObservation, 1004);
            };

            expect(errorFn).to.throw(`You can't update a Presence observation. You can only delete or create them.`);
        });
    });
});