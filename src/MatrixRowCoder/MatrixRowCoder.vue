<template>
    <div class="matrix-row-coder">
        <h1 class="matrix-row-coder__title">{{ title }}</h1>
        <ul class="matrix-row-coder__descriptor-menu">
            <li v-for="descriptor in descriptors">
                <div>{{ descriptor.title }}</div>
            </li>
        </ul>
        <ul class="matrix-row-coder__descriptor-list">
            <li
                class="matrix-row-coder__descriptor-container"
                v-for="descriptor in descriptors">

                <div v-bind:is="descriptor.componentName" :descriptor="descriptor"></div>
            </li>
        </ul>
    </div>
</template>

<style lang="stylus" src="MatrixRowCoder.styl"></style>

<script>
    const vuex = require('vuex');
    const ActionNames = require('../store/actions/actions').ActionNames;

    const computed = vuex.mapState({
        title: state => state.taxonTitle,
        descriptors: state => state.descriptors
    });

    const continuousDescriptor = require('./SingleObservationDescriptor/ContinuousDescriptor/ContinuousDescriptor.vue');
    const presenceDescriptor = require('./SingleObservationDescriptor/PresenceDescriptor/PresenceDescriptor.vue');
    const qualitativeDescriptor = require('./QualitativeDescriptor/QualitativeDescriptor.vue');
    const sampleDescriptor = require('./SingleObservationDescriptor/SampleDescriptor/SampleDescriptor.vue');

    module.exports = {
        created: function() {
            this.$store.dispatch(ActionNames.RequestMatrixRow, {
                matrixId: this.$props.matrixId,
                otuId: this.$props.otuId
            });
            this.$store.dispatch(ActionNames.RequestConfidenceLevels);
        },
        name: 'matrix-row-coder',
        props: {
            matrixId: Number,
            otuId: Number,
            apiBase: String,
            apiParams: Object
        },
        computed,
        components: {
            continuousDescriptor,
            presenceDescriptor,
            qualitativeDescriptor,
            sampleDescriptor
        }
    }
</script>