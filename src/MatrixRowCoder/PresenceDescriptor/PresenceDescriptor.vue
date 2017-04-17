<template>
    <div class="presence-descriptor">
        <div>
            <h2 class="presence-descriptor__title">PRESENCE</h2>
            <label>
                Present
                <input type="checkbox" />
            </label>
        </div>
    </div>
</template>

<style src="PresenceDescriptor.styl" lang="stylus"></style>

<script>
    module.exports = {
        name: 'presence-descriptor',
        props: ['descriptor']
    };
</script>