import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
// Importing Routes
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin/auth.js";

const app = express();

// Middleware
app.use(express.json());

// Database Connection
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
app.use("/api", authRoutes);
app.use("/api", adminRoutes);



// Server Connection
app.listen(process.env.PORT || 8080,() => {
    console.log(`Server is up at ${process.env.PORT}`);
})