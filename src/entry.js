const Vue = require('vue');
const observationEditor = require('./observationEditor/observationEditor.vue');
const store = require('./store/store');

new Vue({
    el: 'observation-editor',
    store,
    render: function (createElement) {
        return createElement(observationEditor)
    }
});