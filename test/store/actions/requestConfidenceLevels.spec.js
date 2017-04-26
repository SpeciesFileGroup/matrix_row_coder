const expect = require('chai').expect;
const ActionNames = require('../../../src/store/actions/actions').ActionNames;
const store = require('../../testHelpers').newTestStore();

describe(`RequestConfidenceLevels action`, () => {
    it(`should request the confidence levels and add them to the store as a promise`, () => {
        store.dispatch(ActionNames.RequestConfidenceLevels);
        expect(store.state.confidenceLevels).to.be.a('promise');
        return store.state.confidenceLevels.then(confidenceLevels => {
            expect(confidenceLevels).to.have.lengthOf(4);
        });
    });
});