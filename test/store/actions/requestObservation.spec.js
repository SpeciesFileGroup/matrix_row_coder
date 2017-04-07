const expect = require('chai').expect;
const store = require('../../../src/store/store').newStore();
const ActionNames = require('../../../src/store/actions/actions').ActionNames;
const TestDefines = require('../../testDefines');
const TestHelpers = require('../../testHelpers');

describe(`requestObservation action`, () => {
    before(done => {
        store.dispatch(ActionNames.RequestMatrixRow, TestDefines.MatrixRowUrl)
            .then(_ => TestHelpers.requestAllObservationsForStore(store) )
            .then(_ => done() );
    });

    it(`should grab the observation for the descriptor and place it in the store`, () => {
        expect(store.state.observations).to.have.lengthOf(4);
    });

    it(`should include the related descriptor id`, () => {
        const expectedDescriptorIds = {
            1001: 24,
            1002: 26,
            1003: 27,
            1004: 25
        };

        store.state.observations.forEach((o, i) => {
            expect(o.descriptorId).to.exist;
            expect(o.descriptorId).to.equal(expectedDescriptorIds[o.id]);
        });
    });

    it(`should initialize notes as null`, () => {
        store.state.observations.forEach(o => {
            expect( o.notes ).to.equal(null);
        });
    });

    it(`should initialize depictions as null`, () => {
        store.state.observations.forEach(o => {
            expect( o.depictions ).to.equal(null);
        });
    });

    it(`should initialize confidences as null`, () => {
        store.state.observations.forEach(o => {
            expect( o.confidences ).to.equal(null);
        });
    });

    it(`should initialize citations as null`, () => {
        store.state.observations.forEach(o => {
            expect( o.citations ).to.equal(null);
        });
    });

    describe(`Continuous Observation`, () => {
        it(`should include value and unit on a continuous descriptor`, () => {
            const continuousObservation = store.state.observations
                .find(o => o.id === 1002);
            store.state.observations.forEach(o => {
                if (o === continuousObservation) {
                    expect(o.continuousValue).to.equal(22);
                    expect(o.continuousUnit).to.equal('mm');
                } else {
                    expect(o.continuousValue).to.not.exist;
                    expect(o.continuousUnit).to.not.exist;
                }
            });
        });
    });

    describe('Qualitative Observations', _ => {
        it(`should include the character state id on a qualitative descriptor`, () => {
            const qualitativeObservation = store.state.observations
                .find(o => o.id === 1001);
            store.state.observations.forEach(o => {
                if (o === qualitativeObservation) {
                    expect(o.characterStateId).to.equal(33);
                } else {
                    expect(o.characterStateId).to.not.exist;
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

    describe(`Sample Observations`, () => {
        it(`should include sample properties`, () => {
            const sampleObservation = store.state.observations
                .find(o => o.id === 1003);

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

            store.state.observations.forEach(o => {
                if (o === sampleObservation) {
                    Object.keys(expectedProps).forEach(prop => {
                        expect(o[prop]).to.equal(expectedProps[prop]);
                    });
                } else {
                    Object.keys(expectedProps).forEach(prop => {
                        expect(o[prop]).to.not.exist;
                    });
                }
            });
        });
    });
});