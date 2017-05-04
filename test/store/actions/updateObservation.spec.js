import { expect } from 'chai';
import { ActionNames } from '../../../src/store/actions/actions';
import { MutationNames } from '../../../src/store/mutations/mutations';
import * as TestHelpers from '../../testHelpers';

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

        return store.dispatch(ActionNames.UpdateObservation, 26)
            .then(_ => {
                expect(timesCalled).to.equal(1);
            });
    });

    it(`should set the correct saving flags for the request`, () => {
        store.state.request.updateObservation = function() {
            return new Promise(resolve => {
                setTimeout(_ => {
                    resolve();
                }, 50);
            });
        };

        const descriptorId = 26;

        const updatePromise = store.dispatch(ActionNames.UpdateObservation, descriptorId);

        expect(store.state.descriptors.find(d => d.id === descriptorId).isSaving).to.equal(true);

        return updatePromise
            .then(_ => {
                expect(store.state.descriptors.find(d => d.id === descriptorId).isSaving).to.equal(false);
                expect(store.state.descriptors.find(d => d.id === descriptorId).hasSavedAtLeastOnce).to.equal(true);
            });
    });

    describe(`Continuous Observations`, () => {
        it(`should include the new continuous value`, () => {
            const observationId = 1002;
            const descriptorId = 26;

            const expectedContinuousValue = 500;

            store.commit(MutationNames.SetContinuousValue, {
                descriptorId,
                continuousValue: expectedContinuousValue
            });

            store.state.request.updateObservation = function(oIdArg, payload) {
                expect(oIdArg).to.equal(observationId);
                expect(payload.continuous_value).to.equal(expectedContinuousValue);
                return Promise.resolve({});
            };

            return store.dispatch(ActionNames.UpdateObservation, descriptorId);
        });

        it(`should include the new continuous unit`, () => {
            const observationId = 1002;
            const descriptorId = 26;

            const expectedContinuousUnit = "cm";

            store.commit(MutationNames.SetContinuousUnit, {
                descriptorId,
                continuousUnit: expectedContinuousUnit
            });

            store.state.request.updateObservation = function(oIdArg, payload) {
                expect(oIdArg).to.equal(observationId);
                expect(payload.continuous_unit).to.equal(expectedContinuousUnit);
                return Promise.resolve({});
            };

            return store.dispatch(ActionNames.UpdateObservation, descriptorId);
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
                return Promise.resolve({});
            };

            store.dispatch(ActionNames.UpdateObservation, descriptorId);
        });
    });

    describe(`Presence and Qualitative Observations`, () => {
        it(`should throw an error if a Qualitative observation is updated`, () => {
            const errorFn = _ => {
                store.dispatch(ActionNames.UpdateObservation, 24);
            };

            expect(errorFn).to.throw(`You can't update a Qualitative descriptor. You can only delete or create them.`);
        });

        it(`should throw an error if a Presence observation is updated`, () => {
            const errorFn = _ => {
                store.dispatch(ActionNames.UpdateObservation, 25);
            };

            expect(errorFn).to.throw(`You can't update a Presence descriptor. You can only delete or create them.`);
        });
    });
});