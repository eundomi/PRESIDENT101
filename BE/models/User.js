const mongoose = require("mongoose");
const shortId = require("./types/short-id");

const userSchema = new mongoose.Schema({
    shortId,
    userId: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("user", userSchema);
