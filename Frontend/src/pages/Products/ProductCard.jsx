// ProductCard.jsx
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
  Box,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  useMediaQuery,
  useTheme,
  MenuItem,
} from "@mui/material";

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import './styles.css';

// import required modules
import { Navigation } from 'swiper/modules';
import axios from "axios";
import ReactSkeleton from "../../components/ReactSkeleton";

const ProductCard = ({ product, onDelete,isDark,setCallProducts,loading }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [formData,setFormData] = useState({ ...product })

  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [form, setForm] = useState({ ...product });
   const [categories, setCategories] = useState([]);

  const handleViewOpen = () => setOpenView(true);
  const handleViewClose = () => setOpenView(false);
  const handleEditOpen = () => {
    setForm({ ...product });
    setOpenEdit(true);
  };
  const handleEditClose = () => setOpenEdit(false);

  const handleFormChange = (e) => {
  const { name, value, type, files } = e.target;

  // Handle file upload
  if (type === "file") {
    if (name === "thumbnail") {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData((prevData) => ({
            ...prevData,
            images: {
              ...prevData.images,
              thumbnail: reader.result,
            },
          }));
        };
        reader.readAsDataURL(file);
      }
    } else if (name === "gallery") {
      const fileList = Array.from(files);
      const readers = fileList.map(
        (file) =>
          new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(file);
          })
      );
      Promise.all(readers).then((images) => {
        setFormData((prevData) => ({
          ...prevData,
          images: {
            ...prevData.images,
            gallery: images,
          },
        }));
      });
    }
    return;
  }

  // Handle nested physicalSpecs.size
  if (["S", "M", "L", "XL"].includes(name)) {
    setFormData((prevData) => ({
      ...prevData,
      physicalSpecs: {
        ...prevData.physicalSpecs,
        size: {
          ...prevData.physicalSpecs.size,
         [name]: type === "number"
  ? value === "" ? "" : Number(value)
  : value
        },
      },
    }));
    return;
  }

  // Handle physicalSpecs.weight or volume
  if (name === "weight" || name === "volume") {
    setFormData((prevData) => ({
      ...prevData,
      physicalSpecs: {
        ...prevData.physicalSpecs,
        [name]: type === "number"
  ? value === "" ? "" : Number(value)
  : value
      },
    }));
    return;
  }

  // Handle isFeatured as boolean
  if (name === "isFeatured") {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value === "true", // convert from string to boolean
    }));
    return;
  }

  // Default (top-level fields)
  setFormData((prevData) => ({
    ...prevData,
    [name]: type === "number"
  ? value === "" ? "" : Number(value)
  : value
  }));
};


const handleEditProduct = async (e)=>{
  e.preventDefault();
  try{
    let data = await axios.put("http://localhost:3000/api/products/update-product",formData,{
      withCredentials:true
    })

    alert("Product Updated Successfully...")
    setOpenEdit(false);
    setCallProducts((prev)=>!prev)

  }catch(err)
  {
    alert("Something went wrong...")
  }

}

