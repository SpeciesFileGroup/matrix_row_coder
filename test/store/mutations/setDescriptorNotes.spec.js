const expect = require('chai').expect;
const store = require('../../../src/store/store').newStore();
const MutationNames = require('../../../src/store/mutations/mutations').MutationNames;
const TestHelpers = require('../../testHelpers');

describe(`SetDescriptorNotes mutation`, () => {
    before(done => {
        TestHelpers.requestMatrixRowForStore(store)
            .then(_ => done());
    });

    it(`should transform note data and set it on the descriptor`, () => {
        const descriptorId = store.state.descriptors[0].id;
        const notes = [
            {
                id: 8888,
                text: "Foo bar baz",
                note_object_type: "Descriptor",
                note_object_id: descriptorId
            }
        ];
        store.commit(MutationNames.SetDescriptorNotes, {
            descriptorId,
            notes
        });

        const d = store.state.descriptors.find(d => d.id === descriptorId);
        expect(d.notes).to.deep.equal([
            {
                text: "Foo bar baz",
                noteIsForA: "Descriptor",
                noteIsFor: descriptorId
            }
        ]);
    });
});