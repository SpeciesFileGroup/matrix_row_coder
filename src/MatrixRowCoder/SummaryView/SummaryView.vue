<template>
    <div class="summary-view">
        <h2 class="summary-view__title">{{ descriptor.title }}</h2>
        <p>
            <button @click="zoomIn" type="button">Zoom</button>
        </p>
        <div>
            <slot></slot>
        </div>
    </div>
</template>

<style src="SummaryView.styl" lang="stylus"></style>

<script>
    const MutationNames = require('../../store/mutations/mutations').MutationNames;

    module.exports = {
        name: "summary-view",
        props: ['descriptor'],
        methods: {
            zoomIn: function(event) {
                this.$store.commit(MutationNames.SetDescriptorZoom, {
                    descriptorId: this.descriptor.id,
                    isZoomed: true
                });
            }
        }
    };
</script>