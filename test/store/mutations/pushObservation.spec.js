const expect = require('chai').expect;
const store = require('../../../src/store/store').newStore();
const MutationNames = require('../../../src/store/mutations/mutations').MutationNames;

const mockDescriptors = [
    {
        id: 20,
        observations: []
    },
    {
        id: 21,
        observations: []
    }
];

const mockObservation = {
    id: 1001,
    descriptorId: 21
};

describe(`pushObservation mutation`, () => {
    it(`should add the given observation to the correct descriptor`, () => {
        store.commit(MutationNames.SetDescriptors, mockDescriptors);
        store.commit(MutationNames.PushObservation, mockObservation);

        expect(store.state.observations[0].id).to.equal(mockObservation.id);
    });
});