const express = require("express");

const router = express.Router();
const { registerUser, authenticateUser, allUsers } = require("../controllers/userControllers");
const authMiddleware = require("../middleware/authMiddleware");


router.route("/").post(registerUser).get(authMiddleware, allUsers);
router.route("/login").post(authenticateUser);

module.exports = router;
