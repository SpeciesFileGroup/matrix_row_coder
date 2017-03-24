<template>
    <div class="observation-editor">
        <sub-component></sub-component>
        <div>
            <button
                v-on:click="doABaz"
                type="button">

                do a baz
            </button>
        </div>
    </div>
</template>

<style lang="stylus" src="observationEditor.styl"></style>

<script>
    const subComponent = require('./subComponent/subComponent.vue');

    module.exports = {
        components: {
            subComponent
        },
        methods: {
            doABaz: function(event) {
                this.$store.commit('bazMessage');
            }
        }
    }
</script>