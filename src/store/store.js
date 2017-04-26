const Vue = require('vue');
const Vuex = require('vuex');
const getters = require('./getters/getters');
const mutations = require('./mutations/mutations');
const actions = require('./actions/actions');
const IMatrixRowCoderRequest = require('../request/IMatrixRowCoderRequest');

Vue.use(Vuex);

function makeInitialState(requestModule) {
    return {
        request: requestModule,
        taxonTitle: '',
        taxonId: null,
        descriptors: [],
        observations: [],
        confidenceLevels: null
    };
}

const UnacceptableRequestModuleError = `Store must be given an IMatrixRowCoderRequest`;

function newStore(requestModule) {
    if (requestModule instanceof IMatrixRowCoderRequest === false)
        throw UnacceptableRequestModuleError;

    return new Vuex.Store({
        state: makeInitialState(requestModule),
        getters: getters.GetterFunctions,
        mutations: mutations.MutationFunctions,
        actions: actions.ActionFunctions
    });
}

module.exports = {
    newStore
};