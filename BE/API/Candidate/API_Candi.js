const express = require("express");
const router = express.Router();
const Candi = require("../../models/Candidate");
const Issue = require("../../models/Issue");
const Party = require("../../models/Party");
const asyncHandler = require("../../Middleware/asyncHandler");

// 후보자 정보
router.get("/:name", asyncHandler(async(req, res) => {
    let { name } = req.params;
    name = decodeURIComponent(name);
    const candidates = await Candi.findOne({ name });
    res.status(200).json(candidates);
}));

// 쟁점 이슈
router.get("/issue/:name", asyncHandler(async(req, res) => {
    let { name } = req.params;
    name = decodeURIComponent(name);
    const candidates = await Party.findOne({ name });
    const issuses = await Issue.find({ candidate: candidates.id });
    res.status(200).json(issuses);
}));

// 정당 가져오기
router.get("/party/:name", asyncHandler(async(req, res) => {
    let { name } = req.params;
    name = decodeURIComponent(name);
    const candidates = await Party.findOne({ name });
    res.status(200).json(candidates);
}));

module.exports = router;
