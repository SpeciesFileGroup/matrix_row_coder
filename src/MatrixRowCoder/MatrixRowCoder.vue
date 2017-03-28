<template>
    <div class="matrix-row-coder">
        <h1 class="matrix-row-coder__title">{{ title }}</h1>
        <ul class="matrix-row-coder__descriptor-menu">
            <li v-for="descriptor in descriptors">
                <div>{{ descriptor.descriptor_tag }}</div>
            </li>
        </ul>
        <ul class="matrix-row-coder__descriptor-list">
            <li
                class="matrix-row-coder__descriptor-container"
                v-for="descriptor in descriptors">
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

    module.exports = {
        mounted: function() {
            this.$store.dispatch(ActionNames.RequestDescriptors);
        },
        computed
    }
</script>