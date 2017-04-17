const expect = require('chai').expect;
const store = require('../../../src/store/store').newStore();
const ActionNames = require('../../../src/store/actions/actions').ActionNames;

const indexOfQualitativeDescriptor = 0;
const MatrixRowUrl = require('../../testDefines').MatrixRowUrl;

describe(`requestMatrixRow action`, () => {
    let qualitativeDescriptor;

    before(done => {
        store
            .dispatch(ActionNames.RequestMatrixRow, MatrixRowUrl)
            .then(_ => qualitativeDescriptor = store.state.descriptors[indexOfQualitativeDescriptor])
            .then(_ => done());
    });

    it(`should populate the store with descriptors and taxon information`, () => {
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
            "Describes the number of teeth present on this specimen.",
            null
        ];

        store.state.descriptors.forEach((d, index) => {
            expect(d.description).to.equal(expectedDescriptions[index]);
        });
    });

    it(`should initialize the notes as null`, () => {
        store.state.descriptors.forEach(d => {
            expect(d.notes).to.equal(null);
        });
    });

    it(`should initialize the depictions as null`, () => {
        store.state.descriptors.forEach(d => {
            expect(d.depictions).to.equal(null);
        });
    });

    it(`should initialize isZoomed to false`, () => {
        store.state.descriptors.forEach(d => {
            expect(d.isZoomed).to.be.false;
        });
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
    });
});