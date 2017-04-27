const expect = require('chai').expect;
const MutationNames = require('../../../src/store/mutations/mutations').MutationNames;
const TestHelpers = require('../../testHelpers');
const store = TestHelpers.newTestStore();

describe(`SetConfidenceLevels mutation`, () => {
    it(`should set the given confidence levels`, () => {
        const confidenceLevelPromise = new Promise(resolve => {
            resolve(require('../../../src/request/mockRequests/confidence-levels.json'));
        });

        store.commit(
            MutationNames.SetConfidenceLevels,
            confidenceLevelPromise
        );

        return store.state.confidenceLevels.then(confidenceLevels => {
            expect(confidenceLevels).to.have.lengthOf(4);
            expect(confidenceLevels).to.deep.equal([
                {
                    id: 5001,
                    name: "😖",
                    definition: "Confounded",
                    color: "#FF0000"
                },
                {
                    id: 5002,
                    name: "😐",
                    definition: "Okay",
                    color: "#888800"
                },
                {
                    id: 5003,
                    name: "🙂",
                    definition: "Good",
                    color: "#00AA00"
                },
                {
                    id: 5004,
                    name: "😀",
                    definition: "Grin",
                    color: "#00FF00"
                }
            ]);
        });
    });
});