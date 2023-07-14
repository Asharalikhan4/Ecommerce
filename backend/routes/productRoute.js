const router = require("express").Router();

const { createProduct, getSingleProduct, getAllProduct, updateProduct, deleteProduct } = require("../controllers/productController");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");

router.post("/create-product",authMiddleware, isAdmin, createProduct);
router.put("/:id",authMiddleware, isAdmin, updateProduct);
router.get("/:id",authMiddleware, isAdmin, getSingleProduct);
router.get("/",authMiddleware, isAdmin, getAllProduct);
router.delete("/:id",authMiddleware, isAdmin, deleteProduct);

module.exports = router;