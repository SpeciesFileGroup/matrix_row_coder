const expect = require('chai').expect;
const MutationNames = require('../../../src/store/mutations/mutations').MutationNames;
const ObservationTypes = require('../../../src/store/helpers/ObservationTypes');
const TestHelpers = require('../../testHelpers');

const mockDescriptors = [
    {
        id: 20,
        observations: []
    },
    {
        id: 21,
        observations: []
    },
    {
        id: 22,
        observations: []
    }
];

const mockObservation = {
    id: 1001,
    descriptorId: 21,
    type: ObservationTypes.Continuous
};

describe(`SetObservation mutation`, () => {
    let store;

    beforeEach(done => {
        store = TestHelpers.newTestStore();
        store.commit(MutationNames.SetDescriptors, mockDescriptors);
        done();
    });

    it(`should add the given observation to the store`, () => {
        store.commit(MutationNames.SetObservation, mockObservation);

        expect(store.state.observations[0].id).to.equal(mockObservation.id);
    });

    it(`should throw an error if an observation is set without a type`, () => {
        const errorFn = _ => {
            store.commit(MutationNames.SetObservation, {
                descriptorId: 20
            });
        };

        expect(errorFn).to.throw(`Observations must have a type!`);
    });

    it(`should throw an error if the observation type is bogus`, () => {
        const bogusType = Math.random().toString(36);
        const errorFn = _ => {
            store.commit(MutationNames.SetObservation, {
                descriptorId: 20,
                type: bogusType
            });
        };

    expect(errorFn).to.throw(`Observations must have a valid type! Given ${bogusType}`);
    });

    it(`should throw an error if the descriptorId on the observation does not exist`, () => {
        const errorFn = _ => {
            store.commit(MutationNames.SetObservation, {
                descriptorId: 1000,
                type: ObservationTypes.Continuous
            });
        };

        expect(errorFn).to.throw(`Observations must have a matching descriptor!`);
    });

    describe(`Continuous, Presence, and Sample Observations`, () => {
        it(`should merge the observation data if one with the same descriptorId already exists`, () => {
            const types = [ObservationTypes.Continuous, ObservationTypes.Presence, ObservationTypes.Sample];
            types.forEach((type, index) => {
                const firstObservation = {
                    descriptorId: index + 20,
                    type
                };
                const secondObservation = Object.assign({}, firstObservation, { id: index + 1 });
                store.commit(MutationNames.SetObservation, firstObservation);
                store.commit(MutationNames.SetObservation, secondObservation);
            });
            expect(store.state.observations).to.have.lengthOf(3);
            expect(store.state.observations.filter(o => o.id === 1)).to.have.lengthOf(1);
            expect(store.state.observations.filter(o => o.id === 2)).to.have.lengthOf(1);
            expect(store.state.observations.filter(o => o.id === 3)).to.have.lengthOf(1);
        });
    });

    describe(`Qualitative Observations`, () => {
        it(`should throw an error if a Qualitative observation has no characterStateId`, () => {
            const errorFn = _ => {
                store.commit(MutationNames.SetObservation, Object.assign({}, mockObservation, { type: ObservationTypes.Qualitative }));
            };

            expect(errorFn).to.throw(`Qualitative Observations must have a character state id!`);
        });

        it(`should be able to set an observation for each character state id of a qualitative descriptor`, () => {
            const observations = [
                Object.assign({}, mockObservation, { type: ObservationTypes.Qualitative, characterStateId: 1 }),
                Object.assign({}, mockObservation, { type: ObservationTypes.Qualitative, characterStateId: 2 }),
                Object.assign({}, mockObservation, { type: ObservationTypes.Qualitative, characterStateId: 3 })
            ];

            observations.forEach(o => store.commit(MutationNames.SetObservation, o));

            expect(store.state.observations).to.have.lengthOf(3);
        });

        it(`should merge the observation with the same character state and descriptor id`, () => {
            const firstObservation = {
                descriptorId: 20,
                type: ObservationTypes.Qualitative,
                characterStateId: 2
            };
            const secondObservation = Object.assign({}, firstObservation, { id: 1005 });

            store.commit(MutationNames.SetObservation, firstObservation);
            store.commit(MutationNames.SetObservation, secondObservation);

            expect(store.state.observations).to.have.lengthOf(1);
            expect(store.state.observations[0].id).to.equal(1005);
        });
    });
});