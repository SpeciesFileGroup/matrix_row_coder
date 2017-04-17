<template>
    <div class="continuous-descriptor">
        <div>
            <h2 class="continuous-descriptor__title">{{ descriptor.title }}</h2>
            <p>
                <button @click="toggleZoom" type="button">Zoom</button>
            </p>
            <label>
                Amount:
                <input type="number" :value="continuousValue">
            </label>
            <label>
                Unit:
                <input type="text" :value="continuousUnit">
            </label>
        </div>

        <transition name="continuous-descriptor__zoomed-view-transition">
            <div class="continuous-descriptor__zoomed-view" v-if="isZoomed">
                <button class="continuous-descriptor__zoom-close-button" @click="toggleZoom" type="button">Return</button>
                <div class="continuous-descriptor__descriptor-details">
                    <h2>{{ descriptor.title }}</h2>
                    <descriptor-details v-bind:descriptor="descriptor"></descriptor-details>
                </div>
                <div
                    v-if="observation"
                    class="continuous-descriptor__observation-details">

                    <observation-details v-bind:observation="observation"></observation-details>
                </div>
            </div>
        </transition>
    </div>
</template>

<style lang="stylus" src="ContinuousDescriptor.styl"></style>

<script>
    const ActionNames = require('../../store/actions/actions').ActionNames;
    const GetterNames = require('../../store/getters/getters').GetterNames;

    const observationDetails = require('../ObservationDetails/ObservationDetails.vue');
    const descriptorDetails = require('../DescriptorDetails/DescriptorDetails.vue');

    module.exports = {
        created: function() {
            const descriptorId = this.$props.descriptor.id;
            const otuId = this.$store.state.taxonId;

            this.$store.dispatch(ActionNames.RequestDescriptorDepictions, descriptorId);
            this.$store.dispatch(ActionNames.RequestDescriptorNotes, descriptorId);
            this.$store.dispatch(ActionNames.RequestObservations, {descriptorId, otuId})
                .then(_ => {
                    const observations = this.$store.getters[GetterNames.GetObservationsFor](descriptorId);
                    if (observations.length > 1) {
                        throw 'A continuous descriptor cannot have more than one observation!';
                    } else if (observations.length === 1) {
                        const observation = observations[0];
                        this.observation = observation;
                        this.$store.dispatch(ActionNames.RequestObservationCitations, observation.id);
                        this.$store.dispatch(ActionNames.RequestObservationConfidences, observation.id);
                        this.$store.dispatch(ActionNames.RequestObservationDepictions, observation.id);
                        this.$store.dispatch(ActionNames.RequestObservationNotes, observation.id);
                    }
                });
        },
        data: function() {
            return {
                isZoomed: false,
                observation: null
            }
        },
        methods: {
            toggleZoom: function() {
                this.isZoomed = !this.isZoomed;
            }
        },
        name: 'continuous-descriptor',
        props: ['descriptor'],
        computed: {
            observation: function() {
                return this.$store.getters[GetterNames.GetObservationsFor](this.$props.descriptor.id)[0];
            },
            continuousValue: function() {
                return this.$store.getters[GetterNames.GetContinuousValueFor](this.$props.descriptor.id);
            },
            continuousUnit: function() {
                return this.$store.getters[GetterNames.GetContinuousUnitFor](this.$props.descriptor.id);
            }
        },
        components: {
            observationDetails,
            descriptorDetails
        }
    };
</script>