const router = require("express").Router();

const { createBlog, updateBlog, getSingleBlog, getAllBlogs, deleteBlog, likeBlog, dislikeBlog } = require("../controllers/blogController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

router.post("/create-blog",authMiddleware, isAdmin, createBlog);
router.put("/likes", authMiddleware, isAdmin, likeBlog);
router.put("/dislikes", authMiddleware, isAdmin, dislikeBlog);
router.put("/:id", authMiddleware, isAdmin, updateBlog);
router.get("/:id", getSingleBlog);
router.get("/", getAllBlogs);
router.delete("/:id", authMiddleware, isAdmin, deleteBlog);

module.exports = router;