const express = require("express");

const router = express.Router();
const { registerUser, authenticateUser, allUsers } = require("../controllers/userControllers")


router.route("/").post(registerUser).get(allUsers);
router.route("/login").post(authenticateUser);

module.exports = router;
