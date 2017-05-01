<template>
    <div class="summary-view" :class="{ 'summary-view--unsaved': isUnsaved }">
        <h2 class="summary-view__title">{{ descriptor.title }}</h2>
        <p>
            <button @click="zoomIn" type="button">Zoom</button>
        </p>
        <div>
            <slot></slot>
        </div>
        <save-countdown v-bind:descriptor="descriptor"></save-countdown>
    </div>
</template>

<style src="SummaryView.styl" lang="stylus"></style>

<script>
    const MutationNames = require('../../store/mutations/mutations').MutationNames;
    const GetterNames = require('../../store/getters/getters').GetterNames;

    const saveCountdown = require('../SaveCountdown/SaveCountdown.vue');

    module.exports = {
        name: "summary-view",
        props: ['descriptor'],
        computed: {
            isUnsaved: function() {
                return this.$store.getters[GetterNames.IsDescriptorUnsaved](this.$props.descriptor.id);
            }
        },
        methods: {
            zoomIn: function(event) {
                this.$store.commit(MutationNames.SetDescriptorZoom, {
                    descriptorId: this.descriptor.id,
                    isZoomed: true
                });
            }
        },
        components: {
            saveCountdown
        }
    };
</script>