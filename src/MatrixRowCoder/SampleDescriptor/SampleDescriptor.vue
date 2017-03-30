<template>
    <div>
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
    </div>
</template>

<script>
    module.exports = {
        name: 'sample-descriptor',
        props: ['descriptor']
    };
</script>