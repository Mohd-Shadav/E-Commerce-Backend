const cookie = require("cookie-parser");

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const AdminSchema = require("../models/AdminSchema");
const secret = process.env.JWT_SECRET



exports.isAdmin = async (req,res,next)=>{

    let {email,password} = req.body;

   

    let Admin = await AdminSchema.findOne({email});

    if(!Admin)
    {
         res.status(401).send("Wrong Credentials...")
    }
    else{
        bcrypt.compare(password,Admin.password,(err,result)=>{
            if(result){
               

                let token = jwt.sign(email,secret);
                res.cookie("Token",token);
                
                next();
            }
            else{
                res.status(401).send("wrong credentials....")
            }


      
        })
    }

}