import { expect } from 'chai';
const GetterNames = require('../../../src/store/getters/getters').GetterNames;
import * as TestHelpers from '../../testHelpers';
const ComponentNames = require('../../../src/store/helpers/ComponentNames');
const store = TestHelpers.newTestStore();

describe(`GetCharacterStateChecked getter`, () => {
    before(done => {
        TestHelpers.requestMatrixRowForStore(store)
            .then(_ => TestHelpers.requestAllObservationsForStore(store))
            .then(_ => done());
    });

    it(`should return the checked status of the character state`, () => {
        const expected = {
            24: {
                33: true,
                34: false
            },
            29: {
                35: false,
                36: false,
                37: false
            }
        };

        Object.keys(expected).forEach(dKey => {
            const descriptorId = parseInt(dKey);
            Object.keys(expected[dKey]).forEach(csKey => {
                const characterStateId = parseInt(csKey);
                const actual = store.getters[GetterNames.GetCharacterStateChecked]({ descriptorId, characterStateId });
                expect(actual).to.equal(expected[dKey][csKey]);
            });
        });
    });
});