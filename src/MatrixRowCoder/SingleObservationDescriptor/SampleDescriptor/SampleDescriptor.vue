<template>
    <div class="sample-descriptor">
        <summary-view v-bind:descriptor="descriptor">
            <label>
                Min:
                <input type="number">
            </label>
            to
            <label>
                Max:
                <input type="number">
            </label>
            <label>
                Units:
                <input type="text">
            </label>

            <label>
                n:
                <input type="number">
            </label>
        </summary-view>

        <zoomed-view
            v-bind:descriptor="descriptor"
            v-bind:observation="observation">

        </zoomed-view>
    </div>
</template>

<script>
    const SingleObservationDescriptor = require('../SingleObservationDescriptor');

    module.exports = {
        mixins: [SingleObservationDescriptor],
        name: 'sample-descriptor'
    };
</script>