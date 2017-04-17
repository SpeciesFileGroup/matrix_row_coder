<template>
    <div class="presence-descriptor">
        <summary-view v-bind:descriptor="descriptor">
            <label>
                Present
                <input type="checkbox" />
            </label>
        </summary-view>

        <zoomed-view
            v-bind:descriptor="descriptor"
            v-bind:observation="observation">

        </zoomed-view>
    </div>
</template>

<style src="PresenceDescriptor.styl" lang="stylus"></style>

<script>
    const SingleObservationDescriptor = require('../SingleObservationDescriptor');

    module.exports = {
        mixins: [SingleObservationDescriptor],
        name: 'presence-descriptor'
    };
</script>