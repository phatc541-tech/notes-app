const express = require("express");

const router = express.Router();

const {
  createNote,
  getNotes,
  deleteNote,
  updateNote,
  pinNote
} = require("../controllers/noteController");

const protect = require(
  "../middleware/authMiddleware"
);

// CREATE NOTE
router.post(
  "/",
  protect,
  createNote
);

// GET NOTES
router.get(
  "/",
  protect,
  getNotes
);

// DELETE NOTE
router.delete(
  "/:id",
  protect,
  deleteNote
);

// UPDATE NOTE
router.put(
  "/:id",
  protect,
  updateNote
);

// PIN NOTE
router.put(
  "/pin/:id",
  protect,
  pinNote
);

module.exports = router;