const jwt = require("jsonwebtoken");

const protect = (

  req,
  res,
  next

) => {

  try {

    // lấy token

    const authHeader =
      req.headers.authorization;

    // không có token

    if (!authHeader) {

      return res.status(401).json({

        message: "No token"

      });

    }

    // Bearer token

    const token =
      authHeader.split(" ")[1];

    // verify token

    const decoded = jwt.verify(

      token,

      process.env.JWT_SECRET

    );

    // lưu user

    req.user = decoded;

    next();

  }

  catch (error) {

    res.status(401).json({

      message: "Invalid token"

    });

  }

};

module.exports = protect;