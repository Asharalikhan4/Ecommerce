import express from "express";
const router = express.Router();
import { adminMiddleware, requireSignin } from "../middleware/index.js";
import { createProduct } from "../controllers/product.js";
import multer from "multer";
import shortid from "shortid";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(path.dirname(__dirname), "uploads"));
    },
    filename: function(req, file, cb){
        cb(null, shortid.generate() + "-" + file.originalname);
    }
});
const upload = multer({ storage });

router.post("/product/create", requireSignin, adminMiddleware, upload.array("productPicture"), createProduct);

export default router;