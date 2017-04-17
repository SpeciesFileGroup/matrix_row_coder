<template>
    <transition name="zoomed-view__transition">
        <div class="zoomed-view" v-if="isZoomed">
            <button class="zoomed-view__close-button" @click="toggleZoom" type="button">Return</button>
            <div class="zoomed-view__descriptor-details">
                <h2>{{ descriptor.title }}</h2>
                <slot></slot>
                <descriptor-details v-bind:descriptor="descriptor"></descriptor-details>
            </div>
            <div
                v-if="observation"
                class="zoomed-view__observation-details">

                <observation-details v-bind:observation="observation"></observation-details>
            </div>
        </div>
    </transition>
</template>

<style src="ZoomedView.styl" lang="stylus"></style>

<script>
    const observationDetails = require('../ObservationDetails/ObservationDetails.vue');
    const descriptorDetails = require('../DescriptorDetails/DescriptorDetails.vue');

    module.exports = {
        name: "zoomed-view",
        props: ['isZoomed', 'descriptor', 'observation'],
        methods: {
            toggleZoom: function() {
                this.$emit('toggleZoom');
            }
        },
        components: {
            observationDetails,
            descriptorDetails
        }
    };
</script>