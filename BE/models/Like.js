const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    issueId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "issue",
    },
});

module.exports = mongoose.model("like", likeSchema);