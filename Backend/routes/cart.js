import express from "express";
import { addItemToCart } from "../controllers/cart.js";
const router = express.Router();
import { userMiddleware, requireSignin } from "../middleware/index.js";

router.post("/user/cart/addtocart", requireSignin, userMiddleware, addItemToCart);

export default router;