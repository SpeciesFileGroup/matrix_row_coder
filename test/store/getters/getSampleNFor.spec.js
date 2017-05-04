import { expect } from 'chai';
import { GetterNames } from '../../../src/store/getters/getters';
import * as TestHelpers from '../../testHelpers';

const store = TestHelpers.newTestStore();

describe(`GetSampleNFor getter`, () => {
    before(done => {
        TestHelpers.requestMatrixRowForStore(store)
            .then(_ => TestHelpers.requestAllObservationsForStore(store))
            .then(_ => done());
    });

    it(`should return the n on the sample, otherwise null`, () => {
        const expectedByDescriptor = {
            27: 100,
            31: null
        };

        Object.keys(expectedByDescriptor).forEach(key => {
            const descriptorId = parseInt(key);
            expect(store.getters[GetterNames.GetSampleNFor](descriptorId), `descriptor id ${descriptorId}`).to.equal(expectedByDescriptor[descriptorId]);
        });
    });
});