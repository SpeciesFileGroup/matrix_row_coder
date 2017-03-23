const Vue = require('vue');
const Vuex = require('vuex');

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        message: "bar"
    },
    mutations: {
        bazMessage: state => state.message = "baz"
    }
});

module.exports = store;