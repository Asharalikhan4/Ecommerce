import * as dotenv from "dotenv";
dotenv.config();
import User from "../../models/user.js";
import jwt from "jsonwebtoken";

export const signup = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec((error, user) => {
            if (user) return res.status(400).json({ message: "Admin already registered." });
            const { firstName, lastName, email, password } = req.body;
            const _user = new User({
                firstName,
                lastName,
                email,
                password,
                username: Math.random().toString(),
                role: "admin"
            });
            _user.save((data) => {
                if (error) {
                    return res.status(400).json({ message: "Something went wrong " });
                };
                if (data) {
                    return res.status(201).json({ message: "Admin created successfully" });
                };
            });
        });
}

export const signin = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec((error, user) => {
            if (error) return res.status(400).json({ error });
            if (user) {
                if (user.authenticate(req.body.password) && user.role === "admin") {
                    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
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