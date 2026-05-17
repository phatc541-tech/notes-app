const jwt = require("jsonwebtoken");

// ======================
// PROTECT
// ======================

const protect = async (

  req,
  res,
  next

) => {

  try {

    let token;

    // get token

    if (

      req.headers.authorization &&

      req.headers.authorization.startsWith(

        "Bearer"

      )

    ) {

      token =

        req.headers.authorization.split(

          " "

        )[1];

    }

    // no token

    if (!token) {

      return res.status(401).json({

        message:
          "No token"

      });

    }

    // verify token

    const decoded = jwt.verify(

      token,

      process.env.JWT_SECRET

    );

    // save user

    req.user = decoded;

    next();

  }

  catch (error) {

    console.log(error);

    res.status(401).json({

      message:
        "Token failed"

    });

  }

};

module.exports = {

  protect

};