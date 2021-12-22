const express = require("express");
const CandiPromise = require("../../models/Promise");
const Party = require("../../models/Party");
const asyncHandler = require("../../Middleware/asyncHandler");

const router = express.Router();

// 후보자 공약
router.get("/:name", asyncHandler(async(req, res) => {
    let { name } = req.params;
    name = decodeURIComponent(name);

    const { _id } = await Party.findOne({ name });
    const promises = await CandiPromise.find({ candidate: _id });

    res.status(200).json(promises);
}));

module.exports = router; 
