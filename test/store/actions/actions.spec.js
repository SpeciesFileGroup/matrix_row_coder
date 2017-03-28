const expect = require('chai').expect;
const actions = require('../../../src/store/actions/actions');

describe(`actions`, () => {
    it(`should export an object with ActionNames and ActionFunctions`, () => {
        expect(actions).to.be.an('object');
        expect(actions.ActionNames).to.be.an('object');
        expect(actions.ActionFunctions).to.be.an('object');
    });
});