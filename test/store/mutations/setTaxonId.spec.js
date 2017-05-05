import { expect } from 'chai';
import { MutationNames } from '../../../src/store/mutations/mutations';
import * as TestHelpers from '../../testHelpers';
const store = TestHelpers.newTestStore();

describe(`setTaxonId mutation`, () => {
    it(`should set the taxon id`, () => {
        const expectedId = 42;
        store.commit(MutationNames.SetTaxonId, expectedId);
        expect(store.state.taxonId).to.equal(expectedId);
    });
});