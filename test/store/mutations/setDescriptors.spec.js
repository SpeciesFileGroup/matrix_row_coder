import { expect } from 'chai';
import * as TestHelpers from '../../testHelpers';
const store = TestHelpers.newTestStore();
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