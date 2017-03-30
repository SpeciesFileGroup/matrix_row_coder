const expect = require('chai').expect;
const store = require('../../../src/store/store').newStore();
const ActionNames = require('../../../src/store/actions/actions').ActionNames;
const MutationNames = require('../../../src/store/mutations/mutations').MutationNames;

describe(`setCharacterStateCheck mutation`, () => {
    before(done => {
        store.dispatch(ActionNames.RequestDescriptors)
            .then(_ => done());
    });

    it(`should set the character state isChecked to the given boolean`, () => {
        const args = {
            id: 33,
            isChecked: true
        };

        store.commit(MutationNames.SetCharacterStateCheck, args);
        const qualitativeDescriptor = store.state.descriptors[0];
        qualitativeDescriptor.characterStates.forEach(cs => {
            if (cs.id === args.id)
                expect(cs.isChecked).to.be.true;
            else
                expect(cs.isChecked).to.be.false;
        });
    });
});