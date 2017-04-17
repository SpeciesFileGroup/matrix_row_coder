const Vue = require('vue');
const Vuex = require('vuex');
const getters = require('./getters/getters');
const mutations = require('./mutations/mutations');
const actions = require('./actions/actions');

Vue.use(Vuex);

function makeInitialState() {
    return {
        taxonTitle: '',
        taxonId: null,
        descriptors: [],
        observations: [],
        confidenceLevels: null
    };
}

function newStore() {
    return new Vuex.Store({
        state: makeInitialState(),
        getters: getters.GetterFunctions,
        mutations: mutations.MutationFunctions,
        actions: actions.ActionFunctions
    });
}

module.exports = {
    newStore
};