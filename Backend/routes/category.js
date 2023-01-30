import express from "express";
const router = express.Router();
import { addCategory, getCategories } from "../controllers/category.js";
import { adminMiddleware, requireSignin } from "../middleware/index.js";
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

router.post("/category/create", requireSignin, adminMiddleware, upload.single("categoryImage"), addCategory);
router.get("/category/getcategory", getCategories);

export default router;