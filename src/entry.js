const Vue = require('vue');
const observationEditor = require('./MatrixRowCoder/MatrixRowCoder.vue');
const store = require('./store/store').newStore();

new Vue({
    el: 'matrix-row-coder',
    store,
    render: function (createElement) {
        return createElement(observationEditor)
    }
});