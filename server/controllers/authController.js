const User = require("../models/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

// ==========================
// REGISTER
// ==========================

const register = async (req, res) => {

  try {

    const {
      name,
      email,
      password
    } = req.body;

    // CHECK EMAIL

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({

        message: "Email already exists"

      });

    }

    // HASH PASSWORD

    const hashedPassword =
      await bcrypt.hash(password, 10);

    // CREATE USER

    const user =
      await User.create({

        name,
        email,
        password: hashedPassword

      });

    // TOKEN

    const token = jwt.sign(

      {

        id: user._id

      },

      process.env.JWT_SECRET,

      {

        expiresIn: "7d"

      }

    );

    res.status(201).json({

      token

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message: "Server Error"

    });

  }

};

// ==========================
// LOGIN
// ==========================

const login = async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body;

    // FIND USER

    const user =
      await User.findOne({ email });

    if (!user) {

      return res.status(400).json({

        message: "User not found"

      });

    }

    // CHECK PASSWORD

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.status(400).json({

        message: "Wrong password"

      });

    }

    // TOKEN

    const token = jwt.sign(

      {

        id: user._id

      },

      process.env.JWT_SECRET,

      {

        expiresIn: "7d"

      }

    );

    res.status(200).json({

      token

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message: "Server Error"

    });

  }

};

module.exports = {

  register,
  login

};