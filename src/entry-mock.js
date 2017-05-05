import Vue from 'vue';
import MatrixRowCoder from './MatrixRowCoder/MatrixRowCoder.vue';
import MockRequest from './request/MockRequest';
import { newStore } from './store/store';
const store = newStore( new MockRequest() );

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