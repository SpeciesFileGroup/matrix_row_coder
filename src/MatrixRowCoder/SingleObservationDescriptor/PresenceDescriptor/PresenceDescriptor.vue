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
    import SingleObservationDescriptor from '../SingleObservationDescriptor';
    import { GetterNames } from '../../../store/getters/getters';
    import { MutationNames } from '../../../store/mutations/mutations';

    export default {
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