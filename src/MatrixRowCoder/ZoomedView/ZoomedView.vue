<template>
    <transition name="zoomed-view__transition">
        <div
            class="zoomed-view"
            :class="{ 'zoomed-view--unsaved': isUnsaved }"
            v-if="descriptor.isZoomed">

            <button class="zoomed-view__close-button" @click="closeZoom" type="button">Return</button>
            <slot></slot>
        </div>
    </transition>
</template>

<style src="ZoomedView.styl" lang="stylus"></style>

<script>
    const MutationNames = require('../../store/mutations/mutations').MutationNames;
    const GetterNames = require('../../store/getters/getters').GetterNames;

    module.exports = {
        name: "zoomed-view",
        props: ['descriptor'],
        computed: {
            isUnsaved: function() {
                return this.$store.getters[GetterNames.IsDescriptorUnsaved](this.$props.descriptor.id);
            }
        },
        methods: {
            closeZoom: function() {
                this.$store.commit(MutationNames.SetDescriptorZoom, {
                    descriptorId: this.descriptor.id,
                    isZoomed: false
                });
            }
        }
    };
</script>