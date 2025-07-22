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

exports.getCategoryIdByName = async (req,res)=>{
    try{
        let {categoryname} = req.params

       
        let data = await CategorySchema.findOne({categoryname});

        res.status(200).json(data);

    }catch(err)
    {
        res.status(401).send("internal server error");
    }
}

exports.updateCategory = async(req,res)=>{
    try{


  let {id,name,subcategories,icon} = req.body;

       let updatedData =  await CategorySchema.findOneAndUpdate({_id:id},{categoryname:name,subcategories,categoryicon:icon},{new:true});

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


exports.getSubCategories = async (req,res)=>{

    try{

      
        let {category} = req.params;
   
        let data = await CategorySchema.findById(category);



        res.status(200).json(data.subcategories);

    }catch(err)
    {
        res.status(401).send("Internal Server error");
    }

}