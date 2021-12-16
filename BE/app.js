const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path")

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
app.use(express.static(path.join(__dirname, "public")))

app.get("/", (req, res) => {
    res.send("hello");
});

app.listen(PORT, () => {
    console.log(`${PORT}번으로 서버가 열렸습니다.`);
});
