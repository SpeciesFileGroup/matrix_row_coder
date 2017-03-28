const expect = require('chai').expect;
const store = require('../../../src/store/store').newStore();
const mutations = require('../../../src/store/mutations/mutations');

describe(`setDescriptors`, () => {
    it(`should be able to set an array of descriptors on the store`, () => {
        const expectedDescriptors = [
            {
                id: 'foo'
            },
            {
                id: 'bar'
            },
            {
                id: 'baz'
            }
        ];
        store.commit(mutations.MutationNames.SetDescriptors, expectedDescriptors);
        expect(store.state.descriptors).to.deep.equal(expectedDescriptors);
    });
});