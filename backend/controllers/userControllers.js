const User = require("../models/userModel");

const register = async(req, res) => {
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
            }
        });
    } catch (error) {
        res.status(400).json({
            error: ` Your request could not be processed. Please try again. ${error}`
        });
    }
};

module.exports = { register };