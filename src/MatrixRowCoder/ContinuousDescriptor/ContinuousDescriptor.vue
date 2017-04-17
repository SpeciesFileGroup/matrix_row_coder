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
                    <p>{{ descriptor.description }}</p>
                    <div class="continuous-descriptor__descriptor-depictions">
                        <img v-for="depiction in descriptor.depictions" :src="depiction.thumbSrc" :alt="depiction.caption">
                    </div>
                    <div class="continuous-descriptor__descriptor-notes">
                        <p v-for="note in descriptor.notes">{{ note.text }}</p>
                    </div>
                </div>
                <div
                    v-if="observation"
                    class="continuous-descriptor__observation-details">

                    <confidence-levels
                        v-bind:observation="observation">
                    </confidence-levels>
                </div>
            </div>
        </transition>
    </div>
</template>

<style lang="stylus" src="ContinuousDescriptor.styl"></style>

<script>
    const ActionNames = require('../../store/actions/actions').ActionNames;
    const GetterNames = require('../../store/getters/getters').GetterNames;

    const confidenceLevels = require('../ConfidenceLevels/ConfidenceLevels.vue');

    module.exports = {
        created: function() {
            const descriptorId = this.$props.descriptor.id;
            const otuId = this.$store.state.taxonId;

            this.$store.dispatch(ActionNames.RequestDescriptorDepictions, descriptorId);
            this.$store.dispatch(ActionNames.RequestDescriptorNotes, descriptorId);
            this.$store.dispatch(ActionNames.RequestObservations, {descriptorId, otuId})
                .then(_ => {
                    const observations = this.$store.getters[GetterNames.GetObservationsFor](descriptorId);
                    observations.forEach(o => {
                        this.$store.dispatch(ActionNames.RequestObservationCitations, o.id);
                        this.$store.dispatch(ActionNames.RequestObservationConfidences, o.id);
                        this.$store.dispatch(ActionNames.RequestObservationDepictions, o.id);
                        this.$store.dispatch(ActionNames.RequestObservationNotes, o.id);
                    });
                });
        },
        data: function() {
            return {
                isZoomed: false
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
            },
            selectedConfidences: function() {
                const observations = this.$store.getters[GetterNames.GetObservationsFor](this.$props.descriptor.id);
                const confidences = (observations.length > 0 && observations[0].confidences) ? observations[0].confidences : [];
                return confidences.map(c => c.confidenceLevelId);
            }
        },
        components: {
            confidenceLevels
        }
    };
</script>