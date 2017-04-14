const expect = require('chai').expect;
const GetterNames = require('../../../src/store/getters/getters').GetterNames;
const store = require('../../../src/store/store').newStore();
const TestHelpers = require('../../testHelpers');
const ComponentNames = require('../../../src/store/helpers/ComponentNames');

describe(`GetContinuousUnitFor getter`, () => {
    before(done => {
        TestHelpers.requestMatrixRowForStore(store)
            .then(_ => TestHelpers.requestAllObservationsForStore(store))
            .then(_ => done());
    });

    it(`should return the continuous unit for the descriptor`, () => {
        const descriptor = store.state.descriptors.find(d => d.componentName === ComponentNames.Continuous);
        const value = store.getters[GetterNames.GetContinuousUnitFor](descriptor.id);
        expect(value).to.equal('mm');
    });

    it(`should return null if given a non-continuous descriptor`, () => {
        const descriptor = store.state.descriptors.find(d => d.componentName !== ComponentNames.Continuous);
        const value = store.getters[GetterNames.GetContinuousUnitFor](descriptor.id);
        expect(value).to.be.a.null;
    });

    it(`should return null if there is no matching observation`, () => {
        const value = store.getters[GetterNames.GetContinuousUnitFor](9999);
        expect(value).to.be.a.null;
    });
});