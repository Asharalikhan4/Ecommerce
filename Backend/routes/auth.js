import express from "express";
const router = express.Router();
import { signup, signin, requireSignin } from "../controllers/auth.js";

router.post("/signup", signup);
router.post("/signin", signin);
// router.post("/profile", requireSignin, (req, res) => {
//     res.status(200).json({user : "profile"});
// });

export default router;