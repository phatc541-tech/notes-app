const express = require("express");

const router = express.Router();

const {

  getNotes,
  createNote,
  updateNote,
  deleteNote

} = require(

  "../controllers/noteController"

);

const {

  protect

} = require(

  "../middleware/authMiddleware"

);

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
// UPDATE NOTE
// ======================

router.put(

  "/:id",

  protect,

  updateNote

);

// ======================
// DELETE NOTE
// ======================

router.delete(

  "/:id",

  protect,

  deleteNote

);

module.exports = router;