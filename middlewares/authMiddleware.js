const cookie = require("cookie-parser");

const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

exports.authMiddleware = async (req, res, next) => {
  try {
    let token = req.cookies.userToken;

    if (!token) return res.status(404).send("User Not Found...");
    let data = jwt.verify(token, secret);

    req.user = data;

    next();
  } catch (err) {
    console.log("user token did not get...");
  }
};
