<template>
    <div class="continuous-descriptor">
        <summary-view
            v-bind:descriptor="descriptor">

            <label>
                Amount:
                <input type="number" :value="continuousValue" @input="updateContinuousValue">
            </label>
            <label>
                Unit:
                <input type="text" :value="continuousUnit" @input="updateContinuousUnit">
            </label>
            <button
                type="button"
                @click="removeObservation">
                Remove
            </button>
        </summary-view>

        <single-observation-zoomed-view
            v-bind:descriptor="descriptor"
            v-bind:observation="observation">

            <p>
                <label>
                    Amount:
                    <input type="number" :value="continuousValue" @input="updateContinuousValue">
                </label>
            </p>
            <p>
                <label>
                    Unit:
                    <input type="text" :value="continuousUnit" @input="updateContinuousUnit">
                </label>
            </p>
        </single-observation-zoomed-view>
    </div>
</template>

<style lang="stylus" src="ContinuousDescriptor.styl"></style>

<script>
    const GetterNames = require('../../../store/getters/getters').GetterNames;
    const MutationNames = require('../../../store/mutations/mutations').MutationNames;
    const SingleObservationDescriptor = require('../SingleObservationDescriptor');

    module.exports = {
        mixins: [SingleObservationDescriptor],
        name: 'continuous-descriptor',
        computed: {
            continuousValue: function() {
                return this.$store.getters[GetterNames.GetContinuousValueFor](this.$props.descriptor.id);
            },
            continuousUnit: function() {
                return this.$store.getters[GetterNames.GetContinuousUnitFor](this.$props.descriptor.id);
            }
        },
        methods: {
            updateContinuousValue(event) {
                this.$store.commit(MutationNames.SetContinuousValue, {
                    descriptorId: this.$props.descriptor.id,
                    continuousValue: event.target.value
                })
            },
            updateContinuousUnit(event) {
                this.$store.commit(MutationNames.SetContinuousUnit, {
                    descriptorId: this.$props.descriptor.id,
                    continuousUnit: event.target.value
                });
            },
            removeObservation(event) {
                console.log(`removeObservation`);
            }
        }
    };
</script>