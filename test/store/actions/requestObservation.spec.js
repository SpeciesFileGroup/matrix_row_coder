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
});