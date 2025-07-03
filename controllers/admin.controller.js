const AdminSchema = require('../models/AdminSchema');

const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET
const bcrypt = require('bcrypt');






exports.getAdmin = async(req,res)=>{

   res.send("Logged in Successfully...1234")


}

exports.createAdmin = async(req,res)=>{
    const {name,email,password}= req.body;
    const isAdminalready = await AdminSchema.findOne({email})
     console.log(isAdminalready);
    if(isAdminalready)
    {
        res.send("You Are Already An Admin...")
    }
    else{

        bcrypt.genSalt(10,(err,salt)=>{
            if(err){
                res.send("Internal Server error..")
            }else{
                bcrypt.hash(password,salt,async (err,hash)=>{
                    if(err){
                        res.send("something went wrong..")
                    }
                    else{
                        const admin = await AdminSchema.create({email,name,password:hash});

                       let token = jwt.sign({email},secret);

                       res.cookie("Token",token);
                       res.send('done');
                    }
                })
            }
        })

    }

    



    
}

exports.tokenVerify = async (req, res) => {
  try {
    const token = req.cookies.Token;

    if (!token) {
      return res.status(401).json({ success: false, message: "No token found" });
    }

    const data = jwt.verify(token, secret); // ✅ verify token
    console.log("Verified user:", data);

    return res.status(200).json({ success: true, message: "Token verified", user: data });
  } catch (err) {
    console.error("Verification error:", err.message);
    return res.status(403).json({ success: false, message: "Invalid or expired token" });
  }
};


exports.logoutAdmin = (req,res)=>{


    res.cookie("Token","");
    res.status(200).json({ message: 'Logged out successfully' ,redirectTo:"http://localhost:5173/"});

}