useEffect(()=>{


     const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/category/get-categories");
    
      setCategories(res.data);
     
    } catch (err) {
      console.error("Error fetching categories", err);
    }
  };

  fetchCategories();

},[])





  return (
    <>
    <Card
        elevation={6}
        sx={{
          borderRadius: 3,
          background:isDark?"#252525":"#fff",
          width:"300px",
          maxWidth:"300px",
          color:isDark?"#fff":"#252525",
          boxShadow:isDark?"0 12px 20px rgba(107, 107, 107, 0.1), 0 6px 6px rgba(83, 82, 82, 0.1)":
            "0 12px 20px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.03)",
          },
        }}
      >
        <CardMedia
          component="img"
          height="200"
          image={product.images?.thumbnail}
          alt={product.name}
          sx={{ objectFit: "cover" }}
        />
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="body2"  color={isDark?"#fff":"text.secondary"}>
            ID: {product._id}
          </Typography>
          <Typography variant="body2"  color={isDark?"#fff":"text.secondary"}>
            Category: {product.category?.categoryname}
          </Typography>
          <Typography variant="body2"  color={isDark?"#fff":"text.secondary"}>
            Price: <strong> ₹ {product.discountprice}</strong>  <del style={{color:"rgba(201, 47, 9, 0.89)"}}>₹ {product.originalprice}</del>
          </Typography>
          <Typography
            variant="body2"
            color={product.status === "In-Stock" ? "success.main" : "error.main"}
            fontWeight={500}
          >
            Status: {product.status || "In-Stock"}
          </Typography>

          <Box mt={2}>
            <Stack direction="row" spacing={1}>
              <Button variant="outlined" size="small" onClick={handleViewOpen}>
                View
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handleEditOpen}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={() => onDelete(product._id)}
              >
                Delete
              </Button>
            </Stack>
          </Box>
        </CardContent>
      </Card>



      {/* View Modal */}
      <Dialog open={openView} onClose={handleViewClose} fullScreen={fullScreen}>
        <DialogTitle>{product.name} - Details</DialogTitle>
        <DialogContent>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                <SwiperSlide> 
          <img
            src={product.images?.thumbnail || "https://via.placeholder.com/400x200"}
            alt={product.name}
            style={{ width: "100%",height:"500px", borderRadius: 8, marginBottom: 16 ,objectFit:"cover",objectPosition:"center"}}
          /></SwiperSlide>
{product.images.gallery.map((item)=>{
  return (
    
        <SwiperSlide><img
            src={item|| "https://via.placeholder.com/400x200"}
            alt={product.name}
            style={{ width: "100%",height:"500px", borderRadius: 8, marginBottom: 16 ,objectFit:"cover",objectPosition:"center"}}
          /></SwiperSlide>
  )
})}

      
      </Swiper>
         
          <Typography gutterBottom><strong>ID:</strong> {product._id}</Typography>
          <Typography gutterBottom><strong>Category: </strong>{product.category?.categoryname}</Typography>
          <Typography gutterBottom><strong>Discounted Price:</strong> ₹ {product.discountprice}</Typography>
              <Typography gutterBottom><strong>Original Price:</strong> ₹ {product.originalprice}</Typography>
          <Typography gutterBottom><strong>Status:</strong> {product.status}</Typography>
          <Typography gutterBottom><strong>Description:</strong> {product.description}</Typography>
            <Typography gutterBottom><strong>Brand:</strong> {product.brand}</Typography>
          <Typography gutterBottom><strong>Quantity: </strong>{product.quantity}</Typography>
          <Typography gutterBottom><strong>Rating:</strong> ₹ {product.rating}</Typography>
          <Typography gutterBottom><strong>isFeatured:</strong> {product.isFeatured}</Typography>
          <Typography gutterBottom><strong>Size Small :</strong> {product.physicalSpecs.size.S ? product.physicalSpecs.size.S :"Not Defined" } Units</Typography>
          <Typography gutterBottom><strong>Size Medium:</strong> {product.physicalSpecs.size.M ? product.physicalSpecs.size.M : "Not Defind"} Units</Typography>
          <Typography gutterBottom><strong>Size Large:</strong> {product.physicalSpecs.size.L ? product.physicalSpecs.size.L : "Not Defined"} Units</Typography>
          <Typography gutterBottom><strong>Size XL:</strong> {product.physicalSpecs.size.XL ? product.physicalSpecs.size.XL : "Not Defined"} Units</Typography>
            <Typography gutterBottom><strong>Volume : </strong> {product.physicalSpecs.volume ? product.physicalSpecs.volume : "Not Defined" } Litres</Typography>
          <Typography gutterBottom><strong>Weight : </strong> {product.physicalSpecs.weight ? product.physicalSpecs.weight : "Not Defined"} Grams</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleViewClose}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Modal */}
       <Dialog
           open={openEdit}
           onClose={handleEditClose}
           maxWidth="sm"
           fullWidth
         >
           <DialogTitle>Edit Product - {product.name}</DialogTitle>
           <DialogContent
             sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
           >
             <TextField label="Product Name" name="name" fullWidth onChange={handleFormChange} value={formData.name}  margin="normal"  />
             <div style={{ display: "flex", gap: "16px" }}>
               <TextField
                 label="Discount Price"
                 name="discountprice"
                 fullWidth
                 type="number"
                 onChange={handleFormChange}
                 value={formData.discountprice === 0 ? "" : formData.discountprice}
               />
               <TextField
                 label="Original Price"
                 name="originalprice"
                 fullWidth
                 type="number"
                 onChange={handleFormChange}
                 value={formData.originalprice === 0 ? "" : formData.originalprice}
               />
             </div>
     
   
             <div style={{ display: "flex", gap: "16px" }}>
          <TextField
     label="Category"
     name="category"
     select
     fullWidth
     onChange={handleFormChange}
     value={formData.category?._id || formData.category}
   >
     {categories.map((cat) => (
       <MenuItem key={cat._id} value={cat._id}>
         {cat.categoryname}
       </MenuItem>
     ))}
   </TextField>
   
               <TextField
                 label="Status"
                 name="status"
                 select
                 sx={{ width: "50%" }}
                 onChange={handleFormChange}
                 value={formData.status}
               >
                 <MenuItem value="In-Stock">In-Stock</MenuItem>
                 <MenuItem value="Out-Stock">Out-Stock</MenuItem>
               </TextField>
             </div>
             <TextField
               label="Description"
               name="description"
               multiline
               rows={3}
               fullWidth
               onChange={handleFormChange}
               value={formData.description}
             />
             <div style={{ display: "flex", gap: "16px" }}>
               <TextField
                 label="Quantity"
                 name="quantity"
                 type="number"
                 sx={{ width: "50%" }}
                 onChange={handleFormChange}
                 value={formData.quantity === 0 ? "" : formData.quantity}
               />
   
               <TextField
                 label="Brand"
                 name="brand"
                 type="text"
                 sx={{ width: "50%" }}
                 onChange={handleFormChange}
                 value={formData.brand}
               />
             </div>
   
             <div style={{ display: "flex", gap: "16px" }}>
               {/* <label htmlFor="" name="Sizes">Sizes</label> */}
   
               <TextField label="Small" name="S" type="number" onChange={handleFormChange} value={formData.physicalSpecs.size.S}/>
   
               <TextField label="Medium" name="M" type="number" onChange={handleFormChange} value={formData.physicalSpecs.size.M}/>
   
               <TextField label="Large" name="L" type="number" onChange={handleFormChange} value={formData.physicalSpecs.size.L}/>
               <TextField label="XL" name="XL" type="number" onChange={handleFormChange} value={formData.physicalSpecs.size.XL}/>
             </div>
   
             <div style={{ display: "flex", gap: "16px" }}>
               <TextField
                 label="Volume(LTR for Liquid Products)"
                 name="volume"
                 type="number"
                 sx={{ width: "50%" }}
                 onChange={handleFormChange}
                 value={formData.physicalSpecs.volume}
               />
   
               <TextField
                 label="Weight in Grams"
                 name="weight"
                 type="number"
                 sx={{ width: "50%" }}
                 onChange={handleFormChange}
                 value={formData.physicalSpecs.weight}
               />
             </div>
             <div style={{ display: "flex", gap: "16px" }}>
               <TextField
                 label="Rating"
                 name="rating"
                 type="number"
                 inputProps={{ min: 0, max: 5, step: 0.1 }}
                 sx={{ width: "50%" }}
                 onChange={handleFormChange}
                 value={formData.rating}
               />
   
               <TextField
                 label="IsFeatured"
                 name="isFeatured"
                 sx={{ width: "50%" }}
                 select
                 onChange={handleFormChange}
                 value={formData.isFeatured}
               >
                 <MenuItem value="true">true</MenuItem>
                 <MenuItem value="false">false</MenuItem>
               </TextField>
             </div>
   
             <div style={{ display: "flex", gap: "16px" }}>
               <Button
                 variant="outlined"
                 component="label"
                 fullWidth
                 sx={{ mt: 2 }}
               >
                 Upload Thumbnail Image
                 <input type="file" hidden accept="image/*" name="thumbnail" onChange={handleFormChange} />
               </Button>
               <Button
                 variant="outlined"
                 component="label"
                 fullWidth
                 sx={{ mt: 2 }}
               >
                 Upload Product Images
                 <input type="file" hidden accept="image/*" multiple name="gallery" onChange={handleFormChange} />
               </Button>
             </div>
           </DialogContent>
           <DialogActions>
             <Button onClick={handleEditClose}>Close</Button>
             <Button variant="contained" onClick={handleEditProduct}>Edit</Button>
           </DialogActions>
         </Dialog>
    </>
  );
};

export default ProductCard;
