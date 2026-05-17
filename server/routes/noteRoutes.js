const express = require("express");

const router = express.Router();

// ======================
// CONTROLLERS
// ======================

const {

  getNotes,

  createNote,

  deleteNote,

  updateNote

} = require("../controllers/noteController");

// ======================
// MIDDLEWARE
// ======================

const protect =
require("../middleware/authMiddleware");

// ======================
// GET NOTES
// ======================

router.get(

  "/",

  protect,

  getNotes

);

// ======================
// CREATE NOTE
// ======================

router.post(

  "/",

  protect,

  createNote

);

// ======================
// DELETE NOTE
// ======================

router.delete(

  "/:id",

  protect,

  deleteNote

);

// ======================
// UPDATE NOTE
// ======================

router.put(

  "/:id",

  protect,

  updateNote

);

module.exports = router;