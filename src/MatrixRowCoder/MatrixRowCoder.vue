<template>
    <div class="matrix-row-coder">
        <h1 class="matrix-row-coder__title">{{ title }}</h1>
        <ul class="matrix-row-coder__descriptor-menu">
            <li v-for="descriptor in descriptors">
                <div>
                    {{ descriptor.title }}
                    <button
                        @click="zoomDescriptor(descriptor.id)"
                        type="button">

                        Zoom
                    </button>
                </div>
            </li>
        </ul>
        <ul class="matrix-row-coder__descriptor-list">
            <li
                class="matrix-row-coder__descriptor-container"
                v-for="descriptor in descriptors"
                v-bind:data-descriptor-id="descriptor.id">

                <div v-bind:is="descriptor.componentName" :descriptor="descriptor"></div>
            </li>
        </ul>
    </div>
</template>

<style lang="stylus" src="MatrixRowCoder.styl"></style>

<script>
    import { mapState } from 'vuex';
    import { MutationNames } from '../store/mutations/mutations';
    import { ActionNames } from '../store/actions/actions';

    const computed = mapState({
        title: state => state.taxonTitle,
        descriptors: state => state.descriptors
    });

    import continuousDescriptor from './SingleObservationDescriptor/ContinuousDescriptor/ContinuousDescriptor.vue';
    import presenceDescriptor from './SingleObservationDescriptor/PresenceDescriptor/PresenceDescriptor.vue';
    import qualitativeDescriptor from './QualitativeDescriptor/QualitativeDescriptor.vue';
    import sampleDescriptor from './SingleObservationDescriptor/SampleDescriptor/SampleDescriptor.vue';

    export default {
        created: function() {
            this.$store.state.request.setApi({
                apiBase: this.$props.apiBase,
                apiParams: this.$props.apiParams
            });

            this.$store.dispatch(ActionNames.RequestMatrixRow, {
                matrixId: this.$props.matrixId,
                otuId: this.$props.otuId
            });
            this.$store.dispatch(ActionNames.RequestConfidenceLevels);
        },
        name: 'matrix-row-coder',
        props: {
            matrixId: Number,
            otuId: Number,
            apiBase: String,
            apiParams: Object
        },
        computed,
        methods: {
            zoomDescriptor(descriptorId) {
                this.$store.commit(MutationNames.SetDescriptorZoom, {
                    descriptorId,
                    isZoomed: true
                });
                const top = document.querySelector(`[data-descriptor-id="${descriptorId}"]`).getBoundingClientRect().top;
                window.scrollTo(0, top);
            }
        },
        components: {
            continuousDescriptor,
            presenceDescriptor,
            qualitativeDescriptor,
            sampleDescriptor
        }
    };
</script>