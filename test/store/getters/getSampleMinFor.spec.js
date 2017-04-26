const expect = require('chai').expect;
const GetterNames = require('../../../src/store/getters/getters').GetterNames;
const TestHelpers = require('../../testHelpers');
const ComponentNames = require('../../../src/store/helpers/ComponentNames');
const store = TestHelpers.newTestStore();

describe(`GetSampleMinFor getter`, () => {
    before(done => {
        TestHelpers.requestMatrixRowForStore(store)
            .then(_ => TestHelpers.requestAllObservationsForStore(store))
            .then(_ => done());
    });

    it(`should return the min on the sample, otherwise null`, () => {
        const expectedByDescriptor = {
            27: 23.23,
            31: null
        };

        Object.keys(expectedByDescriptor).forEach(key => {
            const descriptorId = parseInt(key);
            expect(store.getters[GetterNames.GetSampleMinFor](descriptorId), `descriptor id ${descriptorId}`).to.equal(expectedByDescriptor[descriptorId]);
        });
    });
});