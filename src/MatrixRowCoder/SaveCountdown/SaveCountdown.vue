<template>
    <div class="save-countdown">
        <transition
            name="save-countdown__duration-bar-animation"
            v-on:after-enter="doSave">

            <div
                v-if="isCountingDown"
                class="save-countdown__duration-bar"
                :class="{ 'save-countdown__duration-bar--saving': isSaving, 'save-countdown__duration-bar--saved-at-least-once': savedAtLeastOnce }"></div>
        </transition>
    </div>
</template>

<style src="SaveCountdown.styl" lang="stylus"></style>

<script>
    const GetterNames = require('../../store/getters/getters').GetterNames;
    const MutationNames = require('../../store/mutations/mutations').MutationNames;
    const ActionNames = require('../../store/actions/actions').ActionNames;

    module.exports = {
        name: 'save-countdown',
        props: ['descriptor'],
        data: function() {
            return {
                isCountingDown: false
            };
        },
        computed: {
            needsCountdown: function() {
                return this.$store.getters[GetterNames.DoesDescriptorNeedCountdown](this.$props.descriptor.id);
            },
            isSaving: function() {
                return this.$props.descriptor.isSaving;
            },
            savedAtLeastOnce: function() {
                return this.$props.descriptor.hasSavedAtLeastOnce;
            }
        },
        methods: {
            doSave() {
                this.$store.dispatch(ActionNames.SaveObservationsFor, this.$props.descriptor.id);
            }
        },
        watch: {
            needsCountdown: function(needsCountdown) {
                if (needsCountdown) {
                    this.isCountingDown = false;
                    requestAnimationFrame(_ => {
                        this.isCountingDown = true;
                        this.$store.commit(MutationNames.CountdownStartedFor, this.$props.descriptor.id);
                    });
                }
            }
        }
    };
</script>