<template>
    <div class="descriptor-details">
        <p>{{ descriptor.description }}</p>
        <notes
                v-bind:notes="descriptor.notes">
        </notes>
        <depictions
                v-bind:depictions="descriptor.depictions">
        </depictions>
    </div>
</template>

<script>
    const notes = require('../Notes/Notes.vue');
    const depictions = require('../Depictions/Depictions.vue');

    module.exports = {
        name: 'descriptor-details',
        props: ['descriptor'],
        components: {
            notes,
            depictions
        }
    }
</script>