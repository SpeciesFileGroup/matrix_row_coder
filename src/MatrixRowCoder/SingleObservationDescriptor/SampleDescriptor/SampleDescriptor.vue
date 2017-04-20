<template>
    <div class="sample-descriptor">
        <summary-view v-bind:descriptor="descriptor">
            <label>
                Min:
                <input type="number" :value="sampleMin">
            </label>
            to
            <label>
                Max:
                <input type="number" :value="sampleMax">
            </label>
            <label>
                Units:
                <input type="text" :value="sampleUnit">
            </label>

            <label>
                n:
                <input type="number" :value="sampleN">
            </label>
        </summary-view>

        <zoomed-view
            v-bind:descriptor="descriptor"
            v-bind:observation="observation">

        </zoomed-view>
    </div>
</template>

<style src="SampleDescriptor.styl" lang="stylus"></style>

<script>
    const SingleObservationDescriptor = require('../SingleObservationDescriptor');
    const GetterNames = require('../../../store/getters/getters').GetterNames;

    module.exports = {
        mixins: [SingleObservationDescriptor],
        name: 'sample-descriptor',
        computed: {
            sampleMin() {
                return this.$store.getters[GetterNames.GetSampleMinFor](this.$props.descriptor.id);
            },
            sampleMax() {
                return this.$store.getters[GetterNames.GetSampleMaxFor](this.$props.descriptor.id);
            },
            sampleN() {
                return this.$store.getters[GetterNames.GetSampleNFor](this.$props.descriptor.id);
            },
            sampleUnit() {
                return this.$store.getters[GetterNames.GetSampleUnitFor](this.$props.descriptor.id);
            }
        }
    };
</script>