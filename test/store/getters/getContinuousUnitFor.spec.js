import { expect } from 'chai';
import { GetterNames } from '../../../src/store/getters/getters';
import * as TestHelpers from '../../testHelpers';
import ComponentNames from '../../../src/store/helpers/ComponentNames';

const store = TestHelpers.newTestStore();

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