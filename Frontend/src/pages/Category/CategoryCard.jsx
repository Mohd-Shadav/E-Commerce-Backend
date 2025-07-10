import { Box, Card, CardContent, Dialog, DialogContent, DialogTitle, TextField, Tooltip, Typography } from '@mui/material'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState } from 'react'
import axios from 'axios';

function CategoryCard({id,name,icon,setIsDeleteItem,isDark,onClick}) {
      const [anchorEl, setAnchorEl] = useState(null);
        const [isCategoryUpdateDialogOpen,setIsCategoryUpdateDialogOpen] = useState(false)
        const [updateForm,setUpdateForm] = useState({
            id,name:name,icon:icon
        })
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  
    const handleCategoryUpdateDialog = ()=>{
  
        setIsCategoryUpdateDialogOpen(!isCategoryUpdateDialogOpen);
    }


    const handleSubmitUpdates =async (e)=>{
        e.preventDefault();
   

        try{

            let data = await axios.put("http://localhost:3000/api/category/update-category",updateForm,{
                withCredentials:true,
                headers:{
                    "Content-type":"application/json"
                }
            })

        
            alert("Category Updated Successfully...")
            setIsCategoryUpdateDialogOpen(false);
            setIsDeleteItem((prev)=>!prev)
            handleClose();

        }catch(err)
        {
            alert("Something went wrong...")
        }
    }

    const handleChange = (e)=>{
         let { name, value, files } = e.target;

    if (name === "icon") {
      const file = files[0];

      if (file) {
        const reader = new FileReader();

        reader.onloadend = () => {
          setUpdateForm((prev) => ({
            ...prev,
            icon: reader.result,
          }));

        };
        
        reader.readAsDataURL(file);
    }
    return;
    }

    setUpdateForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    }

  const handleDelete = async ()=>{
 
    try{

        let data = await axios.delete("http://localhost:3000/api/category/delete-property",{
            withCredentials:true,
            headers:{
                "Content-Type":"application/json"
            },
            data:{_id:id}

        })

        alert("Category delete Successfully...")
        setIsDeleteItem((prev)=>!prev);

    }catch(err)
    {
    alert("Something Went Wronglyyy...")
    }

  }
  return (

    
<Tooltip title={name} arrow>
<Card

onClick={onClick}
     
      sx={{
        width: 130,
        height: 130,
        borderRadius: 3,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position:"relative",
        background:isDark ? 'linear-gradient(145deg,rgba(255, 255, 255, 0),rgba(255, 255, 255, 0.05))' : 'linear-gradient(145deg, #ffffff,rgb(255, 255, 255))',
        boxShadow:isDark ?'8px 8px 16pxrgba(209, 209, 209, 0.01), -8px -8px 16pxrgba(255, 255, 255, 0)' : '8px 8px 16px #d1d1d1, -8px -8px 16px #ffffff',
        transition: '0.3s ease',
        cursor:"pointer",
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: isDark ? '10px 10px 20pxrgba(208, 208, 208, 0), -10px -10px 20pxrgba(255, 255, 255, 0)' :'10px 10px 20px #d0d0d0, -10px -10px 20px #ffffff',
        },
       pt:3,
       px:3
      }}
    >
            <div style={{position:"absolute",right:"3px",top:"10px",padding:0,margin:0}}>
  
        <MoreVertIcon  id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick} sx={{color:isDark?"#f4f3f2" :"text.secondary"}}/>
    
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': 'basic-button',
          },
        }}
      >
        <MenuItem onClick={handleCategoryUpdateDialog} sx={{color:"#1976d2"}}><span style={{margin:"7px 10px 0 0"}}><AddIcon/></span> Update</MenuItem>
        <MenuItem onClick={handleDelete} sx={{color:"#d32f2f"}}><span style={{margin:"7px 10px 0 0"}}><DeleteIcon/></span> Delete</MenuItem>
        
      </Menu>
    </div>
      <CardContent
        sx={{
          p: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          width: '100%',
        }}
      >
        <img
          src={icon}
          alt={name}
          style={{
            width: '60%',
            height: '60%',
            objectFit: 'contain',
            marginBottom: '6px',
            filter: 'brightness(0.8)',
          }}
        />
        <Typography
          variant="caption"
          sx={{ fontWeight: 500,fontSize:"1.2rem", textAlign: 'center', color:isDark ? '#f4f3f2': '#333' }}
        >
          {name.length>15 ? name.split('').splice(0,10).join('')+'...' : name}
        </Typography>


          {/* update category dialog */}
          <Dialog onClose={handleCategoryUpdateDialog} open={isCategoryUpdateDialogOpen}>
          <DialogTitle>Add Category</DialogTitle>
          <DialogContent>
            <Box component="form" onSubmit={handleSubmitUpdates}>
              <TextField
                label="Category Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={updateForm.name}
                name="name"
                onChange={handleChange}
              />

              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{ mt: 2 }}
              >
                Upload Thumbnail Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  name="icon"
              
                 
                  onChange={handleChange}
                />
              </Button>

           <div className="" style={{display:"flex",justifyContent:"center",alignItems:"center",gap:"2rem"}}>
                 <Button
                variant="contained"
                color='error'
                onClick={handleCategoryUpdateDialog}
                sx={{ marginTop: "2rem" }}
              >
                cancel
              </Button>
              
               <Button
                variant="contained"
                type="submit"
                sx={{ marginTop: "2rem" }}
              >
                Update
              </Button>
              
           </div>
            </Box>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
    </Tooltip>
  );
};

export default CategoryCard