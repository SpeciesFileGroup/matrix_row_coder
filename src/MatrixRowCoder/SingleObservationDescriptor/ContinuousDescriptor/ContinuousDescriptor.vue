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
        </summary-view>

        <zoomed-view
            v-bind:descriptor="descriptor"
            v-bind:observation="observation">

            <dl>
                <dt>Amount:</dt>
                <dd>{{ continuousValue }}</dd>
                <dt>Unit</dt>
                <dd>{{ continuousUnit }}</dd>
            </dl>
        </zoomed-view>
    </div>
</template>

<style lang="stylus" src="ContinuousDescriptor.styl"></style>

<script>
    const GetterNames = require('../../../store/getters/getters').GetterNames;
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
                console.log(event.target.value);
            },
            updateContinuousUnit(event) {
                console.log(event.target.value);
            }
        }
    };
</script>