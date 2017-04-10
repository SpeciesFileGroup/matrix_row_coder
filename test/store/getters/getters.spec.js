const expect = require('chai').expect;
const getters = require('../../../src/store/getters/getters');

describe(`getters`, () => {
    it(`should expose GetterNames and GetterMethods`, () => {
        expect(getters.GetterNames).to.exist;
        expect(getters.GetterFunctions).to.exist;
    });
});