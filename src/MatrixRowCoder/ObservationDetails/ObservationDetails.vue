<template>
    <div class="observation-details">
        <confidence-levels
            v-bind:confidences="observation.confidences">
        </confidence-levels>

        <notes
            v-bind:notes="observation.notes">
        </notes>

        <depictions
            v-bind:depictions="observation.depictions">
        </depictions>

        <citations
            v-bind:citations="observation.citations">
        </citations>
    </div>
</template>

<style src="ObservationDetails.styl" lang="stylus"></style>

<script>
    const confidenceLevels = require('../ConfidenceLevels/ConfidenceLevels.vue');
    const notes = require('../Notes/Notes.vue');
    const depictions = require('../Depictions/Depictions.vue');
    const citations = require('../Citations/Citations.vue');

    module.exports = {
        name: "observation-details",
        props: ['observation'],
        components: {
            confidenceLevels,
            notes,
            depictions,
            citations
        }
    };
</script>