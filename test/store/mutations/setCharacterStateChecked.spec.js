const expect = require('chai').expect;
const MutationNames = require('../../../src/store/mutations/mutations').MutationNames;
const GetterNames = require('../../../src/store/getters/getters').GetterNames;
const TestHelpers = require('../../testHelpers');
const store = TestHelpers.newTestStore();

describe(`SetCharacterStateChecked Mutation`, () => {
    const descriptorId = 29;
    const characterStateId = 37;
    const isChecked = true;

    before(done => {
        TestHelpers.requestMatrixRowForStore(store)
            .then(_ => TestHelpers.requestAllObservationsForStore(store))
            .then(_ => {
                store.commit(MutationNames.SetCharacterStateChecked, {
                    descriptorId,
                    characterStateId,
                    isChecked
                });
            })
            .then(_ => done());
    });

    it(`should set the checked state on the given character state for the given descriptor`, () => {
        expect(store.getters[GetterNames.GetCharacterStateChecked]({
            descriptorId,
            characterStateId
        })).to.equal(isChecked);
    });

    it(`should set the observation to unsaved`, () => {
        const observationsForDescriptor = store.getters[GetterNames.GetObservationsFor](descriptorId);
        const characterStateObservation = observationsForDescriptor.find(o => o.characterStateId === characterStateId);
        expect(characterStateObservation.isUnsaved).to.be.true;
    });
});