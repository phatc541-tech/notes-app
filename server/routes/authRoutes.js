const express = require("express");

const router = express.Router();

const {

  register,
  login,

  getProfile,
  changePassword

} = require(

  "../controllers/authController"

);

const {

  protect

} = require(

  "../middleware/authMiddleware"

);

// ======================
// REGISTER
// ======================

router.post(

  "/register",

  register

);

// ======================
// LOGIN
// ======================

router.post(

  "/login",

  login

);

// ======================
// PROFILE
// ======================

router.get(

  "/profile",

  protect,

  getProfile

);

// ======================
// CHANGE PASSWORD
// ======================

router.put(

  "/change-password",

  protect,

  changePassword

);

module.exports = router;