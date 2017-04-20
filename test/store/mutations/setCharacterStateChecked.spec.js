const expect = require('chai').expect;
const MutationNames = require('../../../src/store/mutations/mutations').MutationNames;
const GetterNames = require('../../../src/store/getters/getters').GetterNames;
const store = require('../../../src/store/store').newStore();
const TestHelpers = require('../../testHelpers');

describe(`SetCharacterStateChecked Mutation`, () => {
    before(done => {
        TestHelpers.requestMatrixRowForStore(store)
            .then(_ => TestHelpers.requestAllObservationsForStore(store))
            .then(_ => done());
    });

    it(`should set the checked state on the given character state for the given descriptor`, () => {
        const descriptorId = 29;
        const characterStateId = 37;
        const isChecked = true;

        store.commit(MutationNames.SetCharacterStateChecked, {
            descriptorId,
            characterStateId,
            isChecked
        });

        expect(store.getters[GetterNames.GetCharacterStateChecked]({ descriptorId, characterStateId })).to.equal(isChecked);
    });
});