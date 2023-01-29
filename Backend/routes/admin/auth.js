import express from "express";
const router = express.Router();
import { signin, signup } from "../../controllers/admin/auth.js";
import { isRequestValidated, validateSigninRequest, validateSignupRequest } from "../../Validators/auth.js";

router.post("/admin/signup", validateSignupRequest, isRequestValidated, signup);
router.post("/admin/signin",validateSigninRequest, isRequestValidated, signin);

export default router;