const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {

  try {

    // lấy token
    const token = req.headers.authorization;

    // không có token
    if (!token) {

      return res.status(401).json({
        message: "No token"
      });

    }

    // verify token
    const decoded = jwt.verify(
      token,
      "secretkey"
    );

    // lưu user
    req.user = decoded;

    next();

  } catch (error) {

    res.status(401).json({
      message: "Invalid token"
    });

  }
};

module.exports = protect;