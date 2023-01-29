import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";

const app = express();

mongoose.set('strictQuery', true);
await mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Database Connected."))
.catch(err => console.log(err));


// Routes
app.get("/",(req, res) => {
    res.send("Hello World");
});


// Connecting with server
app.listen(process.env.PORT || 8080,() => {
    console.log(`Server is up at ${process.env.PORT}`);
})