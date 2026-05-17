const User = require("../models/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

// ======================
// GENERATE TOKEN
// ======================

const generateToken = (id) => {

  return jwt.sign(

    {

      id

    },

    process.env.JWT_SECRET,

    {

      expiresIn: "30d"

    }

  );

};

// ======================
// REGISTER
// ======================

const register = async (req, res) => {

  try {

    const {

      username,
      email,
      password

    } = req.body;

    // check user

    const userExists =

      await User.findOne({

        email

      });

    if (userExists) {

      return res.status(400).json({

        message:
          "User already exists"

      });

    }

    // hash password

    const salt =
      await bcrypt.genSalt(10);

    const hashedPassword =

      await bcrypt.hash(

        password,
        salt

      );

    // create user

    const user =
      await User.create({

        username,
        email,

        password:
          hashedPassword

      });

    // response

    res.status(201).json({

      _id: user._id,

      username:
        user.username,

      email: user.email,

      token:

        generateToken(

          user._id

        )

    });

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      message: error.message

    });

  }

};

// ======================
// LOGIN
// ======================

const login = async (req, res) => {

  try {

    const {

      email,
      password

    } = req.body;

    // find user

    const user =
      await User.findOne({

        email

      });

    // check password

    if (

      user &&

      await bcrypt.compare(

        password,
        user.password

      )

    ) {

      res.json({

        _id: user._id,

        username:
          user.username,

        email: user.email,

        token:

          generateToken(

            user._id

          )

      });

    }

    else {

      res.status(401).json({

        message:
          "Invalid email or password"

      });

    }

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      message: error.message

    });

  }

};

module.exports = {

  register,
  login

};