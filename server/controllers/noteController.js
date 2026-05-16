const Note = require("../models/Note");

// create note
const createNote = async (req, res) => {

  try {

    const {
      title,
      content,
      labels
    } = req.body;

    const note = await Note.create({

      title,
      content,
      labels

    });

    res.status(201).json(note);

  } catch (error) {

    res.status(500).json({

      message: error.message

    });

  }
};

// get notes
const getNotes = async (req, res) => {

  try {

    const notes = await Note.find()

      .sort({
        createdAt: -1
      });

    res.status(200).json(notes);

  } catch (error) {

    res.status(500).json({

      message: error.message

    });

  }
};

// delete note
const deleteNote = async (req, res) => {

  try {

    await Note.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({

      message: "Deleted"

    });

  } catch (error) {

    res.status(500).json({

      message: error.message

    });

  }
};

module.exports = {

  createNote,
  getNotes,
  deleteNote

};