const Vue = require('vue');
const MatrixRowCoder = require('./MatrixRowCoder/MatrixRowCoder.vue');
const store = require('./store/store').newStore();

new Vue({
    el: 'app',
    store,
    render: function (createElement) {
        return createElement(MatrixRowCoder, {
            props: {
                matrixId: 5,
                otuId: 1
            }
        })
    }
});