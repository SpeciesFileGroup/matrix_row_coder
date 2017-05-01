const expect = require('chai').expect;
const MutationNames = require('../../../src/store/mutations/mutations').MutationNames;
const GetterNames = require('../../../src/store/getters/getters').GetterNames;
const TestHelpers = require('../../testHelpers');

describe(`DoesDescriptorNeedCountdown getter`, () => {
    let store;

    before(done => {
        store = TestHelpers.newTestStore();
        TestHelpers.requestMatrixRowForStore(store)
            .then(_ => TestHelpers.requestAllObservationsForStore(store))
            .then(_ => done());
    });

    it(`should return whether the descriptor needs a countdown`, () => {
        const descriptorId = 24;

        expect(store.getters[GetterNames.DoesDescriptorNeedCountdown](descriptorId)).to.equal(false);

        store.commit(MutationNames.SetCharacterStateChecked, {
            descriptorId,
            characterStateId: 34,
            isChecked: true
        });

        expect(store.getters[GetterNames.DoesDescriptorNeedCountdown](descriptorId)).to.equal(true);
    });
});