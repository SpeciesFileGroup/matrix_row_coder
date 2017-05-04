import { expect } from 'chai';
import { MutationNames } from '../../../src/store/mutations/mutations';
import * as TestHelpers from '../../testHelpers';
const ComponentNames = require('../../../src/store/helpers/ComponentNames');

describe(`ClearObservation mutation`, () => {
    let store;

    beforeEach(done => {
        store = TestHelpers.newTestStore();
        TestHelpers.requestMatrixRowForStore(store)
            .then(_ => TestHelpers.requestAllObservationsForStore(store))
            .then(_ => done());
    });

    it(`should clear out the id of an observation`, () => {
        const descriptorId = 25;
        const observationId = store.state.observations.find(o => o.descriptorId === descriptorId).id;

        store.commit(MutationNames.ClearObservation, observationId);

        expect(store.state.observations.find(o => o.descriptorId === descriptorId).id).to.be.null;
    });

    it(`should uncheck for a presence observation`, () => {
        const descriptorId = 25;
        const observationId = store.state.observations.find(o => o.descriptorId === descriptorId).id;

        store.commit(MutationNames.ClearObservation, observationId);

        const clearedObservation = store.state.observations.find(o => o.descriptorId === descriptorId);

        expect(clearedObservation.isChecked).to.be.false;
    });

    it(`should null out value and units for continuous observations`, () => {
        const descriptorId = 26;
        const observationId = store.state.observations.find(o => o.descriptorId === descriptorId).id;

        store.commit(MutationNames.ClearObservation, observationId);

        const clearedObservation = store.state.observations.find(o => o.descriptorId === descriptorId);

        expect(clearedObservation.continuousValue).to.equal(null);
        expect(clearedObservation.continuousUnit).to.equal(null);
    });

    it(`should null out all the sample properties for sample observations`, () => {
        const descriptorId = 27;
        const observationId = store.state.observations.find(o => o.descriptorId === descriptorId).id;

        store.commit(MutationNames.ClearObservation, observationId);

        const clearedObservation = store.state.observations.find(o => o.descriptorId === descriptorId);

        expect(clearedObservation.n).to.be.null;
        expect(clearedObservation.min).to.be.null;
        expect(clearedObservation.max).to.be.null;
        expect(clearedObservation.median).to.be.null;
        expect(clearedObservation.mean).to.be.null;
        expect(clearedObservation.units).to.be.null;
        expect(clearedObservation.standardDeviation).to.be.null;
        expect(clearedObservation.standardError).to.be.null;
    });

    it(`should clear the check on a qualitative observation representing the character state`, () => {
        store.commit(MutationNames.ClearObservation, 1001);

        store.state.observations
            .filter(o => o.descriptorId === 24)
            .forEach(o => {
                expect(o.isChecked).to.be.false;
            });
    });
});