import Vue from 'vue';
import MatrixRowCoder from './MatrixRowCoder/MatrixRowCoder.vue';
import MatrixRowCoderRequest from './request/MatrixRowCoderRequest';
import { newStore } from './store/store';
const store = newStore( new MatrixRowCoderRequest() );
import props from './props';


new Vue({
    el: 'app',
    store,
    render: function (createElement) {
        return createElement(MatrixRowCoder, {
            props
        });
    }
});
