<template>
    <ul class="qualitative-descriptor">
        <li v-for="characterState in descriptor.characterStates">
            <label>
                <input
                    :checked="characterState.isChecked"
                    @change="test"
                    type="checkbox" />

                {{ characterState.label }}: {{ characterState.name }}
            </label>
        </li>
    </ul>
</template>

<style src="QualitativeDescriptor.styl" lang="stylus"></style>

<script>
    const ActionNames = require('../../store/actions/actions').ActionNames;
    const MutationNames = require('../../store/mutations/mutations').MutationNames;

    module.exports = {
        name: 'qualitative-descriptor',
        props: ['descriptor'],
        created: function() {
            const descriptorId = this.$props.descriptor.id;
            const otuId = this.$store.state.taxonId;
            this.$store.dispatch(ActionNames.RequestObservations, { descriptorId, otuId });
        },
        methods: {
            test: function(something) {
                console.log(something);
            }
        }
    };
</script>