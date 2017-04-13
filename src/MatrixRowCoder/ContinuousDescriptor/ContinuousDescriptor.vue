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
                <button @click="toggleZoom" type="button">Return</button>
                ZOOM VIEW
            </div>
        </transition>
    </div>
</template>

<style lang="stylus" src="ContinuousDescriptor.styl"></style>

<script>
    const ActionNames = require('../../store/actions/actions').ActionNames;
    const GetterNames = require('../../store/getters/getters').GetterNames;

    module.exports = {
        created: function() {
            const descriptorId = this.$props.descriptor.id;
            const otuId = this.$store.state.taxonId;

            this.$store.dispatch(ActionNames.RequestDescriptorDepictions, descriptorId);
            this.$store.dispatch(ActionNames.RequestDescriptorNotes, descriptorId);
            this.$store.dispatch(ActionNames.RequestObservations, {descriptorId, otuId})
                .then(_ => {
                    //if there is an observation then
                    //get observation notes, confidences, citations, and depictions
                });
        },
        data: function () {
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
            continuousValue: function() {
                const observations = this.$store.getters[GetterNames.GetObservationsForDescriptorId](this.$props.descriptor.id);
                if (observations.length > 0) {
                    return observations[0].continuousValue;
                }
                return null;
            },
            continuousUnit: function() {
                const observations = this.$store.getters[GetterNames.GetObservationsForDescriptorId](this.$props.descriptor.id);
                if (observations.length > 0) {
                    return observations[0].continuousUnit;
                }
                return null;
            }
        }
    };
</script>