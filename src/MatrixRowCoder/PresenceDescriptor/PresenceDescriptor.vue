<template>
    <div>
        <label>
            Present
            <input type="checkbox" />
        </label>
    </div>
</template>

<script>
    module.exports = {
        name: 'presence-descriptor',
        props: ['descriptor']
    };
</script>