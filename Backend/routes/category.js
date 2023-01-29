import express from "express";
const router = express.Router();
import { addCategory, getCategories } from "../controllers/category.js";
import { adminMiddleware, requireSignin } from "../middleware/index.js";

router.post("/category/create", requireSignin, adminMiddleware, addCategory);
router.get("/category/getcategory", getCategories);

export default router;