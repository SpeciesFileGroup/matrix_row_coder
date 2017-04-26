const expect = require('chai').expect;
const MutationNames = require('../../../src/store/mutations/mutations').MutationNames;
const TestHelpers = require('../../testHelpers');
const store = TestHelpers.newTestStore();

describe(`SetDescriptorDepictions Mutation`, () => {
    before(done => {
        TestHelpers.requestMatrixRowForStore(store)
            .then(_ => done());
    });

    it(`should set depictions to an empty array if given an empty array`, () => {
        const descriptorId = 27;

        store.commit(MutationNames.SetDescriptorDepictions, {
            depictions: [],
            descriptorId
        });

        const d = store.state.descriptors.find(d => d.id === descriptorId);

        expect(d.depictions).to.deep.equal([]);
    });

    it(`should transform and set the depiction`, () => {
        const depictions = require('../../../src/request/mockRequests/descriptors-25-depictions.json');
        const descriptorId = 25;

        store.commit(MutationNames.SetDescriptorDepictions, {
            depictions,
            descriptorId
        });

        const transformedDepictions = store.state.descriptors.find(d => d.id === descriptorId).depictions;
        const firstDepiction = transformedDepictions[0];

        expect(transformedDepictions).to.have.lengthOf(1);
        expect(firstDepiction.caption).to.equal("This looks like bacon to me at least.");
        expect(firstDepiction.normalSrc).to.equal("//www.placebacon.net/700/700");
        expect(firstDepiction.mediumSrc).to.equal("//www.placebacon.net/300/300");
        expect(firstDepiction.thumbSrc).to.equal("//www.placebacon.net/100/100");
        expect(firstDepiction.characterStateId).to.not.exist;
    });

    it(`should include the character state id if there is one`, () => {
        const depictions = require('../../../src/request/mockRequests/descriptors-24-depictions.json');
        const descriptorId = 24;

        store.commit(MutationNames.SetDescriptorDepictions, {
            depictions,
            descriptorId
        });

        const transformedDepictions = store.state.descriptors.find(d => d.id === descriptorId).depictions;
        expect(transformedDepictions).to.have.lengthOf(2);

        const characterStateIds = transformedDepictions.map(d => d.characterStateId);
        expect(characterStateIds.includes(33)).to.be.true;
        expect(characterStateIds.includes(34)).to.be.true;
    });
});