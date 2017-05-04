import { expect } from 'chai';
import { MutationNames } from '../../../src/store/mutations/mutations';
const GetterNames = require('../../../src/store/getters/getters').GetterNames;
import * as TestHelpers from '../../testHelpers';
const store = TestHelpers.newTestStore();

describe(`SetSampleUnitFor Mutation`, () => {
    const descriptorId = 27;
    const expectedUnits = "cm";

    before(done => {
        TestHelpers.requestMatrixRowForStore(store)
            .then(_ => TestHelpers.requestAllObservationsForStore(store))
            .then(_ => {
                store.commit(MutationNames.SetSampleUnitFor, {
                    descriptorId,
                    units: expectedUnits
                });
            })
            .then(_ => done());
    });

    it(`should set sample n on the observation for the descriptor`, () => {
        expect( store.getters[GetterNames.GetSampleUnitFor](descriptorId) ).to.equal(expectedUnits);
    });

    it(`should mark the observation as unsaved`, () => {
        expect( store.state.descriptors.find(d => d.id === descriptorId).isUnsaved ).to.be.true;
    });
});