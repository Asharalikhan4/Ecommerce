const router = require("express").Router();

const { register, loginUser, getAllUsers, getSingleUser, deleteUser, updateUser, blockUser, unblockUser, handleRefreshToken, logout, updatePassword, forgotPasswordToken, resetPassword, loginAdmin, getWishlist, saveAddress, userCart, getUserCart, emptyCart, applyCoupon, createOrder, getOrders, getAllOrders, getOrderByUserId, updateOrderStatus } = require("../controllers/userController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

router.post("/register", register);
router.post("/forgot-password-token", forgotPasswordToken);
router.put("/reset-password/:token", resetPassword);
router.put("/password", authMiddleware, updatePassword);
router.post("/login", loginUser);
router.post("/admin-login", loginAdmin);
router.post("/cart", authMiddleware, userCart);
router.post("/cart/applycoupon", authMiddleware, applyCoupon);
router.post("/cart/cash-order", authMiddleware, createOrder);
router.get("/all-users", getAllUsers);
router.get("/get-orders", authMiddleware, getOrders);
router.get("/getallorders", authMiddleware, isAdmin, getAllOrders);
router.post("/getorderbyuser/:id", authMiddleware, isAdmin, getAllOrders);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/wishlist", authMiddleware, getWishlist);
router.get("/cart", authMiddleware, getUserCart);
router.get("/:id",authMiddleware,isAdmin, getSingleUser);
router.delete("/empty-cart", authMiddleware, emptyCart);
router.delete("/:id", deleteUser);
router.put("/edit-user",authMiddleware, updateUser);
router.put("/save-address", authMiddleware, saveAddress);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

module.exports = router;
