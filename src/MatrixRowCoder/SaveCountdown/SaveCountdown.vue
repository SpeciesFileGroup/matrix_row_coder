<template>
    <div class="save-countdown">
        <transition
            name="save-countdown__duration-bar-animation"
            v-on:after-enter="doSave">

            <div
                v-if="isUnsaved"
                class="save-countdown__duration-bar"></div>
        </transition>
    </div>
</template>

<style src="SaveCountdown.styl" lang="stylus"></style>

<script>
    const GetterNames = require('../../store/getters/getters').GetterNames;
    const ActionNames = require('../../store/actions/actions').ActionNames;

    module.exports = {
        name: 'save-countdown',
        props: ['descriptor'],
        computed: {
            isUnsaved: function() {
                return this.$store.getters[GetterNames.IsDescriptorUnsaved](this.$props.descriptor.id);
            }
        },
        methods: {
            doSave() {

            }
        }
    };
</script>