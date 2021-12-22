const mongoose = require("mongoose");
const shortId = require("./types/short-id");

const phoneSchema = new mongoose.Schema({
    agency: {
        type: Number,
        required: true,
        index: true,
    },
    number: {
        type: String,
        required: true,
    },
});

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
    phone: phoneSchema,
});

module.exports = mongoose.model("user", userSchema);
