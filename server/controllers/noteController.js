const Note = require("../models/Note");

// ======================
// GET NOTES
// ======================

const getNotes = async (req, res) => {

  try {

    const notes =

      await Note.find({

        user: req.user.id

      }).sort({

        createdAt: -1

      });

    res.json(notes);

  }

  catch (error) {

    res.status(500).json({

      message: error.message

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

    const note =
      await Note.create({

        title,
        content,
        labels,
        user: req.user.id

      });

    // RETURN NOTE MỚI

    res.status(201).json(note);

  }

  catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};

// ======================
// UPDATE NOTE
// ======================

const updateNote = async (req, res) => {

  try {

    const updatedNote =

      await Note.findByIdAndUpdate(

        req.params.id,

        req.body,

        {

          new: true

        }

      );

    res.json(updatedNote);

  }

  catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};

// ======================
// DELETE NOTE
// ======================

const deleteNote = async (req, res) => {

  try {

    await Note.findByIdAndDelete(

      req.params.id

    );

    res.json({

      message:
        "Note deleted"

    });

  }

  catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};

module.exports = {

  getNotes,
  createNote,
  updateNote,
  deleteNote

};