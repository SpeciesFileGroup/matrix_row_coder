const expect = require('chai').expect;
const mutations = require('../../../src/store/mutations/mutations');

describe(`mutations`, () => {
    it(`should have MutationNames and MutationFunctions`, () => {
        expect(mutations).to.be.an('object');
        expect(mutations.MutationNames).to.be.an('object');
        expect(mutations.MutationFunctions).to.be.an('object');
    });
});