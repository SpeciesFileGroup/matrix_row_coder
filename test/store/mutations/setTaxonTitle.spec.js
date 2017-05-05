import { expect } from 'chai';
import * as TestHelpers from '../../testHelpers';
const store = TestHelpers.newTestStore();
import { MutationNames } from '../../../src/store/mutations/mutations';

describe(`setTaxonTitle mutation`, () => {
    it(`should set the title`, () => {
        const expectedTitle = "FOOBAR";
        store.commit(MutationNames.SetTaxonTitle, expectedTitle);
        expect(store.state.taxonTitle).to.equal(expectedTitle);
    });
});