import { expect } from 'chai';
import * as TestHelpers from '../../testHelpers';
import { ActionNames } from '../../../src/store/actions/actions';
import { MutationNames } from '../../../src/store/mutations/mutations';

describe(`RemoveObservation action`, () => {
    let store;

    beforeEach(done => {
        store = TestHelpers.newTestStore();
        TestHelpers.requestMatrixRowForStore(store)
            .then(_ => TestHelpers.requestAllObservationsForStore(store))
            .then(_ => done());
    });

    it(`should send call the request module with the observation id`, () => {
        const descriptorId = 25;
        const observationId = 1004;

        store.state.request.removeObservation = function(observationId) {
            expect(observationId).to.equal(1004);
            return Promise.resolve({});
        };

        return store.dispatch(ActionNames.RemoveObservation, { descriptorId });
    });

    it(`should clear the observation`, () => {
        const descriptorId = 25;

        return store.dispatch(ActionNames.RemoveObservation, { descriptorId })
            .then(_ => {
                store.state.observations
                    .filter(o => o.descriptorId === descriptorId)
                    .forEach(o => {
                        expect(o.id).to.be.null;
                    });
            });
    });

    it(`observation should not be unsaved`, () => {
        const descriptorId = 25;

        store.commit(MutationNames.SetPresence, {
            descriptorId,
            isChecked: false
        });

        return store.dispatch(ActionNames.RemoveObservation, { descriptorId })
            .then(_ => {
                store.state.observations
                    .filter(o => o.descriptorId === descriptorId)
                    .forEach(o => {
                        expect(o.isUnsaved).to.be.false;
                    });
            });
    });

    it(`should set the correct saving flags for the request`, () => {
        store.state.request.removeObservation = function() {
            return new Promise(resolve => {
                setTimeout(_ => {
                    resolve();
                }, 50);
            });
        };

        const descriptorId = 25;

        const removePromise = store.dispatch(ActionNames.RemoveObservation, { descriptorId });

        expect(store.state.descriptors.find(d => d.id === descriptorId).isSaving).to.equal(true);

        return removePromise
            .then(_ => {
                expect(store.state.descriptors.find(d => d.id === descriptorId).isSaving).to.equal(false);
                expect(store.state.descriptors.find(d => d.id === descriptorId).hasSavedAtLeastOnce).to.equal(true);
            });
    });

    describe(`Qualitative Observations`, () => {
        it(`requires the character state id as an additional arg`, () => {
            const descriptorId = 24;
            const characterStateId = 33;

            return store.dispatch(ActionNames.RemoveObservation, { descriptorId, characterStateId })
                .then(_ => {
                    const observation = store.state.observations
                        .find(o => o.descriptorId === descriptorId && o.characterStateId === characterStateId);
                    expect(observation.isChecked).to.equal(false);
                    expect(observation.id).to.equal(null);
                });
        });
    });
});