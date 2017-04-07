module.exports = {
    requestAllObservationsForStore(store) {
        const otuId = store.state.taxonId;
        return Promise.all(store.state.descriptors.map(d => {
            return store.dispatch(ActionNames.RequestObservation, {
                descriptorId: d.id,
                otuId
            });
        }));
    }
};