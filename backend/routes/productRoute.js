const router = require("express").Router();

const { createProduct, getSingleProduct, getAllProduct, updateProduct, deleteProduct, addToWishlist, rating, uploadImages } = require("../controllers/productController");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const { uploadPhoto, productImgResize } = require("../middlewares/uploadImages");

router.post("/create-product",authMiddleware, isAdmin, createProduct);
router.put("/upload/:id", authMiddleware, isAdmin, uploadPhoto.array("images", 10), productImgResize, uploadImages);
router.get("/:id", getSingleProduct);
router.put("/wishlist",authMiddleware, addToWishlist);
router.put("/rating", authMiddleware, rating);
router.put("/:id",authMiddleware, isAdmin, updateProduct);
router.delete("/:id",authMiddleware, isAdmin, deleteProduct);
router.get("/", getAllProduct);

module.exports = router;