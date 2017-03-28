const expect = require('chai').expect;
const store = require('../../../src/store/store').newStore();
const actions = require('../../../src/store/actions/actions');

describe(`requestDescriptors action`, () => {
    it(`should populate the store with descriptors`, () => {
        return store.dispatch(actions.ActionNames.RequestDescriptors)
            .then(_ => {
                expect(store.state.descriptors).to.have.lengthOf(4);
                expect(store.state.taxonId).to.equal(1);
                expect(store.state.taxonTitle).to.equal("Aus bus");
            });
    });
});