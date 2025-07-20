const UserSchema = require("../models/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const cookieParser 

exports.getUsers = async (req, res) => {
  try {
    let users = await UserSchema.find();

    res.json(users);
  } catch (err) {
    console.log("Internal server error - Users Not Found ", err);
  }
};

exports.createUser = async (req, res) => {
  try {
    let { name, email, mobile, password } = req.body;

   bcrypt.genSalt(10, (err, salt) => {
      if (err) return res.status(401).send("Failed to generate salt...");
      else {
        bcrypt.hash(password, salt, async (err, hash) => {
          if (err) return res.status(401).send("failed to generate hash..");
          else {
            let user = await UserSchema.create({
              name,
              email,
              mobile,
              password:hash,
            });

            let token = jwt.sign({email},process.env.JWT_SECRET)

            res.cookie("usertoken",token);

            
            res.status(200).json(user);
          }
        });
      }
    });
  } catch (err) {
    console.log("intrenal server error : ", err);
  }
};
