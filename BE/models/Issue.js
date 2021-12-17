const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
    candidate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "party",
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    source: {
        type: String,
        required: true,
    },
    like: {
        type: Number,
        required: true,
        default: 0
    }
});

module.exports = mongoose.model("issue", issueSchema);
