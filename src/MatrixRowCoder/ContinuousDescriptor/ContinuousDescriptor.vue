<template>
    <div>
        <label>
            Amount:
            <input type="number">
        </label>
        <label>
            Unit:
            <input type="text">
        </label>
    </div>
</template>

<script>
    module.exports = {
        name: 'continuous-descriptor',
        props: ['descriptor']
    };
</script>