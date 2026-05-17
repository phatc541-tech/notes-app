const Note = require("../models/Note");

// ======================
// GET NOTES
// ======================

const getNotes = async (req, res) => {

  try {

    const notes =
      await Note.find();

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

    const note =
      await Note.create({

        title,
        content,
        labels

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

    await Note.findByIdAndDelete(

      req.params.id

    );

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
      await Note.findByIdAndUpdate(

        req.params.id,

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