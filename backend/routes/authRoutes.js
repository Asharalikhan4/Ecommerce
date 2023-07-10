const router = require("express").Router();

const { register, login, getAllUser, getUser, deleteUser } = require("../controllers/userControllers");

router.post("/register", register);
router.post("/login", login);
router.get("/all-users", getAllUser);
router.get("/:id", getUser);
router.delete("/:id", deleteUser);

module.exports = router;
