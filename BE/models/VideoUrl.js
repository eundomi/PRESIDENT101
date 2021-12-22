const mongoose = require("mongoose");
const shortId = require("./types/short-id");

const videoUrlSchema = new mongoose.Schema({
    shortId,
    candidate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "party",
        required: true
    },
    urls: {
        type: [String],
        required: true,
    },
}); 

module.exports = mongoose.model("videoUrl", videoUrlSchema, "videoUrls");
