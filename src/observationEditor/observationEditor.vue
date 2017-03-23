<template>
    <div class="observation-editor">
        {{ message }}
    </div>
</template>

<style lang="stylus" src="observationEditor.styl"></style>

<script>
    module.exports = {
        data () {
            return {
                message: this.$store.state.message
            }
        }
    }
</script>