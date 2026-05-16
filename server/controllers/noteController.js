const Note = require("../models/Note");

// =========================
// CREATE NOTE
// =========================
const createNote = async (req, res) => {

  try {

    const { title, content } = req.body;

    const note = await Note.create({

      title,
      content,

      user: req.user.id

    });

    res.status(201).json(note);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

// =========================
// GET NOTES
// =========================
const getNotes = async (req, res) => {

  try {

    const notes = await Note.find({

      user: req.user.id

    }).sort({

      isPinned: -1,

      createdAt: -1

    });

    res.status(200).json(notes);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

// =========================
// DELETE NOTE
// =========================
const deleteNote = async (req, res) => {

  try {

    const note = await Note.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({

      message: "Note Deleted",
      note

    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

// =========================
// UPDATE NOTE
// =========================
const updateNote = async (req, res) => {

  try {

    const { title, content } = req.body;

    const note = await Note.findByIdAndUpdate(

      req.params.id,

      {
        title,
        content
      },

      {
        new: true
      }

    );

    res.status(200).json(note);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

// =========================
// PIN NOTE
// =========================
const pinNote = async (req, res) => {

  try {

    const note = await Note.findById(
      req.params.id
    );

    note.isPinned = !note.isPinned;

    await note.save();

    res.status(200).json(note);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

module.exports = {

  createNote,
  getNotes,
  deleteNote,
  updateNote,
  pinNote

};