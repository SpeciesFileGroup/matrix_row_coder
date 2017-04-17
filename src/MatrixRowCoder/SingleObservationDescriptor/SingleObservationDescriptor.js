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
                    throw 'This descriptor cannot have more than one observation!';
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
    props: ['descriptor'],
    components: {
        summaryView,
        zoomedView
    }
};