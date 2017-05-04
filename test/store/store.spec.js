import { expect } from 'chai';
import { newStore } from '../../src/store/store';
import MockRequest from '../../src/request/MockRequest';

describe('store', () => {
    it(`should initialize with a most empty state and the Request module given to the newStore function`, () => {
        const request = new MockRequest();

        const store = newStore(request);

        const expectedInitialState = {
            request: request,
            taxonTitle: '',
            taxonId: null,
            descriptors: [],
            observations: [],
            confidenceLevels: null
        };

        expect(store.state).to.deep.equal(expectedInitialState);
    });

    it(`should throw an error if not given an IMatrixRowCoderRequest`, () => {
        const request = { foo: 'bar' };

        const errorFn = _ => {
            newStore(request);
        };

        expect(errorFn).to.throw(`Store must be given an IMatrixRowCoderRequest`);
    });
});