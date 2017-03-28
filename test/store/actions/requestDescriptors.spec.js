const expect = require('chai').expect;
const store = require('../../../src/store/store').newStore();
const actions = require('../../../src/store/actions/actions');

describe(`requestDescriptors action`, () => {
    it(`should populate the store with descriptors`, () => {
        return store.dispatch(actions.ActionNames.RequestDescriptors)
            .then(_ => {
                expect(store.state.descriptors).to.have.lengthOf(4);
            });
    });
});