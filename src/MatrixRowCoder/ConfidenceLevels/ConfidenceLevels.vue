<template>
    <div class="confidence-levels">
        <div>Confidences</div>
        <ul class="confidence-levels__list">
            <li class="confidence-levels__confidence-level" v-for="confidenceLevel in confidenceLevels">
                <label class="confidence-levels__checkbox-label" :style="{ borderColor: confidenceLevel.color }">
                    <span class="confidence-levels__checkbox-label-text">{{ confidenceLevel.name }}</span>
                    <input type="checkbox">
                </label>
            </li>
        </ul>
    </div>
</template>

<style src="ConfidenceLevels.styl" lang="stylus"></style>

<script>
    module.exports = {
        name: "confidence-levels",
        computed: {
            confidenceLevels: function() {
                return this.$store.state.confidenceLevels;
            }
        }
    };
</script>