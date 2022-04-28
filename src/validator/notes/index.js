const InvariantError = require("../../exceptions/InvariantError");
const { NotesPayloadSchema } = require("./schema");

const NotesValidator = {
    validateNotesPayload: (payload) => {
        const validateResult = NotesPayloadSchema.validate(payload);

        if (validateResult.error) {
            throw new InvariantError(validateResult.error.message);
        }
    },
};

module.exports = NotesValidator;
