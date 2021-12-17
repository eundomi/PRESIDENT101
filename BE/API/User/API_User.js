const express = require("express");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const { auth } = require("../../Middleware/authMiddleware");
const env = require("dotenv");
env.config();

const router = express.Router();
const secretKey = process.env.SECRET_KEY;

function isValid_input(email, password) {
    if (!email || !password) return false;
    return true;
}

function makeHashPW(password, salt) {
    return crypto
        .createHash("sha512")
        .update(password + salt)
        .digest("hex");
}

function makeToken(email) {
    // 60초 * 60 이므로 1시간 유효한 토큰 발급
    return jwt.sign({ email }, secretKey, { expiresIn: 60 * 60 });
}

router.post("/join", async (req, res) => {
    const { email, password } = req.body;
    if (!isValid_input(email, password)) {
        res.status(400).json({ msg: "이메일과 비밀번호를 확인해주세요" });
    }
    const user = await User.findOne({ email });
    if (!user) {
        const salt = String(Math.round(new Date().valueOf() * Math.random()));
        const hashedPW = makeHashPW(password, salt);
        const newUser = { email, password: hashedPW, salt };
        await User.create(newUser);
        res.status(201).json({ msg: "회원가입이 완료되었습니다." });
    } else {
        res.status(400).json({ msg: "이미 같은 이메일이 존재합니다." });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!isValid_input(email, password)) {
        res.status(400).json({ msg: "이메일과 비밀번호를 확인해주세요" });
    }
    const user = await User.findOne({ email });
    if (!user) {
        res.status(400).json({ msg: "가입되지 않은 회원입니다" });
    }
    const hashedPW = makeHashPW(password, user.salt);
    if (hashedPW === user.password) {
        res.status(201).json({
            user,
            msg: "로그인 되었습니다. 토큰을 확인해 주세요",
            token: makeToken(email),
        });
    } else {
        res.status(400).json({ msg: "이메일과 비밀번호가 일치하지 않습니다." });
    }
});

router.get("/payload", auth, (req, res) => {
    const { email } = req.decoded;
    return res.status(200).json({
        code: 200,
        msg: "정상 토큰입니다",
        data: email,
    });
});

module.exports = router;
