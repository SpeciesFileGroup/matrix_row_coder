import { expect } from 'chai';
import { MutationNames } from '../../../src/store/mutations/mutations';
const GetterNames = require('../../../src/store/getters/getters').GetterNames;
import * as TestHelpers from '../../testHelpers';
const store = TestHelpers.newTestStore();

describe(`SetCharacterStateChecked Mutation`, () => {
    const descriptorId = 29;
    const characterStateId = 37;
    const isChecked = true;

    before(done => {
        TestHelpers.requestMatrixRowForStore(store)
            .then(_ => TestHelpers.requestAllObservationsForStore(store))
            .then(_ => {
                store.commit(MutationNames.SetCharacterStateChecked, {
                    descriptorId,
                    characterStateId,
                    isChecked
                });
            })
            .then(_ => done());
    });

    it(`should set the checked state on the given character state for the given descriptor`, () => {
        expect(store.getters[GetterNames.GetCharacterStateChecked]({
            descriptorId,
            characterStateId
        })).to.equal(isChecked);
    });

    it(`should set the descriptor to unsaved`, () => {
        const descriptor = store.state.descriptors.find(d => d.id === descriptorId);
        expect(descriptor.isUnsaved).to.be.true;
    });
});