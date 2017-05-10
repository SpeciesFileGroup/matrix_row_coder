import { expect } from 'chai';
import { ActionNames } from '../../../src/store/actions/actions';
import { MutationNames } from '../../../src/store/mutations/mutations';
import * as TestHelpers from '../../testHelpers';

describe(`SaveObservationsFor action`, () => {
    let store;

    beforeEach(done => {
        store = TestHelpers.newTestStore();
        TestHelpers.requestMatrixRowForStore(store)
            .then(_ => TestHelpers.requestAllObservationsForStore(store))
            .then(_ => done());
    });

    describe(`Qualitative descriptors`, () => {
        it(`should remove unchecked observations`, () => {
            store.commit(MutationNames.SetCharacterStateChecked, {
                descriptorId: 24,
                characterStateId: 33,
                isChecked: false
            });

            return store.dispatch(ActionNames.SaveObservationsFor, 24)
                .then(_ => {
                    expect(store.state.observations.find(o => o.characterStateId === 33).id).to.equal(null);
                });
        });

        it(`should create checked observations with no id`, () => {
            store.commit(MutationNames.SetCharacterStateChecked, {
                descriptorId: 24,
                characterStateId: 34,
                isChecked: true
            });

            return store.dispatch(ActionNames.SaveObservationsFor, 24)
                .then(_ => {
                    const observation = store.state.observations.find(o => o.characterStateId === 34);
                    expect(observation.isChecked).to.equal(true);
                    expect(observation.isUnsaved).to.equal(false);
                });
        });

        it(`should do nothing and revert isUnsaved if the observation is checked and has an id`, () => {
            store.commit(MutationNames.SetCharacterStateChecked, {
                descriptorId: 24,
                characterStateId: 33,
                isChecked: true
            });

            const createSpy = TestHelpers.spyOnMethod(store.state.request, 'createObservation');
            const removeSpy = TestHelpers.spyOnMethod(store.state.request, 'removeObservation');

            return store.dispatch(ActionNames.SaveObservationsFor, 24)
                .then(_ => {
                    expect(store.state.observations.find(o => o.characterStateId === 33).isUnsaved).to.be.false;
                    expect(createSpy.getTimesCalled(), 'create').to.equal(0);
                    expect(removeSpy.getTimesCalled(), 'remove').to.equal(0);
                });
        });

        it(`should do nothing and revert isUnsaved if the observation is unchecked and has no id`, () => {
            store.commit(MutationNames.SetCharacterStateChecked, {
                descriptorId: 24,
                characterStateId: 34,
                isChecked: false
            });

            const createSpy = TestHelpers.spyOnMethod(store.state.request, 'createObservation');
            const removeSpy = TestHelpers.spyOnMethod(store.state.request, 'removeObservation');

            return store.dispatch(ActionNames.SaveObservationsFor, 24)
                .then(_ => {
                    expect(store.state.observations.find(o => o.characterStateId === 34).isUnsaved).to.be.false;
                    expect(createSpy.getTimesCalled(), 'create').to.equal(0);
                    expect(removeSpy.getTimesCalled(), 'remove').to.equal(0);
                });
        });
    });

    describe(`Presence descriptors`, () => {
        it(`should create a new observation if there is no id`, () => {
            store.commit(MutationNames.SetPresence, {
                descriptorId: 30,
                isChecked: true
            });

            const createSpy = TestHelpers.spyOnMethod(store.state.request, 'createObservation');

            return store.dispatch(ActionNames.SaveObservationsFor, 30)
                .then(_ => {
                    expect(store.state.observations.find(o => o.descriptorId === 30).isUnsaved).to.be.false;
                    expect(createSpy.getTimesCalled()).to.equal(1);
                });
        });

        it(`should update the observation if there is an id`, () => {
            store.commit(MutationNames.SetPresence, {
                descriptorId: 25,
                isChecked: false
            });

            const updateSpy = TestHelpers.spyOnMethod(store.state.request, 'updateObservation');

            return store.dispatch(ActionNames.SaveObservationsFor, 25)
                .then(_ => {
                    expect(store.state.observations.find(o => o.descriptorId === 25).isUnsaved).to.be.false;
                    expect(updateSpy.getTimesCalled()).to.equal(1);
                });
        });
    });

    describe(`Continuous descriptors`, () => {
        it(`should update the observation if there is an id`, () => {
            const descriptorId = 26;

            store.commit(MutationNames.SetContinuousValue, {
                descriptorId,
                continuousValue: 1001
            });

            const updateSpy = TestHelpers.spyOnMethod(store.state.request, 'updateObservation');

            return store.dispatch(ActionNames.SaveObservationsFor, descriptorId)
                .then(_ => {
                    expect(updateSpy.getTimesCalled()).to.equal(1);
                    expect(store.state.observations.find(o => o.descriptorId === descriptorId).isUnsaved).to.equal(false);
                });
        });

        it(`should create an observation if there is no id`, () => {
            const descriptorId = 28;

            store.commit(MutationNames.SetContinuousValue, {
                descriptorId,
                continuousValue: 1001
            });

            const createSpy = TestHelpers.spyOnMethod(store.state.request, 'createObservation');

            return store.dispatch(ActionNames.SaveObservationsFor, descriptorId)
                .then(_ => {
                    expect(createSpy.getTimesCalled(), 'create').to.equal(1);
                    expect(store.state.observations.find(o => o.descriptorId === descriptorId).isUnsaved).to.equal(false);
                });
        });
    });

    describe(`Sample descriptors`, () => {
        it(`should update the observation if there is an id`, () => {
            const descriptorId = 27;

            store.commit(MutationNames.SetSampleNFor, {
                descriptorId,
                n: 1001
            });

            const updateSpy = TestHelpers.spyOnMethod(store.state.request, 'updateObservation');

            return store.dispatch(ActionNames.SaveObservationsFor, descriptorId)
                .then(_ => {
                    expect(updateSpy.getTimesCalled()).to.equal(1);
                    expect(store.state.observations.find(o => o.descriptorId === descriptorId).isUnsaved).to.equal(false);
                });
        });

        it(`should create an observation if there is no id`, () => {
            const descriptorId = 31;

            store.commit(MutationNames.SetSampleNFor, {
                descriptorId,
                n: 1001
            });

            const createSpy = TestHelpers.spyOnMethod(store.state.request, 'createObservation');

            return store.dispatch(ActionNames.SaveObservationsFor, descriptorId)
                .then(_ => {
                    expect(createSpy.getTimesCalled(), 'create').to.equal(1);
                    expect(store.state.observations.find(o => o.descriptorId === descriptorId).isUnsaved).to.equal(false);
                });
        });
    });
});