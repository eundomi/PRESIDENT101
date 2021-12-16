const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("hello");
});

app.listen(PORT, () => {
    console.log(`${PORT}번으로 서버가 열렸습니다.`);
});
