const asyncHandler = require("express-async-handler");

const Blog = require("../models/blogModel");
const User = require("../models/userModel");
const { validateMongodbId } = require("../utils/validateMongodbId");


const createBlog = asyncHandler(async (req, res) => {
    try {
        const newBlog = await Blog.create(req.body);
        res.json(newBlog);
    } catch (error) {
        throw new Error(error);
    }
});

const updateBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const updateBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updateBlog);
    } catch (error) {
        throw new Error(error);
    }
});

const getSingleBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const getBlog = await Blog.findById(id).populate("likes").populate("dislikes");
        const updateViews = await Blog.findByIdAndUpdate(id, {
            $inc: { numViews: 1 }
        }, { new: true });
        res.json(getBlog);
    } catch (error) {
        throw new Error(error);
    }
});

const getAllBlogs = asyncHandler(async (req, res) => {
    try {
        const getAllBlogs = await Blog.find();
        res.json(getAllBlogs);
    } catch (error) {
        throw new Error(error);
    }
});

const deleteBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const deletedBlog = await Blog.findByIdAndDelete(id);
        res.json(deletedBlog);
    } catch (error) {
        throw new Error(error);
    }
});

const likeBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.body;
    validateMongodbId(blogId);
    // Find the blog you want to be liked.
    const blog = await Blog.findById(blogId);
    // Find the logined user
    const loginUserId = req?.user?._id;
    // Find if the user has liked the post
    const isLiked = blog?.isLiked;
    // Find if the user disliked the post
    const alreadyDisliked = blog?.dislikes?.find((userId) => userId.toString() === loginUserId?.toString());
    if (alreadyDisliked) {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $pull: { dislikes: loginUserId },
            isDisliked: true,
        }, {
            new: true,
        });
        res.json(blog);
    }
    if (isLiked) {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $pull: { likes: loginUserId },
            isLiked: false,
        }, {
            new: true,
        });
        res.json(blog);
    } else {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $push: { likes: loginUserId },
            isLiked: true,
        }, {
            new: true,
        });
        res.json(blog);
    }
});

const dislikeBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.body;
    validateMongodbId(blogId);
    // Find the blog you want to be liked.
    const blog = await Blog.findById(blogId);
    // Find the logined user
    const loginUserId = req?.user?._id;
    // Find if the user has liked the post
    const isDisLiked = blog?.isDisliked;
    // Find if the user disliked the post
    const alreadyLiked = blog?.likes?.find((userId) => userId.toString() === loginUserId?.toString());
    if (alreadyLiked) {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $pull: { likes: loginUserId },
            isLiked: false,
        }, {
            new: true,
        });
        res.json(blog);
    }
    if (isDisLiked) {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $pull: { dislikes: loginUserId },
            isDisliked: false,
        }, {
            new: true,
        });
        res.json(blog);
    } else {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $push: { dislikes: loginUserId },
            isDisliked: true,
        }, {
            new: true,
        });
        res.json(blog);
    }
});

module.exports = { createBlog, updateBlog, getSingleBlog, getAllBlogs, deleteBlog, likeBlog, dislikeBlog };