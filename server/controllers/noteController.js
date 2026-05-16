const Note = require("../models/Note");

// create
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

// update
const updateNote = async (req, res) => {

  try {

    const {
      title,
      content,
      labels
    } = req.body;

    const note = await Note.findById(
      req.params.id
    );

    if (!note) {

      return res.status(404).json({

        message: "Note not found"

      });

    }

    note.title = title;

    note.content = content;

    note.labels = labels;

    const updatedNote = await note.save();

    res.status(200).json(
      updatedNote
    );

  } catch (error) {

    res.status(500).json({

      message: error.message

    });

  }
};

// delete
const deleteNote = async (req, res) => {

  try {

    const note = await Note.findById(
      req.params.id
    );

    if (!note) {

      return res.status(404).json({

        message: "Note not found"

      });

    }

    await note.deleteOne();

    res.status(200).json({

      message: "Deleted"

    });

  } catch (error) {

    res.status(500).json({

      message: error.message

    });

  }
};

// pin
const pinNote = async (req, res) => {

  try {

    const note = await Note.findById(
      req.params.id
    );

    if (!note) {

      return res.status(404).json({

        message: "Note not found"

      });

    }

    note.isPinned = !note.isPinned;

    const updatedNote = await note.save();

    res.status(200).json(
      updatedNote
    );

  } catch (error) {

    res.status(500).json({

      message: error.message

    });

  }
};

module.exports = {

  createNote,
  getNotes,
  updateNote,
  deleteNote,
  pinNote

};