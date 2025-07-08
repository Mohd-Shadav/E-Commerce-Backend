const CategorySchema = require('../models/CategorySchema');

exports.createCategory = async (req,res)=>{
 


    try{

      
    let category = await CategorySchema.create({...req.body});

    res.status(200).send(category);
    }catch(err)
    {
        console.log(err)
    }
    
}

exports.getCategories = async(req,res)=>{
try{
        let category = await CategorySchema.find();
    
    res.status(200).send(category);
}catch(err){
    console.log(err)
}
}


exports.updateCategory = async(req,res)=>{
    try{


  let {id,name,icon} = req.body;

       let updatedData =  await CategorySchema.findOneAndUpdate({_id:id},{categoryname:name,categoryicon:icon},{new:true});

        res.status(200).json(updatedData);

    }catch(err)
    {
        console.log(err);
    }
}

exports.deleteCategory = async (req,res)=>{
    
    try{

        let {_id} = req.body

        await CategorySchema.findByIdAndDelete({_id})

        res.status(200).json(CategorySchema);

    }catch(err)
    {
        console.log(err);

    }

}
