const Vue = require('vue');
const store = require('./store');

new Vue({
    el: 'observation-editor',
    store,
    template: `<div>Hello World</div>`
});