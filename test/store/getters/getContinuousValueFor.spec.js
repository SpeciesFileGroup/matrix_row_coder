const expect = require('chai').expect;
const GetterNames = require('../../../src/store/getters/getters').GetterNames;
const TestHelpers = require('../../testHelpers');
const ComponentNames = require('../../../src/store/helpers/ComponentNames');
const store = TestHelpers.newTestStore();

describe(`GetContinuousValueFor getter`, () => {
    before(done => {
        TestHelpers.requestMatrixRowForStore(store)
            .then(_ => TestHelpers.requestAllObservationsForStore(store))
            .then(_ => done());
    });

    it(`should return the continuous value for the descriptor`, () => {
        const descriptor = store.state.descriptors.find(d => d.componentName === ComponentNames.Continuous);
        const value = store.getters[GetterNames.GetContinuousValueFor](descriptor.id);
        expect(value).to.equal(22);
    });

    it(`should return null if given a non-continuous descriptor`, () => {
        const descriptor = store.state.descriptors.find(d => d.componentName !== ComponentNames.Continuous);
        const value = store.getters[GetterNames.GetContinuousValueFor](descriptor.id);
        expect(value).to.be.a.null;
    });

    it(`should return null if there is no matching observation`, () => {
        const value = store.getters[GetterNames.GetContinuousValueFor](9999);
        expect(value).to.be.a.null;
    });
});