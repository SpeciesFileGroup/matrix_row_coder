const expect = require('chai').expect;
const GetterNames = require('../../../src/store/getters/getters').GetterNames;
const MutationNames = require('../../../src/store/mutations/mutations').MutationNames;
const TestHelpers = require('../../testHelpers');
const store = TestHelpers.newTestStore();

describe(`IsDescriptorObservationsUnsaved Getter`, () => {
    const unsavedDescriptorId = 27;

    before(done => {
        TestHelpers.requestMatrixRowForStore(store)
            .then(_ => TestHelpers.requestAllObservationsForStore(store))
            .then(_ => {
                store.commit(MutationNames.SetContinuousValue, {
                    descriptorId: unsavedDescriptorId,
                    continuousValue: 999
                });
            })
            .then(_ => done());
    });

    it(`should return true if any observation has been changed and unsaved`, () => {
        expect(store.getters[GetterNames.IsDescriptorObservationsUnsaved](unsavedDescriptorId)).to.be.true;
    });

    it(`should return false if the observation has not been changed`, () => {
        store.state.descriptors
            .map(d => d.id)
            .filter(dId => dId !== unsavedDescriptorId)
            .forEach(normalDescriptorId => {
                expect(store.getters[GetterNames.IsDescriptorObservationsUnsaved](normalDescriptorId)).to.be.false;
            });
    });
});