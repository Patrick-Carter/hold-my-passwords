const express = require("express");

const userController = require("../controllers/user-controller");

const router = express.Router();

router.post("/login", userController.loginUser);

router.post("/signup", userController.signup)

module.exports = router;