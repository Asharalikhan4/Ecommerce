import express from "express";
const router = express.Router();
import { signin, signup } from "../../controllers/admin/auth.js";

router.post("/admin/signup", signup);
router.post("/admin/signin", signin);

export default router;