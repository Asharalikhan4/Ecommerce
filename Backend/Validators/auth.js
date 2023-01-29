import { check, validationResult } from "express-validator";


export const validateSignupRequest = [
    check("firstName")
    .notEmpty()
    .withMessage("First Name is required"),
    check("lastName")
    .notEmpty()
    .withMessage("Last Name is required"),
    check("email")
    .isEmail()
    .withMessage("Valid Email is required"),
    check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be alleast 6 character long"),
];

export const validateSigninRequest = [
    check("email")
    .isEmail()
    .withMessage("Valid Email is required"),
    check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be alleast 6 character long"),
];

export const isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);
    if(errors.array().length > 0){
        return res.status(400).json({ error: errors.array()[0].msg})
    }
    next();
}