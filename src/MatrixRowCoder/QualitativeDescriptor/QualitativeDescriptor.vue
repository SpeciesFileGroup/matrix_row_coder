<template>
    <ul class="qualitative-descriptor">
        <li v-for="characterState in descriptor.characterStates">
            <label>
                <input type="checkbox" />
                {{ characterState.label }}: {{ characterState.name }}
            </label>
        </li>
    </ul>
</template>

<style src="QualitativeDescriptor.styl" lang="stylus"></style>

<script>
    module.exports = {
        name: 'qualitative-descriptor',
        props: ['descriptor']
    };
</script>