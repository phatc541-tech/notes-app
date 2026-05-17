const Note = require("../models/Note");

// ======================
// GET NOTES
// ======================

const getNotes = async (req, res) => {

  try {

    // CHỈ LẤY NOTE USER HIỆN TẠI

    const notes = await Note.find({

      user: req.user.id

    });

    res.json(notes);

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      message: "Get notes failed"

    });

  }

};

// ======================
// CREATE NOTE
// ======================

const createNote = async (req, res) => {

  try {

    const {

      title,
      content,
      labels

    } = req.body;

    // TẠO NOTE THEO USER

    const note = await Note.create({

      title,
      content,
      labels,

      user: req.user.id

    });

    res.status(201).json(note);

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      message: "Create note failed"

    });

  }

};

// ======================
// DELETE NOTE
// ======================

const deleteNote = async (req, res) => {

  try {

    await Note.findOneAndDelete({

      _id: req.params.id,

      user: req.user.id

    });

    res.json({

      message: "Deleted"

    });

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      message: "Delete failed"

    });

  }

};

// ======================
// UPDATE NOTE
// ======================

const updateNote = async (req, res) => {

  try {

    const note =
      await Note.findOneAndUpdate(

        {

          _id: req.params.id,

          user: req.user.id

        },

        req.body,

        {

          new: true

        }

      );

    res.json(note);

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      message: "Update failed"

    });

  }

};

// ======================
// EXPORT
// ======================

module.exports = {

  getNotes,

  createNote,

  deleteNote,

  updateNote

};