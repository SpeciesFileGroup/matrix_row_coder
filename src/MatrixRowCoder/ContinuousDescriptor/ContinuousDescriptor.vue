<template>
    <div>
        <label>
            Amount:
            <input type="number" :value="continuousValue">
        </label>
        <label>
            Unit:
            <input type="text" :value="continuousUnit">
        </label>
    </div>
</template>

<script>
    const ActionNames = require('../../store/actions/actions').ActionNames;
    const GetterNames = require('../../store/getters/getters').GetterNames;

    module.exports = {
        created: function() {
            const requestObservationArgs = {
                descriptorId: this.$props.descriptor.id,
                otuId: this.$store.state.taxonId
            };

            console.log(requestObservationArgs);

            this.$store.dispatch(ActionNames.RequestObservations, requestObservationArgs);
        },
        name: 'continuous-descriptor',
        props: ['descriptor'],
        computed: {
            continuousValue: function() {
                const observations = this.$store.getters[GetterNames.GetObservationsForDescriptorId](this.$props.descriptor.id);
                if (observations.length > 0) {
                    return observations[0].continuousValue;
                }
                return null;
            },
            continuousUnit: function() {
                const observations = this.$store.getters[GetterNames.GetObservationsForDescriptorId](this.$props.descriptor.id);
                if (observations.length > 0) {
                    return observations[0].continuousUnit;
                }
                return null;
            }
        }
    };
</script>