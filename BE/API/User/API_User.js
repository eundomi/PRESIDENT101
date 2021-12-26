const express = require("express");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const { auth } = require("../../Middleware/authMiddleware");
const env = require("dotenv");
const asyncHandler = require("../../Middleware/asyncHandler")

env.config();

const router = express.Router();
const secretKey = process.env.SECRET_KEY;

function isValid_input(userId, userName, email, password, phone) {
    if (!userId || !userName || !email || !password || !phone) return false;
    return true;
}

function isValid_login(userId, password) {
    if (!userId || !password) return false;
    return true;
}

function makeHashPW(password, salt) {
    return crypto
        .createHash("sha512")
        .update(password + salt)
        .digest("hex");
}

function makeToken(payload) {
    // 만료시간 : 60초 * 60 이므로 1시간 유효한 토큰 발급 => 24시간(하루) 지속
    return jwt.sign({ "shortId" : payload }, secretKey, { expiresIn: 60 * 60 * 24 });
}

router.post("/join", asyncHandler(async(req, res) => {
    const { userId, userName, email, password, phone } = req.body;
    if (!isValid_input(userId, userName, email, password, phone)) {
        return res.status(400).json({ msg: "이메일과 비밀번호를 확인해주세요" });
    }
    const user = await User.findOne({ email });
    if (!user) {
        const salt = String(Math.round(new Date().valueOf() * Math.random()));
        const hashedPW = makeHashPW(password, salt);
        const newUser = { userId, userName, email, password: hashedPW, salt, number: phone };
        await User.create(newUser);
        res.status(201).json({ msg: "회원가입이 완료되었습니다." });
    } else {
        res.status(400).json({ msg: "이미 같은 이메일이 존재합니다." });
    }
}));

router.post("/login", asyncHandler(async(req, res) => {
    const { userId, password } = req.body;
    if (!isValid_login(userId, password)) {
        return res.status(400).json({ msg: "이메일과 비밀번호를 확인해주세요" });
    }
    const user = await User.findOne({ userId });
    if (!user) {
        return res.status(400).json({ msg: "가입되지 않은 회원입니다" });
    }
    const hashedPW = makeHashPW(password, user.salt);
    if (hashedPW === user.password) {
        const token = makeToken(user.shortId);
        return res
            .status(201)
            .cookie("x_auth", token, {
                maxAge: 1000 * 60 * 60 * 24,
                httpOnly: true,
            })
            .json({
                user,
                msg: "로그인 되었습니다. 토큰을 확인해 주세요",
                token
        });
    } else {
        return res.status(400).json({ msg: "이메일과 비밀번호가 일치하지 않습니다." });
    }
}));

router.get("/payload", auth, asyncHandler(async(req, res) => {
    const { shortId } = req.decoded;
    const user = await User.findOne({ shortId })
    const userName = user.userName
    return res.status(200).json({
        code: 200,
        msg: "정상 토큰입니다",
        userName,
    });
}));

router.get("/logout", auth, (req, res) => {
    return res.cookie("x_auth", "").json({
        logoutSuccess: true
    });    
})

module.exports = router;