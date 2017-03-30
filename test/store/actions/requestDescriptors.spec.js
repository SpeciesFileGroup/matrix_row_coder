const expect = require('chai').expect;
const store = require('../../../src/store/store').newStore();
const ActionNames = require('../../../src/store/actions/actions').ActionNames;

const indexOfQualitativeDescriptor = 0;

describe(`requestDescriptors action`, () => {
    let qualitativeDescriptor;

    before(done => {
        store
            .dispatch(ActionNames.RequestDescriptors)
            .then(_ => qualitativeDescriptor = store.state.descriptors[indexOfQualitativeDescriptor])
            .then(_ => done());
    });

    it(`should populate the store with descriptors`, () => {
        expect(store.state.descriptors).to.have.lengthOf(4);
        expect(store.state.taxonId).to.equal(1);
        expect(store.state.taxonTitle).to.equal("Aus bus");
    });

    it(`should add the id`, () => {
        const expectedIds = [
            24,
            25,
            26,
            27
        ];

        store.state.descriptors.forEach((d, i) => {
            expect(d.id).to.equal(expectedIds[i]);
        });
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

    it(`should have an array of observations that belong to that descriptor`, () => {
        store.state.descriptors.forEach(d => {
            expect(d.observations).to.be.an('array');
        });
    });

    it(`should include a url to request observations`, () => {
        const expectedObservationUrls = [
            "observation-1001.json",
            "observation-1002.json",
            "observation-1003.json",
            "observation-1004.json"
        ];

        store.state.descriptors.forEach((d, i) => {
            expect(d.observationUrl).to.equal(expectedObservationUrls[i]);
        })
    });

    describe(`Qualitative Descriptors`, () => {
        it(`should set up character states for qualitative descriptors`, () => {
            expect(qualitativeDescriptor.characterStates)
                .to.be.an('array')
                .and.have.lengthOf(2);
        });

        it(`should include the character state id`, () => {
            const expectedIds = [ 33, 34 ];

            qualitativeDescriptor.characterStates.forEach((cs, i) => {
                expect(cs.id).to.equal(expectedIds[i]);
            });
        });

        it(`should include whether the character state is checked`, () => {
            qualitativeDescriptor.characterStates.forEach(cs => {
                expect(cs.isChecked).to.be.false;
            });
        });

        it(`should include a name on each character state`, () => {
            const expectedNames = [
                'red',
                'blue'
            ];

            qualitativeDescriptor.characterStates.forEach((cs, index) => {
                expect(cs.name).to.equal(expectedNames[index]);
            });
        });

        it(`should include a label on each character state`, () => {
            const expectedLabels = [
                'A',
                'B'
            ];

            qualitativeDescriptor.characterStates.forEach((cs, index) => {
                expect(cs.label).to.equal(expectedLabels[index]);
            });
        });

        it(`could include a description`, () => {
            const expectedDescriptions = [
                null,
                "Royal blue, not NC State blue."
            ];

            qualitativeDescriptor.characterStates.forEach((cs, index) => {
                expect(cs.description).to.equal(expectedDescriptions[index]);
            });
        });

        it(`could include notes`, () => {
            const expectedNotes = [
                [],
                [
                    "Navy blue is the best, fools."
                ]
            ];

            qualitativeDescriptor.characterStates.forEach((cs, index) => {
                expect(cs.notes).to.deep.equal(expectedNotes[index]);
            });
        });

        it(`could include depictions`, () => {
            const expectedDepictions = [
                [],
                [
                    {
                        url: "//www.placebacon.net/125/125",
                        caption: "The figure caption, could be used for content."
                    }
                ]
            ];

            qualitativeDescriptor.characterStates.forEach((cs, index) => {
                expect(cs.depictions).to.deep.equal(expectedDepictions[index]);
            });
        });
    });
});