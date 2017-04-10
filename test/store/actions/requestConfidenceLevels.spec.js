const expect = require('chai').expect;
const store = require('../../../src/store/store').newStore();
const ActionNames = require('../../../src/store/actions/actions').ActionNames;

describe(`RequestConfidenceLevels action`, () => {
    it(`should request the confidence levels and add them to the store`, () => {
        return store.dispatch(ActionNames.RequestConfidenceLevels)
            .then(_ => {
                expect(store.state.confidenceLevels).to.have.lengthOf(4);
            });
    });
});