const express = require("express");
const User = require("../../models/User");
const Issue = require("../../models/Issue");
const Like = require("../../models/Like");
const { auth } = require("../../Middleware/authMiddleware");
const asyncHandler = require("../../Middleware/asyncHandler");

const router = express.Router();

router.post("/upLike", auth, asyncHandler(async (req, res) => {
    const { shortId, issueId } = req.body;
    const like = await Like.create({ userId: shortId, issueId });
    await Issue.updateOne({ id: issueId }, { $inc: { like: 1 }})
    res.status(201).json({ msg: "해당 입장에 추천을 완료했습니다." })
}));

router.post("/unLike", auth, asyncHandler(async (req, res) => {
    const { shortId, issuedId } = req.body;
    res.send("hello")
}))

router.get("/checkedList", auth, asyncHandler(async (req, res) => {
    const { shortId } = req.body;
    const checkedIssues = await Like.find({ userId: shortId });
    res.status(200).json(checkedIssues);
}));

module.exports = router;
