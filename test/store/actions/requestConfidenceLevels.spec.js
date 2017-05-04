import { expect } from 'chai';
import { ActionNames } from '../../../src/store/actions/actions';
import * as TestHelpers from '../../testHelpers';

const store = TestHelpers.newTestStore();

describe(`RequestConfidenceLevels action`, () => {
    it(`should request the confidence levels and add them to the store as a promise`, () => {
        store.dispatch(ActionNames.RequestConfidenceLevels);
        expect(store.state.confidenceLevels).to.be.a('promise');
        return store.state.confidenceLevels.then(confidenceLevels => {
            expect(confidenceLevels).to.have.lengthOf(4);
        });
    });
});