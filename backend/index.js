require('dotenv').config();
const express = require("express");
const app = express();


const dbConnect = require("./config/dbConnect");
const authRoutes = require("./routes/authRoutes");


app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.use("/api/user", authRoutes);

app.listen(process.env.PORT || 3030, () => {
    dbConnect();
    console.log(`Server is up at ${process.env.PORT}`);
});