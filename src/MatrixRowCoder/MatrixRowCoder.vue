<template>
    <div class="matrix-row-coder">
        <h1 class="matrix-row-coder__title">{{ title }}</h1>
        <div>

        </div>
    </div>
</template>

<style lang="stylus" src="MatrixRowCoder.styl"></style>

<script>
    const vuex = require('vuex');
    const ActionNames = require('../store/actions/actions').ActionNames;

    const computed = vuex.mapState({
        title: state => state.taxonTitle
    });

    module.exports = {
        mounted: function() {
            this.$store.dispatch(ActionNames.RequestDescriptors);
        },
        computed
    }
</script>