const Vue = require('vue');
const MatrixRowCoder = require('./MatrixRowCoder/MatrixRowCoder.vue');
const MockRequest = require('./request/MockRequest');
const store = require('./store/store').newStore( new MockRequest() );

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