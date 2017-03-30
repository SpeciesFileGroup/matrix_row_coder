const expect = require('chai').expect;
const store = require('../../../src/store/store').newStore();
const actions = require('../../../src/store/actions/actions');

describe(`requestDescriptors action`, () => {
    before(done => {
        store
            .dispatch(actions.ActionNames.RequestDescriptors)
            .then(_ => done());
    });

    it(`should populate the store with descriptors`, () => {
        expect(store.state.descriptors).to.have.lengthOf(4);
        expect(store.state.taxonId).to.equal(1);
        expect(store.state.taxonTitle).to.equal("Aus bus");
    });

    it(`should assign a descriptor component based on the type`, () => {
        const expectedComponentNames = [
            `qualitative-descriptor`,
            `presence-descriptor`,
            `continuous-descriptor`,
            `sample-descriptor`
        ];

        store.state.descriptors.forEach((d, index) => {
            expect(d.componentName).to.equal(expectedComponentNames[index]);
        });
    });

    it(`should assign a title`, () => {
        const expectedTitles = [
            "Head color",
            "Big green spine",
            "Tooth count",
            "Weight"
        ];

        store.state.descriptors.forEach((d, index) => {
            expect(d.title).to.equal(expectedTitles[index]);
        });
    });

    it(`should include a description if there is one`, () => {
        const expectedDescriptions = [
            "The MARKDOWN description of the descriptor.",
            null,
            null,
            null
        ];

        store.state.descriptors.forEach((d, index) => {
            expect(d.description).to.equal(expectedDescriptions[index]);
        });
    });
});