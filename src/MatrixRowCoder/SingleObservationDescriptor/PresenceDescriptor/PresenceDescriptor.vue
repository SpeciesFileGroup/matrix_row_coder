<template>
    <div class="presence-descriptor">
        <summary-view v-bind:descriptor="descriptor">
            <label>
                Present
                <input type="checkbox" :checked="isPresent" />
            </label>
        </summary-view>

        <single-observation-zoomed-view
            v-bind:descriptor="descriptor"
            v-bind:observation="observation">

        </single-observation-zoomed-view>
    </div>
</template>

<style src="PresenceDescriptor.styl" lang="stylus"></style>

<script>
    const SingleObservationDescriptor = require('../SingleObservationDescriptor');
    const GetterNames = require('../../../store/getters/getters').GetterNames;

    module.exports = {
        mixins: [SingleObservationDescriptor],
        name: 'presence-descriptor',
        computed: {
            isPresent() {
                return this.$store.getters[GetterNames.GetPresenceFor](this.$props.descriptor.id);
            }
        }
    };
</script>