const express = require("express");

const router = express.Router();
const { registerUser, authenticateUser } = require("../controllers/userControllers")


router.route("/").post(registerUser);
router.route("/login").post(authenticateUser);

module.exports = router;
