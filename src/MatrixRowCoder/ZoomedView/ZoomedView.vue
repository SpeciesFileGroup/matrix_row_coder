<template>
    <transition name="zoomed-view__transition">
        <div class="zoomed-view" v-if="descriptor.isZoomed">
            <button class="zoomed-view__close-button" @click="closeZoom" type="button">Return</button>
            <slot></slot>
        </div>
    </transition>
</template>

<style src="ZoomedView.styl" lang="stylus"></style>

<script>
    const MutationNames = require('../../store/mutations/mutations').MutationNames;

    module.exports = {
        name: "zoomed-view",
        props: ['descriptor'],
        methods: {
            closeZoom: function() {
                this.$store.commit(MutationNames.SetDescriptorZoom, {
                    descriptorId: this.descriptor.id,
                    isZoomed: false
                });
            }
        }
    };
</script>