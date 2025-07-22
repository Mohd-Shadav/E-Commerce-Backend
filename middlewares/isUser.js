const UserSchema = require("../models/UserSchema");
const bcrypt = require('bcrypt')

exports.isUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await UserSchema.findOne({ email });
    if (!user) return res.status(404).send("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send("Invalid credentials");

    req.user = user;
    next();
  } catch (err) {
    console.error("Error in isUser:", err);
    res.status(500).send("Internal Server Error");
  }
};