const express = require("express");
const { check } = require("express-validator");

const userController = require("../controllers/user-controller");

const router = express.Router();

router.post(
  "/login",
  check("email").isEmail().normalizeEmail(),
  userController.loginUser
);

router.post(
  "/signup",
  [
    check("email").isEmail().normalizeEmail(),
    check("password").isLength({ min: 5, max: 255 }).trim(),
  ],
  userController.signup
);

module.exports = router;
