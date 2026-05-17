const express = require("express");

const router = express.Router();

const {

  getNotes,

  createNote,

  deleteNote,

  updateNote

} = require("../controllers/noteController");

// ======================
// GET NOTES
// ======================

router.get(
  "/",
  getNotes
);

// ======================
// CREATE NOTE
// ======================

router.post(
  "/",
  createNote
);

// ======================
// DELETE NOTE
// ======================

router.delete(
  "/:id",
  deleteNote
);

// ======================
// UPDATE NOTE
// ======================

router.put(
  "/:id",
  updateNote
);

module.exports = router;