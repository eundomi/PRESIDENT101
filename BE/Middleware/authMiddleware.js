const jwt = require("jsonwebtoken");
const env = require("dotenv");
env.config();

const secretKey = process.env.SECRET_KEY;
exports.auth = (req, res, next) => {
    try {
        const token = req.cookies.x_auth;
        req.decoded = jwt.verify(token, secretKey);
        next();
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(419).json({
                code: 419,
                msg: "토큰이 만료되었습니다.",
            });
        }
        if (err.name === "JsonWebTokenError") {
            return res.status(401).json({
                code: 401,
                msg: "유효하지 않은 토큰입니다.",
            });
        }
    }
};
