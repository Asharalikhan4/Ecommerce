import express from "express";
const router = express.Router();
import { signup, signin } from "../controllers/auth.js";
import { isRequestValidated, validateSigninRequest, validateSignupRequest } from "../Validators/auth.js";

router.post("/signup", validateSignupRequest, isRequestValidated, signup);
router.post("/signin", validateSigninRequest, isRequestValidated, signin);

export default router;