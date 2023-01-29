import * as dotenv from "dotenv";
dotenv.config();
import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const signup = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec((error, user) => {
            if (user) return res.status(400).json({ message: "User already registered." });
            const { firstName, lastName, email, password } = req.body;
            const _user = new User({
                firstName,
                lastName,
                email,
                password,
                username: Math.random().toString()
            });
            _user.save((data) => {
                if (error) {
                    return res.status(400).json({ message: "Something went wrong " });
                };
                if (data) {
                    return res.status(201).json({ message: "User created successfully" });
                };
            });
        });
}

export const signin = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec((error, user) => {
            if (error) return res.status(400).json({ error });
            if (user) {
                if (user.authenticate(req.body.password)) {
                    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
                    const { _id, firstName, lastName, fullName, email, role } = user;
                    res.status(200).json({ token, user: { _id, firstName, lastName, fullName, email, role } });
                } else {
                    return res.status(400).json({ message: "Invalid password" })
                }
            } else {
                return res.status(400).json({ message: "Something went wrong." })
            }
        });
};

export const requireSignin = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user  = user;
    next();
}