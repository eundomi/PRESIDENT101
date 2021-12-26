const express = require("express");
const User = require("../../models/User");
const Issue = require("../../models/Issue");
const Like = require("../../models/Like");
const { auth } = require("../../Middleware/authMiddleware");
const asyncHandler = require("../../Middleware/asyncHandler");

const router = express.Router();

router.post("/upLike", auth, asyncHandler(async (req, res) => {
    const { shortId } = req.decoded;
    const { issueId } = req.body;
    const user = await User.findOne({ shortId });
    const like = await Like.create({ userId: user.id, issueId });
    await Issue.updateOne({ _id: issueId }, { $inc: { like: 1 }})
    res.status(201).json({ msg: "해당 입장에 추천을 완료했습니다." });
}));

router.post("/unLike", auth, asyncHandler(async (req, res) => {
    const { shortId } = req.decoded;
    const { issueId } = req.body;
    const user = await User.findOne({ shortId });
    await Promise.all([Like.deleteOne({ $and: [{ userId: user.id, issueId }] }), Issue.updateOne({ _id: issueId }, { $inc: { like: -1 }})])
    res.status(201).json({ msg: "해당 입장에 추천을 취소했습니다." });
}))

router.get("/checkedList", auth, asyncHandler(async (req, res) => {
    const { shortId } = req.decoded;
    const user = await User.findOne({ shortId });
    const checkedIssues = await Like.find({ userId: user.id });
    res.status(200).json(checkedIssues);
}));

router.delete("/delete", auth, asyncHandler(async (req, res) => {
    const { shortId } = req.decoded;
    const { issueId } = req.body;
    const user = await User.findOne({ shortId });
    const what = await Like.deleteOne({ $and: [{ userId: user.id, issueId }] });
    res.status(200).json({ msg: "삭제가 완료되어라 제발."});
}))

module.exports = router;
