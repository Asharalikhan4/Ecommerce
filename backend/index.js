require('dotenv').config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const morgan = require("morgan");


const dbConnect = require("./config/dbConnect");
const authRouter = require("./routes/authRoute");
const productRouter = require("./routes/productRoute");
const blogRouter = require("./routes/blogRoute");
const productCategoryRouter = require("./routes/productCategoryRoute");
const { notFound, errorHandler } = require('./middlewares/errorHandler');

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.use("/api/user", authRouter);
app.use("/api/product", productRouter);
app.use("/api/blog", blogRouter);
app.use("/api/category", productCategoryRouter);
app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT || 3030, () => {
    dbConnect();
    console.log(`Server is up at ${process.env.PORT}`);
});