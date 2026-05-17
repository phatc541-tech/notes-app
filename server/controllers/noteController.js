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

        isPinned: -1,

        createdAt: -1

      });

    res.json(notes);

  }

  catch (error) {

    console.log(error);

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
      labels,
      isPinned

    } = req.body;

    const note =
      await Note.create({

        title,
        content,
        labels,
        isPinned,

        user: req.user.id

      });

    res.status(201).json(note);

  }

  catch (error) {

    console.log(error);

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

        {

          title:
            req.body.title,

          content:
            req.body.content,

          labels:
            req.body.labels,

          isPinned:
            req.body.isPinned

        },

        {

          new: true

        }

      );

    res.json(updatedNote);

  }

  catch (error) {

    console.log(error);

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

    console.log(error);

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