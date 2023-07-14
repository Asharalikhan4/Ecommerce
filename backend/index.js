require('dotenv').config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");


const dbConnect = require("./config/dbConnect");
const authRoutes = require("./routes/authRoutes");
const { notFound, errorHandler } = require('./middlewares/errorHandler');


app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.use("/api/user", authRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT || 3030, () => {
    dbConnect();
    console.log(`Server is up at ${process.env.PORT}`);
});