const Vue = require('vue');
const MatrixRowCoder = require('./MatrixRowCoder/MatrixRowCoder.vue');
const MatrixRowCoderRequest = require('./request/MatrixRowCoderRequest');
const store = require('./store/store').newStore( new MatrixRowCoderRequest() );

new Vue({
    el: 'app',
    store,
    render: function (createElement) {
        return createElement(MatrixRowCoder, {
            props: {
                matrixId: 1,
                otuId: 1,
                apiBase: 'http://127.0.0.1:3000/api/v1',
                apiParams: {
                    project_id: 1,
                    token: `wRxpUlE1Pm_49S0a3v5erQ`
                }
            }
        })
    }
});