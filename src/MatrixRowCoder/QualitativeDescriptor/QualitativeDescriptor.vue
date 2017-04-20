<template>
    <div class="qualitative-descriptor">
        <summary-view v-bind:descriptor="descriptor">
            <li v-for="characterState in descriptor.characterStates">
                <label>
                    <input
                        type="checkbox" />

                    {{ characterState.label }}: {{ characterState.name }}
                </label>
            </li>
        </summary-view>
    </div>
</template>

<style src="QualitativeDescriptor.styl" lang="stylus"></style>

<script>
    const ActionNames = require('../../store/actions/actions').ActionNames;
    const MutationNames = require('../../store/mutations/mutations').MutationNames;
    const GetterNames = require('../../store/getters/getters').GetterNames;

    const summaryView = require('../SummaryView/SummaryView.vue');
    const zoomedView = require('../ZoomedView/ZoomedView.vue');

    module.exports = {
        name: 'qualitative-descriptor',
        props: ['descriptor'],
        created: function() {
            const descriptorId = this.$props.descriptor.id;
            const otuId = this.$store.state.taxonId;
            this.$store.dispatch(ActionNames.RequestDescriptorDepictions, descriptorId);
            this.$store.dispatch(ActionNames.RequestDescriptorNotes, descriptorId);
            this.$store.dispatch(ActionNames.RequestObservations, { descriptorId, otuId })
                .then(_ => this.$store.getters[GetterNames.GetObservationsFor](descriptorId))
                .then(observations => {
                    this.observations = observations;
                    this.observations.forEach(observation => {
                        if (observation.id) {
                            this.$store.dispatch(ActionNames.RequestObservationCitations, observation.id);
                            this.$store.dispatch(ActionNames.RequestObservationConfidences, observation.id);
                            this.$store.dispatch(ActionNames.RequestObservationDepictions, observation.id);
                            this.$store.dispatch(ActionNames.RequestObservationNotes, observation.id);
                        }
                    });
                });
        },
        data: function() {
            return {
                observations: []
            };
        },
        components: {
            summaryView
        }
    };
</script>