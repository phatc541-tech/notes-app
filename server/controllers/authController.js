const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

const User = require("../models/User");

// =========================
// REGISTER
// =========================
const registerUser = async (req, res) => {

  try {

    const {
      name,
      email,
      password
    } = req.body;

    // check email tồn tại
    const userExists = await User.findOne({
      email
    });

    if (userExists) {

      return res.status(400).json({
        message: "Email already exists"
      });

    }

    // hash password
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    // create user
    const user = await User.create({

      name,
      email,

      password: hashedPassword

    });

    // create token
    const token = jwt.sign(

      {
        id: user._id
      },

      "secretkey",

      {
        expiresIn: "7d"
      }

    );

    res.status(201).json({

      message: "Register Success",

      token,

      user

    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

// =========================
// LOGIN
// =========================
const loginUser = async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body;

    // tìm user
    const user = await User.findOne({
      email
    });

    // không có user
    if (!user) {

      return res.status(404).json({
        message: "User not found"
      });

    }

    // compare password
    const isMatch = await bcrypt.compare(

      password,
      user.password

    );

    // sai password
    if (!isMatch) {

      return res.status(400).json({
        message: "Wrong password"
      });

    }

    // tạo token
    const token = jwt.sign(

      {
        id: user._id
      },

      "secretkey",

      {
        expiresIn: "7d"
      }

    );

    res.status(200).json({

      message: "Login Success",

      token,

      user

    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

module.exports = {

  registerUser,
  loginUser

};