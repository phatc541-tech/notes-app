const express = require("express");

const router = express.Router();

const {

  register,
  login,
  getProfile,
  updateProfile,
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
// GET PROFILE
// ======================

router.get(

  "/profile",

  protect,

  getProfile

);

// ======================
// UPDATE PROFILE
// ======================

router.put(

  "/profile",

  protect,

  updateProfile

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