const router = require("express").Router();

const { createCategory, updateCategory, deleteCategory, getCategory, getAllCategory } = require("../controllers/productCategoryController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");


router.post("/create-category",authMiddleware, isAdmin, createCategory);
router.put("/:id", authMiddleware, isAdmin, updateCategory);
router.delete("/:id",authMiddleware, isAdmin, deleteCategory);
router.get("/:id", getCategory);
router.get("/", getAllCategory);


module.exports = router;