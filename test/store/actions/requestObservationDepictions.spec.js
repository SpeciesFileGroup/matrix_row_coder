import { expect } from 'chai';
import { ActionNames } from '../../../src/store/actions/actions';
import * as TestHelpers from '../../testHelpers';
const store = TestHelpers.newTestStore();

describe(`RequestObservationDepictions action`, () => {
    before(done => {
        TestHelpers.requestMatrixRowForStore(store)
            .then(_ => TestHelpers.requestAllObservationsForStore(store))
            .then(_ => done());
    });

    it(`should request the depictions for an observation and add them to the state`, () => {
        const observationId = 1004;

        return store.dispatch(ActionNames.RequestObservationDepictions, observationId)
            .then(_ => {
                const observation = store.state.observations.find(o => o.id === observationId);
                expect(observation.depictions).to.have.lengthOf(2);
            });
    });
});