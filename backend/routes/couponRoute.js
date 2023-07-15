const { createCoupon, getAllCoupon, updateCoupon, deleteCoupon } = require("../controllers/couponController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/create-coupon",authMiddleware, isAdmin, createCoupon);
router.get("/", authMiddleware, isAdmin, getAllCoupon);
router.put("/:id", authMiddleware, isAdmin, updateCoupon);
router.delete("/:id", authMiddleware, isAdmin, deleteCoupon);

module.exports = router;