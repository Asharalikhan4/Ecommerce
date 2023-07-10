const router = require("express").Router();

const { register } = require("../controllers/userControllers");

router.use("/register", register);

module.exports = router;
