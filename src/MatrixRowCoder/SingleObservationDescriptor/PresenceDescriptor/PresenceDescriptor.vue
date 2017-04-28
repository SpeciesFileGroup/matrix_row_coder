<template>
    <div class="presence-descriptor">
        <summary-view v-bind:descriptor="descriptor">
            <label>
                Present
                <input type="checkbox" :checked="isPresent" @change="updatePresence" />
            </label>
        </summary-view>

        <single-observation-zoomed-view
            v-bind:descriptor="descriptor"
            v-bind:observation="observation">

            <label>
                Present
                <input type="checkbox" :checked="isPresent" @change="updatePresence" />
            </label>

        </single-observation-zoomed-view>
    </div>
</template>

<style src="PresenceDescriptor.styl" lang="stylus"></style>

<script>
    const SingleObservationDescriptor = require('../SingleObservationDescriptor');
    const GetterNames = require('../../../store/getters/getters').GetterNames;
    const MutationNames = require('../../../store/mutations/mutations').MutationNames;

    module.exports = {
        mixins: [SingleObservationDescriptor],
        name: 'presence-descriptor',
        computed: {
            isPresent() {
                return this.$store.getters[GetterNames.GetPresenceFor](this.$props.descriptor.id);
            }
        },
        methods: {
            updatePresence(event) {
                this.$store.commit(MutationNames.SetPresence, {
                    descriptorId: this.$props.descriptor.id,
                    isChecked: event.target.checked
                });
            }
        }
    };
</script>