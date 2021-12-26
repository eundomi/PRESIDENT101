const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRouter = require("./API/User/API_User");
const candiRouter = require("./API/Candidate/API_Candi");
const promiseRouter = require("./API/Promise/API_Promise");
const likeRouter = require("./API/Like/API_Like");
const videoUrlRouter = require("./API/VideoUrl/API_VideoUrl");

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_ID}:${process.env.MONGO_PW}@cluster0.q1vib.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
);
mongoose.connection.on("connected", () => {
    console.log("몽고DB에 연결되었습니다.");
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors({
    origin: true,
    credentials: true
}));
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/candidate", candiRouter);
app.use("/api/promise", promiseRouter);
app.use("/api/like", likeRouter);
app.use("/api/videoUrl", videoUrlRouter);

app.use((req, res, next) => {
    res.status(404).json({ msg: "요청하신 페이지를 찾을 수 없습니다." });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ msg: "Something broke!" });
});

app.listen(PORT, () => {
    console.log(`${PORT}번으로 서버가 열렸습니다.`);
});
