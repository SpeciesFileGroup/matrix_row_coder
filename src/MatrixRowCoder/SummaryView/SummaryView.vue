<template>
    <div class="summary-view">
        <h2 class="summary-view__title">{{ title }}</h2>
        <p>
            <button @click="toggleZoom" type="button">Zoom</button>
        </p>
        <div>
            <slot></slot>
        </div>
    </div>
</template>

<style src="SummaryView.styl" lang="stylus"></style>

<script>
    module.exports = {
        name: "summary-view",
        props: ['title'],
        methods: {
            toggleZoom: function(event) {
                this.$emit('toggleZoom');
            }
        }
    };
</script>