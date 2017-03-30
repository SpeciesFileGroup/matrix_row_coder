const expect = require('chai').expect;
const store = require('../../../src/store/store').newStore();
const ActionNames = require('../../../src/store/actions/actions').ActionNames;

describe(`requestObservation action`, () => {
    before(done => {
        store.dispatch(ActionNames.RequestDescriptors)
            .then(store.dispatch(ActionNames.RequestObservation, 'observation-1001.json'))
            .then(store.dispatch(ActionNames.RequestObservation, 'observation-1002.json'))
            .then(store.dispatch(ActionNames.RequestObservation, 'observation-1003.json'))
            .then(store.dispatch(ActionNames.RequestObservation, 'observation-1004.json'))
            .then(_ => {
                done();
            });
    });

    it(`should grab the observation at the given url and place it in the correct descriptor`, () => {
        store.state.descriptors.forEach(d => {
            expect(d.observations).to.have.lengthOf(1);
        });
    });

    it(`could include notes`, () => {
        const expectedNotes = [
            [],
            [],
            ["This is a detail about an Observation."],
            []
        ];

        store.state.descriptors.forEach((d, i) => {
            expect( d.observations[0].notes ).to.deep.equal(expectedNotes[i]);
        });
    });

    describe(`Continuous Observations & Descriptors`, () => {
        it(`should include value and unit on a continuous descriptor`, () => {
            const continuousDescriptor = store.state.descriptors[2];
            store.state.descriptors.forEach((d, i) => {
                if (d === continuousDescriptor) {
                    expect(d.observations[0].continuousValue).to.equal(22);
                    expect(d.observations[0].continuousUnit).to.equal('mm');
                } else {
                    expect(d.observations[0].continuousValue).to.not.exist;
                    expect(d.observations[0].continuousUnit).to.not.exist;
                }
            });
        });
    });

    describe('Qualitative Observations & Descriptors', _ => {
        it(`should include the character state id on a qualitative descriptor`, () => {
            const qualitativeDescriptor = store.state.descriptors[0];
            store.state.descriptors.forEach((d, i) => {
                if (d === qualitativeDescriptor) {
                    expect(d.observations[0].characterStateId).to.equal(33);
                } else {
                    expect(d.observations[0].characterStateId).to.not.exist;
                }
            });
        });

        it(`should mark character states as checked if an observation exists for them`, () => {
            const qualitativeDescriptor = store.state.descriptors[0];

            const expectedChecks = [true, false];
            qualitativeDescriptor.characterStates.forEach((cs, i) => {
                expect(cs.isChecked).to.equal(expectedChecks[i]);
            });
        });
    });

    describe(`Sample Observations & Descriptors`, () => {
        it(`should include sample properties`, () => {
            const sampleDescriptor = store.state.descriptors[3];

            const expectedProps = {
                n: 1,
                min: 23.23,
                max: 44.23,
                median: 33,
                mean: 35.5,
                units: 'mm',
                standardDeviation: 2.3,
                standardError: 15.5
            };

            store.state.descriptors.forEach((d, i) => {
                if (d === sampleDescriptor) {
                    Object.keys(expectedProps).forEach(prop => {
                        expect(d.observations[0][prop]).to.equal(expectedProps[prop]);
                    });
                } else {
                    Object.keys(expectedProps).forEach(prop => {
                        expect(d.observations[0][prop]).to.not.exist;
                    });
                }
            });
        });
    });
});