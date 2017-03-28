const Vue = require('vue');
const Vuex = require('vuex');
const mutations = require('./mutations/mutations');
const actions = require('./actions/actions');

Vue.use(Vuex);

const InitialState = {
    taxonTitle: '',
    taxonId: null,
    descriptors: [],
    observations: []
};

function newStore() {
    return new Vuex.Store({
        state: Object.assign({}, InitialState),
        mutations: mutations.MutationFunctions,
        actions: actions.ActionFunctions
    });
}

module.exports = {
    newStore
};