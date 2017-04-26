const IllegalBaseClassCallError = `Illegal call to base class IMatrixRowCoderRequest`;

class IMatrixRowCoderRequest {
    getMatrixRow() {
        throw IllegalBaseClassCallError;
    }

    getObservations() {
        throw IllegalBaseClassCallError;
    }

    getDescriptorNotes() {
        throw IllegalBaseClassCallError;
    }

    getDescriptorDepictions() {
        throw IllegalBaseClassCallError;
    }

    getObservationNotes() {
        throw IllegalBaseClassCallError;
    }

    getObservationDepictions() {
        throw IllegalBaseClassCallError;
    }

    getObservationConfidences() {
        throw IllegalBaseClassCallError;
    }

    getObservationCitations() {
        throw IllegalBaseClassCallError;
    }

    getConfidenceLevels() {
        throw IllegalBaseClassCallError;
    }
}

module.exports = IMatrixRowCoderRequest;