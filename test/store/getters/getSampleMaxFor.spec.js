const expect = require('chai').expect;
const GetterNames = require('../../../src/store/getters/getters').GetterNames;
const store = require('../../../src/store/store').newStore();
const TestHelpers = require('../../testHelpers');
const ComponentNames = require('../../../src/store/helpers/ComponentNames');

describe(`GetSampleMaxFor getter`, () => {
    before(done => {
        TestHelpers.requestMatrixRowForStore(store)
            .then(_ => TestHelpers.requestAllObservationsForStore(store))
            .then(_ => done());
    });

    it(`should return the max on the sample, otherwise null`, () => {
        const expectedByDescriptor = {
            27: 44.23,
            31: null
        };

        Object.keys(expectedByDescriptor).forEach(key => {
            const descriptorId = parseInt(key);
            expect(store.getters[GetterNames.GetSampleMaxFor](descriptorId), `descriptor id ${descriptorId}`).to.equal(expectedByDescriptor[descriptorId]);
        });
    });
});