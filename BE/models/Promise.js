const mongoose = require("mongoose");
const shortId = require("./types/short-id");

const promiseSchema = new mongoose.Schema({
    shortId,
    candidate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "party",
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    data: {
        type: [String],
        required: true,
    },
}); 

module.exports = mongoose.model("promise", promiseSchema);
