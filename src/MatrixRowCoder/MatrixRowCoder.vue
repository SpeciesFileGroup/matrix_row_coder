<template>
    <div class="matrix-row-coder">
        <sub-component></sub-component>
        <div>
            <button
                v-on:click="bazMessage"
                type="button">

                do a baz
            </button>
        </div>
    </div>
</template>

<style lang="stylus" src="MatrixRowCoder.styl"></style>

<script>
    const subComponent = require('./subComponent/subComponent.vue');

    const methods = require('vuex').mapMutations([
        'bazMessage'
    ]);

    module.exports = {
        components: {
            subComponent
        },
        methods
    }
</script>