const router = require("express").Router();

const { register, login } = require("../controllers/userControllers");

router.use("/register", register);
router.use("/login", login);

module.exports = router;
