const User = require("../models/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

// ======================
// TOKEN
// ======================

const generateToken = (id) => {

  return jwt.sign(

    { id },

    process.env.JWT_SECRET,

    {

      expiresIn: "30d"

    }

  );

};

// ======================
// REGISTER
// ======================

const register = async (

  req,
  res

) => {

  try {

    const {

      username,
      email,
      password

    } = req.body;

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

    const salt =

      await bcrypt.genSalt(10);

    const hashedPassword =

      await bcrypt.hash(

        password,

        salt

      );

    const user =

      await User.create({

        username,
        email,

        password:

          hashedPassword

      });

    res.status(201).json({

      _id: user._id,

      username: user.username,

      email: user.email,

      avatar: user.avatar,

      token:

        generateToken(user._id)

    });

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      message:

        "Register failed"

    });

  }

};

// ======================
// LOGIN
// ======================

const login = async (

  req,
  res

) => {

  try {

    const {

      email,
      password

    } = req.body;

    const user =

      await User.findOne({

        email

      });

    if (

      user &&

      (

        await bcrypt.compare(

          password,

          user.password

        )

      )

    ) {

      res.json({

        _id: user._id,

        username: user.username,

        email: user.email,

        avatar: user.avatar,

        token:

          generateToken(user._id)

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

      message:

        "Login failed"

    });

  }

};

// ======================
// PROFILE
// ======================

const getProfile = async (

  req,
  res

) => {

  try {

    const user =

      await User.findById(

        req.user.id

      ).select("-password");

    res.json(user);

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      message:

        "Profile failed"

    });

  }

};

// ======================
// UPDATE PROFILE
// ======================

const updateProfile = async (

  req,
  res

) => {

  try {

    const user =

      await User.findById(

        req.user.id

      );

    if (!user) {

      return res.status(404).json({

        message:

          "User not found"

      });

    }

    user.username =

      req.body.username ||

      user.username;

    user.email =

      req.body.email ||

      user.email;

    user.avatar =

      req.body.avatar ||

      user.avatar;

    const updatedUser =

      await user.save();

    res.json(updatedUser);

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      message:

        "Update failed"

    });

  }

};

module.exports = {

  register,
  login,

  getProfile,
  updateProfile

};