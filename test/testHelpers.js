import TestDefines from './testDefines';
import { ActionNames } from '../src/store/actions/actions';
import { newStore } from '../src/store/store';
import MockRequest from '../src/request/MockRequest';

export function newTestStore() {
    return newStore(new MockRequest());
}

export function requestMatrixRowForStore(store) {
    return store.dispatch(ActionNames.RequestMatrixRow, {
        matrixId: TestDefines.MatrixId,
        otuId: TestDefines.OtuId
    });
}

export function requestConfidenceLevelsForStore(store) {
    return store.dispatch(ActionNames.RequestConfidenceLevels);
}

export function requestAllObservationsForStore(store) {
    const otuId = store.state.taxonId;
    return Promise.all(store.state.descriptors.map(d => {
        return store.dispatch(ActionNames.RequestObservations, {
            descriptorId: d.id,
            otuId
        });
    }));
}
export function spyOnMethod(object, methodName) {
    return new Spy(object, methodName);
}

class Spy {
    constructor(object, methodName) {
        this.timesCalled = 0;
        object[methodName] = _ => {
            ++this.timesCalled;
            return Promise.resolve({});
        }
    }

    getTimesCalled() {
        return this.timesCalled;
    }
}