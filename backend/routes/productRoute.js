const router = require("express").Router();

const { createProduct, getSingleProduct, getAllProduct, updateProduct, deleteProduct, addToWishlist, rating } = require("../controllers/productController");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");

router.post("/create-product",authMiddleware, isAdmin, createProduct);
router.get("/:id", getSingleProduct);
router.put("/wishlist",authMiddleware, addToWishlist);
router.put("/rating", authMiddleware, rating);
router.put("/:id",authMiddleware, isAdmin, updateProduct);
router.delete("/:id",authMiddleware, isAdmin, deleteProduct);
router.get("/", getAllProduct);

module.exports = router;