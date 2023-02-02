import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Importing Routes
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin/auth.js";
import categoryRoutes from "./routes/category.js";
import productRoutes from "./routes/product.js";
import cartRoutes from "./routes/cart.js";

const app = express();

// Middleware
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use(cors());

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
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);


// Server Connection
app.listen(process.env.PORT || 8080,() => {
    console.log(`Server is up at ${process.env.PORT}`);
})