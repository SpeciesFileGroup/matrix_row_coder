<template>
    <div class="confidence-levels">
        <div>Confidences</div>
        <ul class="confidence-levels__list">
            <li class="confidence-levels__confidence-level" v-for="confidenceLevel in confidenceLevels">
                <label class="confidence-levels__checkbox-label" :style="{ borderColor: confidenceLevel.color }">
                    <span class="confidence-levels__checkbox-label-text">{{ confidenceLevel.name }}</span>
                    <input
                        type="checkbox"
                        :checked="confidenceLevel.isChecked"
                        @change="updateFromCheckbox(confidenceLevel, $event)">
                </label>
            </li>
        </ul>
    </div>
</template>

<style src="ConfidenceLevels.styl" lang="stylus"></style>

<script>
    module.exports = {
        name: "confidence-levels",
        props: {
            selectedIds: {
                type: Array,
                "default": function() {
                    return [];
                }
            }
        },
        computed: {
            confidenceLevels: function() {
                return this.$store.state.confidenceLevels.map(cl => {
                    return Object.assign({}, cl, {
                        isChecked: this.$props.selectedIds.indexOf(cl.id) > -1
                    });
                });
            }
        },
        methods: {
            updateFromCheckbox(confidenceLevel, event) {
                this.$emit('set-confidence', {
                    confidenceId: confidenceLevel.id,
                    value: event.target.checked
                });
            }
        }
    };
</script>