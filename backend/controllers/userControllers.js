const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/userModel");
const generateToken = require("../config/jwtToken");

const register = async (req, res) => {
    try {
        const { firstname, lastname, email, mobile, password } = req.body;

        if (!email) {
            return res
                .status(400)
                .json({ error: 'You must enter an email address.' });
        }

        if (!firstname || !lastname) {
            return res.status(400).json({ error: 'You must enter your full name.' });
        }

        if (!password) {
            return res.status(400).json({ error: 'You must enter a password.' });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res
                .status(400)
                .json({ error: 'That email address is already in use.' });
        }

        const user = new User({
            firstname,
            lastname,
            email,
            mobile,
            password,
        });
        await user.save();

        res.status(200).json({
            success: true,
            user: {
                _id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                mobile: user.mobile,
                password: user.password,
                role: user.role,
            }
        });
    } catch (error) {
        res.status(400).json({
            error: ` Your request could not be processed. Please try again. ${error}`
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res
                .status(400)
                .json({ error: 'You must enter an email address.' });
        }

        if (!password) {
            return res.status(400).json({ error: 'You must enter a password.' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res
                .status(400)
                .send({ error: 'No user found for this email address.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                error: 'Password Incorrect'
            });
        }

        const payload = {
            id: user.id
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "3d" });

        if (!token) {
            throw new Error();
        }

        res.status(200).json({
            success: true,
            token: `Bearer ${token}`,
            user: {
                id: user.id,
                firstName: user.firstname,
                lastName: user.lastname,
                email: user.email,
                password: user.password,
                mobile: user.mobile,
                role: user.role
            }
        });
    } catch (error) {
        res.status(400).json({
            error: `Your request could not be processed. Please try again. ${error}`
        });
    }
};

module.exports = { register, login };