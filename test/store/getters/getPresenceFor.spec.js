import { expect } from 'chai';
import { GetterNames } from '../../../src/store/getters/getters';
import * as TestHelpers from '../../testHelpers';

const store = TestHelpers.newTestStore();

describe(`GetPresenceFor getter`, () => {
    before(done => {
        TestHelpers.requestMatrixRowForStore(store)
            .then(_ => TestHelpers.requestAllObservationsForStore(store))
            .then(_ => done());
    });

    it(`should return a boolean of the checked state`, () => {
        const expectedPresenceByDescriptor = {
            25: true,
            30: false
        };

        Object.keys(expectedPresenceByDescriptor).forEach(key => {
            const descriptorId = parseInt(key);
            expect(store.getters[GetterNames.GetPresenceFor](descriptorId), `descriptor id ${descriptorId}`).to.equal(expectedPresenceByDescriptor[descriptorId]);
        });
    });
});