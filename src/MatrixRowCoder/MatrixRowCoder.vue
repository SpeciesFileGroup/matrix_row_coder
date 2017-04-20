<template>
    <div class="matrix-row-coder">
        <p>
            matrix id: {{ matrixId }}<br>
            otu id: {{ otuId }}<br>
            api base: {{ apiBase }}<br>
            api params: {{ apiParams }}
        </p>
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
            this.$store.dispatch(ActionNames.RequestMatrixRow, `matrix-row.json`);
            this.$store.dispatch(ActionNames.RequestConfidenceLevels);
        },
        name: 'matrix-row-coder',
        props: {
            matrixId: String,
            otuId: String,
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