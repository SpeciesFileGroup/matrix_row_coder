const expect = require('chai').expect;
const store = require('../../../src/store/store').newStore();
const ActionNames = require('../../../src/store/actions/actions').ActionNames;

describe(`RequestConfidenceLevels action`, () => {
    it(`should request the confidence levels and add them to the store as a promise`, () => {
        store.dispatch(ActionNames.RequestConfidenceLevels);
        expect(store.state.confidenceLevels).to.be.a('promise');
        return store.state.confidenceLevels.then(confidenceLevels => {
            expect(confidenceLevels).to.have.lengthOf(4);
        });
    });
});