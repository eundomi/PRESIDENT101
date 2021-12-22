const mongoose = require("mongoose");

const partySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    party: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("party", partySchema);
