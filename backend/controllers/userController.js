const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const { generateToken } = require("../config/jwtToken");
const User = require("../models/userModel");
const { validateMongodbId } = require("../utils/validateMongodbId");
const { generateRefreshToken } = require("../config/refershToken");

const register = asyncHandler(async(req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({email});
    if(!findUser){
        const newUser = await User.create(req.body);
        res.json(newUser);
    } else {
        throw new Error("User Already Exists.");
    }
});

const login = asyncHandler(async(req, res) => {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });
    if(findUser && await findUser.isPasswordMatched(password)){
        const refreshToken = await generateRefreshToken(findUser?._id);
        const updateuser = await User.findByIdAndUpdate(findUser?.id, {
            refreshToken: refreshToken,
        },{
            new: true,
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
        });
        res.json({
            _id: findUser?._id,
            firstname: findUser?.firstname,
            lastname: findUser?.lastname,
            email: findUser?.email,
            mobile: findUser?.mobile,
            token: generateToken(findUser?._id),
        });
    } else {
        throw new Error("Invalid Credentials")
    }
});

const handleRefreshToken = asyncHandler(async(req, res) => {
    const cookie = req.cookies;
    if(!cookie?.refreshToken){
        throw new Error("No refresh token in cookies.");
    };
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    if(!user){
        throw new Error("No refresh token present");
    };
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
        if(err || user.id !== decoded.id){
            throw new Error("There is something wrong with refresh token");
        };
        const accessToken = generateToken(user?._id);
        res.json({ accessToken });
    });
});

const logout = asyncHandler(async(req, res) => {
    const cookie = req.cookies;
    if(!cookie?.refreshToken) throw new Error("No refresh token in cookies");
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    if(!user){
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
        });
        return res.sendStatus(204);
    }
    await User.findOneAndUpdate({ refreshToken }, {
        refreshToken: "",
    });
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
    });
    return res.sendStatus(204);
});


const getAllUsers = asyncHandler(async(req, res) => {
    try{
        const allUsers = await User.find();
        res.json(allUsers);
    } catch (error) {
        throw new Error(error);
    }
});

const getSingleUser = asyncHandler(async(req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try{
        const singleUser = await User.findById(id);
        res.json(singleUser);
    } catch (error){
        throw new Error(error);
    }
});

const deleteUser = asyncHandler(async(req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try{
        const deletedUser = await User.findByIdAndDelete(id);
        res.json({
            deletedUser,
        });
    } catch (error){
        throw new Error(error);
    }
});

const updateUser = asyncHandler(async(req, res) => {
    const { _id } = req.user;
    validateMongodbId(_id);
    try{
        const updatedUser = await User.findByIdAndUpdate(_id, {
            firstname: req?.body?.firstname,
            lastname: req?.body?.lastname,
            email: req?.body?.email,
            mobile: req?.body?.mobile,
        }, {
            new: true,
        });
        res.json(updatedUser);
    } catch(error){
        throw new Error(error);
    }
});

const blockUser = asyncHandler(async(req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try{
        const blockUser = await User.findByIdAndUpdate(id, {
            idBlocked: true,
        }, {
            new: true,
        });
        res.json({
            message: "User Blocked."
        });
    } catch(error){
        throw new Error(error);
    }
});

const unblockUser = asyncHandler(async(req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try{
        const unblockUser = await User.findByIdAndUpdate(id, {
            isBlocked: false,
        },{
            new: true,
        });
        res.json({
            message: "User unblocked."
        });
    } catch(error){
        throw new Error(error);
    }
});

module.exports = { register, login, getAllUsers, getSingleUser, deleteUser, updateUser, blockUser, unblockUser, handleRefreshToken, logout };