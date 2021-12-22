const express = require("express");
const VideoUrlPromise = require("../../models/VideoUrl");
const Party = require("../../models/Party");
const asyncHandler = require("../../Middleware/asyncHandler");

const router = express.Router();

// 후보 영상 urls
router.get("/:name", asyncHandler(async(req, res) => {
    let { name } = req.params;
    name = decodeURIComponent(name);

    const { _id } = await Party.findOne({ name });
    const urls = await VideoUrlPromise.find({ candidate: _id });

    res.status(200).json(urls);
}));

module.exports = router; 
