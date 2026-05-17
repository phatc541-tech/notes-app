const express = require("express");

const router = express.Router();

const {

  register,
  login,

  getProfile,
  updateProfile

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

router.put(

  "/profile",

  protect,

  updateProfile

);

module.exports = router;