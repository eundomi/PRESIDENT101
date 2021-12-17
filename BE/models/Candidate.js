const mongoose = require("mongoose");
const shortId = require("./types/short-id");

const snsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
});

const carrierSchema = new mongoose.Schema({
    year: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
});

const candidateSchema = new mongoose.Schema({
    shortId,
    name: {
        type: String,
        required: true,
    },
    birth: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    sign: {
        type: String,
        required: true,
    },
    job: {
        type: String,
        required: true,
    },
    religion: {
        type: String,
        required: true,
    },
    family: {
        type: String,
        required: true,
    },
    companion: {
        type: String,
        required: true,
    },
    sns: [snsSchema],
    conviction: {
        type: [String],
        required: true,
        default: "없음.",
    },
    edu: {
        type: [String],
        required: true,
    },
    bloodType: {
        type: String,
        required: true,
    },
    army: {
        type: String,
        required: true,
        default: "해당없음.",
    },
    property: {
        type: String,
        required: true,
    },
    source: {
        type: String,
        required: true,
    },
    carrier: [carrierSchema],
});

module.exports = mongoose.model("candidate", candidateSchema);
