const User = require("../models/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

// ======================
// GENERATE TOKEN
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

          hashedPassword,

        isActivated: false

      });

    res.status(201).json({

      _id: user._id,

      username: user.username,

      email: user.email,

      avatar: user.avatar,

      isActivated:
        user.isActivated,

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

    // USER NOT FOUND

    if (!user) {

      return res.status(401).json({

        message:

          "Invalid email or password"

      });

    }

    // PASSWORD CHECK

    const isMatch =

      await bcrypt.compare(

        password,

        user.password

      );

    if (!isMatch) {

      return res.status(401).json({

        message:

          "Invalid email or password"

      });

    }

    // ACCOUNT ACTIVATION CHECK

    if (!user.isActivated) {

      return res.status(401).json({

        message:

          "Please activate your account first"

      });

    }

    // LOGIN SUCCESS

    res.json({

      _id: user._id,

      username: user.username,

      email: user.email,

      avatar: user.avatar,

      isActivated:
        user.isActivated,

      token:

        generateToken(user._id)

    });

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
// GET PROFILE
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

    if (!user) {

      return res.status(404).json({

        message:

          "User not found"

      });

    }

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

    res.json({

      _id: updatedUser._id,

      username:

        updatedUser.username,

      email:

        updatedUser.email,

      avatar:

        updatedUser.avatar,

      isActivated:

        updatedUser.isActivated

    });

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      message:

        "Update failed"

    });

  }

};

// ======================
// CHANGE PASSWORD
// ======================

const changePassword = async (

  req,
  res

) => {

  try {

    const {

      oldPassword,
      newPassword

    } = req.body;

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

    const isMatch =

      await bcrypt.compare(

        oldPassword,

        user.password

      );

    if (!isMatch) {

      return res.status(400).json({

        message:

          "Old password incorrect"

      });

    }

    const salt =

      await bcrypt.genSalt(10);

    user.password =

      await bcrypt.hash(

        newPassword,

        salt

      );

    await user.save();

    res.json({

      message:

        "Password changed"

    });

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      message:

        "Change password failed"

    });

  }

};

// ======================
// RESET PASSWORD
// ======================

const resetPassword = async (

  req,
  res

) => {

  try {

    const {

      email,
      newPassword

    } = req.body;

    const user =

      await User.findOne({

        email

      });

    if (!user) {

      return res.status(404).json({

        message:

          "User not found"

      });

    }

    const salt =

      await bcrypt.genSalt(10);

    user.password =

      await bcrypt.hash(

        newPassword,

        salt

      );

    await user.save();

    res.json({

      message:

        "Password reset success"

    });

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      message:

        "Reset password failed"

    });

  }

};

// ======================
// ACTIVATE ACCOUNT
// ======================

const activateAccount = async (

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

    user.isActivated = true;

    await user.save();

    res.json({

      message:

        "Account activated"

    });

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      message:

        "Activation failed"

    });

  }

};

module.exports = {

  register,
  login,

  getProfile,
  updateProfile,

  changePassword,
 resetPassword,

  activateAccount

};