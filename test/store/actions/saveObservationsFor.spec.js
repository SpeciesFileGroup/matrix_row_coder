const expect = require('chai').expect;
const ActionNames = require('../../../src/store/actions/actions').ActionNames;
const MutationNames = require('../../../src/store/mutations/mutations').MutationNames;
const TestHelpers = require('../../testHelpers');

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
    });
});