const expect = require('chai').expect;
const MutationNames = require('../../../src/store/mutations/mutations').MutationNames;
const TestHelpers = require('../../testHelpers');

describe(`ObservationSaved mutation`, () => {
    let store;

    before(done => {
        store = TestHelpers.newTestStore();
        TestHelpers.requestMatrixRowForStore(store)
            .then(_ => TestHelpers.requestAllObservationsForStore(store))
            .then(_ => done());
    });

    it(`should set a unsaved mutation to saved`, () => {
        store.commit(MutationNames.SetContinuousValue, {
            descriptorId: 25,
            continuousValue: 1000
        });

        store.commit(MutationNames.ObservationSaved, {
            descriptorId: 25
        });

        expect(store.state.observations.find(o => o.descriptorId === 25).isUnsaved).to.be.false;
    });

    describe(`Qualitative observations`, () => {
        it(`should be given the character state id`, () => {
            const descriptorId = 24;
            const characterStateId = 34;

            store.commit(MutationNames.SetCharacterStateChecked, {
                descriptorId,
                characterStateId,
                isChecked: true
            });

            store.commit(MutationNames.ObservationSaved, {
                descriptorId,
                characterStateId
            });

            expect(store.state.observations.find(o => o.characterStateId === 34).isUnsaved)
                .to.be.false;
        });
    });
});