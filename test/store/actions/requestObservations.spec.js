const expect = require('chai').expect;
const store = require('../../../src/store/store').newStore();
const ActionNames = require('../../../src/store/actions/actions').ActionNames;
const TestDefines = require('../../testDefines');
const TestHelpers = require('../../testHelpers');

describe(`requestObservations action`, () => {
    before(done => {
        store.dispatch(ActionNames.RequestMatrixRow, TestDefines.MatrixRowUrl)
            .then(_ => TestHelpers.requestAllObservationsForStore(store) )
            .then(_ => done() );
    });

    it(`should include the correct observation ids`, () => {
        expect(store.state.observations.filter(o => o.id === 1001)).to.have.lengthOf(1);
        expect(store.state.observations.filter(o => o.id === 1002)).to.have.lengthOf(1);
        expect(store.state.observations.filter(o => o.id === 1003)).to.have.lengthOf(1);
        expect(store.state.observations.filter(o => o.id === 1004)).to.have.lengthOf(1);
        expect(store.state.observations.filter(o => !o.id)).to.have.lengthOf(7);
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
            if (expectedDescriptorIds[o.id])
                expect(o.descriptorId).to.equal(expectedDescriptorIds[o.id]);
        });
    });

    it(`should initialize notes as []`, () => {
        store.state.observations.forEach(o => {
            expect( o.notes ).to.deep.equal([]);
        });
    });

    it(`should initialize depictions as []`, () => {
        store.state.observations.forEach(o => {
            expect( o.depictions ).to.deep.equal([]);
        });
    });

    it(`should initialize confidences as []`, () => {
        store.state.observations.forEach(o => {
            expect( o.confidences ).to.deep.equal([]);
        });
    });

    it(`should initialize citations as []`, () => {
        store.state.observations.forEach(o => {
            expect( o.citations ).to.deep.equal([]);
        });
    });

    describe(`Continuous Observation`, () => {
        it(`should include value and unit on a continuous descriptor`, () => {
            const continuousObservation = store.state.observations
                .find(o => o.id === 1002);
            expect(continuousObservation.continuousValue).to.equal(22);
            expect(continuousObservation.continuousUnit).to.equal('mm');
        });
    });

    describe('Qualitative Observations', _ => {
        it(`should mark character states as checked if an observation exists for them`, () => {
            const qualitativeObservations = store.state.observations
                .filter(o => o.descriptorId === 24);
            console.log(qualitativeObservations);
            const expectedisChecked = {
                33: true,
                34: false
            };
            qualitativeObservations.forEach(o => {
                expect(o.isChecked).to.equal(expectedisChecked[o.characterStateId]);
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

            Object.keys(expectedProps).forEach(prop => {
                expect(sampleObservation[prop]).to.equal(expectedProps[prop]);
            });
        });
    });

    describe(`Presence Observations`, () => {
        it(`should mark the matching observation as checked if the observation exists`, () => {
            const presenceObservation = store.state.observations
                .find(o => o.descriptorId === 25);

            expect(presenceObservation.isChecked).to.be.true;
        });
    });
});