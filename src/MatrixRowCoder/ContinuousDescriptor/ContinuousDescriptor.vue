<template>
    <div class="continuous-descriptor">
        <summary-view
            v-bind:descriptor="descriptor">

            <label>
                Amount:
                <input type="number" :value="continuousValue">
            </label>
            <label>
                Unit:
                <input type="text" :value="continuousUnit">
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
    const ActionNames = require('../../store/actions/actions').ActionNames;
    const GetterNames = require('../../store/getters/getters').GetterNames;

    const summaryView = require('../SummaryView/SummaryView.vue');
    const zoomedView = require('../ZoomedView/ZoomedView.vue');

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
                observation: null
            }
        },
        name: 'continuous-descriptor',
        props: ['descriptor'],
        computed: {
            continuousValue: function() {
                return this.$store.getters[GetterNames.GetContinuousValueFor](this.$props.descriptor.id);
            },
            continuousUnit: function() {
                return this.$store.getters[GetterNames.GetContinuousUnitFor](this.$props.descriptor.id);
            }
        },
        components: {
            summaryView,
            zoomedView
        }
    };
</script>