const UserSchema = require('../models/UserSchema');


exports.getUsers = async (req,res)=>{
 try{
       let users = await UserSchema.find();

      res.json(users)

 }catch(err){
    console.log('Internal server error - Users Not Found ',err);

 }
}

exports.createUser = async (req,res)=>{
    try{

        let user = await UserSchema.create(req.body);
        res.send(user);

    }catch(err){
        console.log('intrenal server error : ',err)
    }
}