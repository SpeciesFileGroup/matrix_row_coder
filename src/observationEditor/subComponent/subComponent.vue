<template>
    <div class="sub-component">
        There is a sub component here {{ message }}
    </div>
</template>

<style lang="stylus" src="subComponent.styl"></style>

<script>
    module.exports = {
        name: 'sub-component',
        computed: {
            message() {
                return this.$store.state.message;
            }
        }
    }
</script>