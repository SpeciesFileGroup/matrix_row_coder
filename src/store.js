const Vue = require('vue');
const Vuex = require('vuex');

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        foo: "bar"
    }
});

module.exports = store;