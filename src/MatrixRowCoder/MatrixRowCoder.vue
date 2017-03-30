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

                <h2 class="matrix-row-coder__descriptor-title">{{ descriptor.title }}</h2>
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

    const continuousDescriptor = require('./ContinuousDescriptor/ContinuousDescriptor.vue');
    const presenceDescriptor = require('./PresenceDescriptor/PresenceDescriptor.vue');
    const qualitativeDescriptor = require('./QualitativeDescriptor/QualitativeDescriptor.vue');
    const sampleDescriptor = require('./SampleDescriptor/SampleDescriptor.vue');

    module.exports = {
        mounted: function() {
            this.$store.dispatch(ActionNames.RequestDescriptors);
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